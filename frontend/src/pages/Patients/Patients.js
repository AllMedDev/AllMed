import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from '../../components/NavBar/NavBar';
import './Patients.css';
import PatientListingWithFilter from '../../components/PatientCards/PatientListing';
import { API_URL_BASE, API_URL_GET_PATIENTS } from '../../constants/ApiUrls';

import axios from 'axios';

const api = axios.create({ baseURL: API_URL_BASE, withCredentials: true });

const PatientsPage = () => {
  const [data, setData] = useState(null);

  const fetchJson = async () => {
    var doctor = await api.get('/user');

    const data = {
      doctor_id:doctor.data['user']['id'],
      just_future:true,
    };

    var response = await api.post('/doctor-detailed-patients', data);
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
