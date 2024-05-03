import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Badge } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationForm.css';


const skDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


// TBD - just a test data, have to be replaced with fetched api data, change if needed
// Check also handleSubmit
const reservedTimesData = {
    '2024-05-10': ['09:00', '14:00', '14:15', '14:30'],
    '2024-05-11': ['10:00', '10:15', '15:00'],
};


function generateAvailableTimeSlots(reservedTimes) {
    const start = new Date(0, 0, 0, 9, 0); // Start at 09:00
    const end = new Date(0, 0, 0, 15, 0); // End at 15:00
    const slots = [];

    while (start < end) {
        const timeString = start.toTimeString().split(' ')[0].slice(0, 5);
        if (!reservedTimes.includes(timeString)) {
            slots.push(timeString);
        }
        start.setMinutes(start.getMinutes() + 15); // Increment by 15 minutes
    }

    return slots;
}

const ReservationForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [reservedTimes, setReservedTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if (selectedDate) {
            var d = new Date(selectedDate);
            var newd = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
            const formattedDate = newd.toISOString().split("T")[0];
            const reservedTimesForDate = reservedTimesData[formattedDate] || [];
            setReservedTimes(reservedTimesForDate);
            setAvailableTimeSlots(generateAvailableTimeSlots(reservedTimesForDate));
        }
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeClick = (time) => {
        if (!reservedTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTime || !selectedDate) {
            alert("Vyberte si deň a čas rezervácie.");
            return;
        }

        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().split("T")[0];

        // TBD - change json data to api call if needed, also need to be
        const reservationData = {
            date: formattedDate,
            time: selectedTime,
        };
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
