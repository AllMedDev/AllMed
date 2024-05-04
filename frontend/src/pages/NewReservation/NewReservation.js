import React, { useState, useEffect } from 'react';
import { API_URL_BASE } from '../../constants/ApiUrls';
import { SITE_URL_LOGIN } from '../../constants/SiteUrls';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NewReservation.css'

import ReservationForm from '../../components/ReservationForm/ReservationForm';
import NavBar from '../../components/NavBar/NavBar';


const api = axios.create({baseURL: API_URL_BASE, withCredentials: true});

const NewReservation = () => {
    const [searchParams] = useSearchParams();
    const doctorId = searchParams.get("doctorid");
    
    return (
        <div className='reservation-page'>
            <NavBar></NavBar>
            <ReservationForm doctorId={doctorId}></ReservationForm>
        </div>
    );

}

export default NewReservation
