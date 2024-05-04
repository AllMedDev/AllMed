import React, { useState, useEffect } from 'react';

import './FutureAppointments.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DisplayAppointments from '../../components/Appointments/Appointments';
import NavBar from '../../components/NavBar/NavBar';

const apiEndpoint = "INSERT_API_HERE_PLS";

const sampleReservations = [
    {
        "id": 1,
        "date": "10.05.2024",
        "time": "09:00",
        "reservedBy": "Ján Novák",
        "doctor": "Dr. Karol Šťastný",
        "specialization": "Kardiológia",
        "address": "Mlynská 15",
        "city": "Košice"
    },
    {
        "id": 2,
        "date": "09.05.2024",
        "time": "10:00",
        "reservedBy": "Eva Kováčová",
        "doctor": "Dr. Miroslav Bílik",
        "specialization": "Dermatológia",
        "address": "Obchodná 23",
        "city": "Bratislava"
    },
    {
        "id": 3,
        "date": "11.05.2024",
        "time": "10:15",
        "reservedBy": "Peter Horváth",
        "doctor": "Dr. Jozef Toman",
        "specialization": "Neurológia",
        "address": "Námestie SNP 12",
        "city": "Zvolen"
    },
    {
        "id": 4,
        "date": "12.05.2024",
        "time": "15:00",
        "reservedBy": "Mária Vargová",
        "doctor": "Dr. Tomáš Hrubý",
        "specialization": "Ortopédia",
        "address": "Hlavná 8",
        "city": "Prešov"
    },
    {
        "id": 5,
        "date": "14.05.2024",
        "time": "13:30",
        "reservedBy": "Lukáš Černý",
        "doctor": "Dr. Andrea Kolesárová",
        "specialization": "Gynekológia",
        "address": "Štúrova 18",
        "city": "Žilina"
    },
    {
        "id": 6,
        "date": "15.05.2024",
        "time": "14:45",
        "reservedBy": "Anna Šimková",
        "doctor": "Dr. Pavol Dvořák",
        "specialization": "Urológia",
        "address": "Štefánikova 22",
        "city": "Banská Bystrica"
    },
    {
        "id": 7,
        "date": "16.05.2024",
        "time": "16:00",
        "reservedBy": "Tomáš Valášek",
        "doctor": "Dr. Katarína Balogová",
        "specialization": "Gastroenterológia",
        "address": "Komenského 7",
        "city": "Trenčín"
    },
    {
        "id": 8,
        "date": "18.05.2024",
        "time": "11:15",
        "reservedBy": "Zuzana Hrivnáková",
        "doctor": "Dr. Jakub Kráľ",
        "specialization": "Endokrinológia",
        "address": "Partizánska 14",
        "city": "Martin"
    },
    {
        "id": 9,
        "date": "20.05.2024",
        "time": "13:00",
        "reservedBy": "Michal Kováč",
        "doctor": "Dr. Eva Bieliková",
        "specialization": "Psychiatria",
        "address": "Bottova 10",
        "city": "Poprad"
    },
    {
        "id": 10,
        "date": "22.05.2024",
        "time": "14:30",
        "reservedBy": "Petra Novotná",
        "doctor": "Dr. Róbert Novák",
        "specialization": "Hematológia",
        "address": "Jarná 21",
        "city": "Nitra"
    },
    {
        "id": 11,
        "date": "24.05.2024",
        "time": "10:30",
        "reservedBy": "Janette Bartošová",
        "doctor": "Dr. Milan Šimko",
        "specialization": "Reumatológia",
        "address": "Hurbanova 9",
        "city": "Trnava"
    },
    {
        "id": 12,
        "date": "26.05.2024",
        "time": "12:15",
        "reservedBy": "Viktor Hruška",
        "doctor": "Dr. Lýdia Kováčová",
        "specialization": "Otorinolaryngológia",
        "address": "Moyzesova 12",
        "city": "Žilina"
    }
]
    ;



const FutereAppointmentsPage = () => {
    const [reservations, setReservations] = useState(sampleReservations);

    useEffect(() => {
        const fetchData = async () => {
            // TBD: Fetch data from API if available
            // setReservations(data);
        };

        fetchData();
    }, [apiEndpoint]);

    return (
        <div className='future-appointments-page'>
            <NavBar></NavBar>
            <DisplayAppointments data={reservations} mainHeadline={"Plánované rezervácie"} />
        </div>
    )
}

export default FutereAppointmentsPage;
