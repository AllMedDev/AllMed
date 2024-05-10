import React, { useState, useEffect } from 'react';

import './FutureAppointments.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { API_URL_BASE } from '../../constants/ApiUrls';
import { SITE_URL_PROFILE } from '../../constants/SiteUrls';

import axios from 'axios';

import DisplayDoctorsAppointments from '../../components/Appointments/DoctorsAppointments';
import DisplayPatientsAppointments from '../../components/Appointments/PatientsAppointments';
import NavBar from '../../components/NavBar/NavBar';

import IsUserDoctor from '../../components/IsUserDoctor/IsUserDoctor';


const apiEndpoint = "/detailed-appointments";
const api = axios.create({baseURL: API_URL_BASE, withCredentials: true});

const FutereDoctorsAppointmentsPage = () => {
    const isUserDoctor = IsUserDoctor();

    const [reservations, setReservations] = useState(null);

    useEffect( () => {
        const fetchData = async () => {
            try {
                var response = await api.get('/user');
                const data = {
                    id:response.data['user']['id'],
                    justFuture:true
                };
                var response = await api.post(apiEndpoint, data);
                setReservations(response.data);
            } catch (e) {
                window.location.href = SITE_URL_PROFILE;
            }
        };

        fetchData();
    }, []);

    return (
        <div className='future-appointments-page'>
            <NavBar></NavBar>

            {isUserDoctor == true ? <DisplayDoctorsAppointments data={reservations} mainHeadline={"Plánované rezervácie"} /> : null}
            {isUserDoctor == false ? <DisplayPatientsAppointments data={reservations} mainHeadline={"Plánované rezervácie"} /> : null}
        </div>
    )
}

export default FutereDoctorsAppointmentsPage;
