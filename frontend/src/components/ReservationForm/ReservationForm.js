import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Badge } from 'react-bootstrap';

import { API_URL_BASE } from '../../constants/ApiUrls';
import { SITE_URL_LOGIN, SITE_URL_PROFILE, SITE_URL_REGISTRATION_DOCTOR } from '../../constants/SiteUrls';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationForm.css';
import axios from 'axios';


const skDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const api = axios.create({ baseURL: API_URL_BASE, withCredentials: true });
const doctorId = 0;

function generateAvailableTimeSlots(reservedTimes) {
    const start = new Date(0, 0, 0, 9, 0); // Start at 09:00
    const end = new Date(0, 0, 0, 15, 0); // End at 15:00
    const slots = [];


    while (start < end) {
        const timeString = start.toTimeString().split(' ')[0].slice(0, 5);
        if (typeof reservedTimes == 'undefined' ||  !reservedTimes.includes(timeString)) {
            slots.push(timeString);
        }
        start.setMinutes(start.getMinutes() + 15); // Increment by 15 minutes
    }

    return slots;
}

const ReservationForm = (doctorId) => {
    doctorId = doctorId;
    console.log(doctorId);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [reservedTimes, setReservedTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if (selectedDate) {
            var d = new Date(selectedDate);
            var newd = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
            const formattedDate = newd.toISOString().split("T")[0];

            const fetchData = async () => {
                try {
                    const data = {
                        doctor_id:doctorId['doctorId'],
                        just_future:true,
                    };
                    var response = await api.post('/appointments', data);
                    setReservedTimes(response.data[formattedDate]);
                    setAvailableTimeSlots(generateAvailableTimeSlots(response.data[formattedDate]));
                }
                catch (e) {
                    // window.location.href = SITE_URL_PROFILE;
                }
            };
            fetchData();
        }
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeClick = (time) => {
        if (typeof reservedTimes == 'undefined' || !reservedTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTime || !selectedDate) {
            alert("Vyberte si deň a čas rezervácie.");
            return;
        }

        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().split("T")[0];

        const reservationData = {
            date: formattedDate,
            time: selectedTime,
        };

        var response = await api.get('/user');
        var userId = response.data['user']['id'];

        const appointmentData = {
            patient_id:userId,
            doctor_id:doctorId['doctorId'],
            date:formattedDate,
            time:selectedTime,
        };

        await api.post('/new-appointment', appointmentData)
        .then(response => {
            if (response.statusText == "Created")
                window.location.href = SITE_URL_PROFILE;
        });


    };

    return (

        <div className="reservation-form-container">
            <h2>Vytvorte si rezerváciu</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <Col sm={8} className="text-center">
                        <Form.Group controlId="reservation-date">
                            <p className='single-line-label'>Vyberte si deň</p>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                placeholderText="Vybrať..."
                                minDate={new Date()}
                            />
                        </Form.Group>

                        <Form.Group controlId="reservation-time" className="time-slot-group">
                            <p className='single-line-label'>Vyberte si čas</p>
                            <div className="time-badge-container">
                                {availableTimeSlots.map((time, index) => (
                                    <Badge
                                        key={index}
                                        className="time-slot"
                                        onClick={() => handleTimeClick(time)}
                                        style={{ margin: '5px' }}
                                    >
                                        {time}
                                    </Badge>
                                ))}
                            </div>
                            {selectedTime && (
                                <div className="selected-time-message">
                                    Rezervácia bude vytvorená na deň {selectedDate.toLocaleDateString('sk-SK', skDateOptions)} o {selectedTime} hod.
                                </div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className="reserve-button">Rezervovať</Button>
            </Form>
        </div>
    );
};

export default ReservationForm;
