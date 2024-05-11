import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from '../../components/NavBar/NavBar';
import './Patients.css';
import PatientListingWithFilter from '../../components/PatientCards/PatientListing';
import { API_URL_BASE, API_URL_GET_PATIENTS } from '../../constants/ApiUrls';

import axios from 'axios';

const api = axios.create({ baseURL: API_URL_BASE, withCredentials: true });

const sampleData = [
  {
    pin: '1715260193209',
    specialization: 'Endokrinologia',
    isDoctor: true,
    first_name: 'Samuel',
    surname: 'Stefanek',
    telephone: '+421 917 345 678',
    email: 'samuel.stefanek@gmail.com',
    address_street: 'Dlha 14',
    address_city: 'Humenne',
    last_appointment_date: '2020-03-14T15:00:00',
  },
  {
    pin: '1715260193210',
    specialization: 'Ortopedia',
    isDoctor: false,
    first_name: 'Andrea',
    surname: 'Mikova',
    telephone: '+421 917 345 679',
    email: 'andrea.mikova@gmail.com',
    address_street: 'Hlavna 32',
    address_city: 'Kosice',
    last_appointment_date: '2021-05-10T10:30:00',
  },
  {
    pin: '1715260193211',
    specialization: 'Neurologia',
    isDoctor: true,
    first_name: 'Peter',
    surname: 'Novak',
    telephone: '+421 917 345 680',
    email: 'peter.novak@gmail.com',
    address_street: 'Dolna 10',
    address_city: 'Bratislava',
    last_appointment_date: '2022-01-15T09:00:00',
  },
  {
    pin: '1715260193212',
    specialization: 'Cardiologia',
    isDoctor: false,
    first_name: 'Jana',
    surname: 'Kovacova',
    telephone: '+421 917 345 681',
    email: 'jana.kovacova@gmail.com',
    address_street: 'Nova 27',
    address_city: 'Presov',
    last_appointment_date: '2023-07-20T14:00:00',
  },
  {
    pin: '1715260193213',
    specialization: 'Pediatria',
    isDoctor: false,
    first_name: 'Zuzana',
    surname: 'Tothova',
    telephone: '+421 917 345 682',
    email: 'zuzana.tothova@gmail.com',
    address_street: 'Mala 5',
    address_city: 'Nitra',
    last_appointment_date: '2023-09-10T11:15:00',
  },
];

const PatientsPage = () => {
  const [data, setData] = useState(null);

  const fetchJson = async () => {
    var doctor = await api.get('/user');
    console.log(doctor.data);

    const data = {
      doctorId:doctor.data['user']['id'],
      justFuture:true,
    };

    var response = await api.post('/doctor-detailed-patients', data);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    fetchJson();
  }, []);

  return (
    <div className="patients-page">
      <NavBar />
      {Array.isArray(data) ? (
        <PatientListingWithFilter items={data} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default PatientsPage;
