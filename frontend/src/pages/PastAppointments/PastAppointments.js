import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PastAppointments.css';

import DisplayDoctorsAppointments from '../../components/Appointments/DoctorsAppointments';
import DisplayPatientsAppointments from '../../components/Appointments/PatientsAppointments';
import NavBar from '../../components/NavBar/NavBar';

import IsUserDoctor from '../../components/IsUserDoctor/IsUserDoctor';

import { API_URL_BASE } from '../../constants/ApiUrls';
import { SITE_URL_PROFILE } from '../../constants/SiteUrls';

import axios from 'axios';

const apiEndpoint = "/detailed-appointments";
const api = axios.create({baseURL: API_URL_BASE, withCredentials: true});

const sampleReservations = [
    {
        "id": 13,
        "date": "30.05.2024",
        "time": "09:30",
        "reservedBy": "Peter Miko",
        "doctor": "Dr. Vladimír Novotný",
        "specialization": "Interná medicína",
        "address": "Záhradná 3",
        "city": "Košice"
    },
    {
        "id": 14,
        "date": "01.06.2024",
        "time": "11:00",
        "reservedBy": "Martina Tomášová",
        "doctor": "Dr. Anna Vysoká",
        "specialization": "Neurológia",
        "address": "Štefánikova 45",
        "city": "Bratislava"
    },
    {
        "id": 15,
        "date": "02.06.2024",
        "time": "13:15",
        "reservedBy": "Milan Hrubý",
        "doctor": "Dr. Andrej Palkovič",
        "specialization": "Ortopédia",
        "address": "Tatranská 10",
        "city": "Trnava"
    },
    {
        "id": 16,
        "date": "03.06.2024",
        "time": "15:30",
        "reservedBy": "Lenka Kráľová",
        "doctor": "Dr. Ivan Hruška",
        "specialization": "Urológia",
        "address": "Školská 33",
        "city": "Prešov"
    },
    {
        "id": 17,
        "date": "04.06.2024",
        "time": "12:45",
        "reservedBy": "Jozefína Kováčová",
        "doctor": "Dr. Katarína Nováková",
        "specialization": "Gynekológia",
        "address": "Hurbanova 27",
        "city": "Poprad"
    },
    {
        "id": 18,
        "date": "05.06.2024",
        "time": "10:00",
        "reservedBy": "Jakub Kráľ",
        "doctor": "Dr. Patrik Černý",
        "specialization": "Dermatológia",
        "address": "Stará 8",
        "city": "Nitra"
    },
    {
        "id": 19,
        "date": "06.06.2024",
        "time": "14:00",
        "reservedBy": "Mária Horváthová",
        "doctor": "Dr. Zuzana Veselá",
        "specialization": "Kardiológia",
        "address": "Mierová 13",
        "city": "Trenčín"
    },
    {
        "id": 20,
        "date": "07.06.2024",
        "time": "16:30",
        "reservedBy": "Tomáš Toman",
        "doctor": "Dr. Lukáš Slovák",
        "specialization": "Gastroenterológia",
        "address": "Ružová 5",
        "city": "Martin"
    },
    {
        "id": 21,
        "date": "08.06.2024",
        "time": "09:15",
        "reservedBy": "Natália Švecová",
        "doctor": "Dr. Martin Šťastný",
        "specialization": "Pediatria",
        "address": "Lúčna 21",
        "city": "Banská Bystrica"
    },
    {
        "id": 22,
        "date": "09.06.2024",
        "time": "11:00",
        "reservedBy": "Juraj Kováč",
        "doctor": "Dr. Eva Zelená",
        "specialization": "Endokrinológia",
        "address": "Mlynská 18",
        "city": "Žilina"
    },
    {
        "id": 23,
        "date": "10.06.2024",
        "time": "10:45",
        "reservedBy": "Eva Bieliková",
        "doctor": "Dr. Jozef Malý",
        "specialization": "Rádiológia",
        "address": "Námestie 1",
        "city": "Prešov"
    },
    {
        "id": 24,
        "date": "11.06.2024",
        "time": "14:15",
        "reservedBy": "Michal Slovák",
        "doctor": "Dr. Jana Slováková",
        "specialization": "Gynekológia",
        "address": "Moyzesova 22",
        "city": "Bratislava"
    }
]
    ;




const PastAppointmentsPage = () => {
    const isUserDoctor = IsUserDoctor();

    const [reservations, setReservations] = useState(sampleReservations);

    useEffect( () => {
        const fetchData = async () => {
            try {
                var response = await api.get('/user');
                const data = {
                    id:response.data['user']['id'],
                    justFuture:false
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
        <div className='past-appointments-page'>
            <NavBar></NavBar>
            {isUserDoctor == true ? <DisplayDoctorsAppointments data={reservations} mainHeadline={"História rezervácií"} /> : null}
            {isUserDoctor == false ? <DisplayPatientsAppointments data={reservations} mainHeadline={"História rezervácií"} /> : null}
        </div>
    )
}

export default PastAppointmentsPage;
