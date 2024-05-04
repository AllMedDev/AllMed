import React, { useState, useEffect } from 'react';
import { API_URL_BASE } from '../../constants/ApiUrls';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NewReservation.css'

import ReservationForm from '../../components/ReservationForm/ReservationForm';
import NavBar from '../../components/NavBar/NavBar';


const api = axios.create({baseURL: API_URL_BASE, withCredentials: true});

const NewReservation = () => {

    
    
    
    return (
        <div className='reservation-page'>
            <NavBar></NavBar>
            <ReservationForm></ReservationForm>
        </div>
    );

}

export default NewReservation
