import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import axios from 'axios';
import { API_URL_BASE, API_URL_LOGOUT, API_URL_USER } from '../../constants/ApiUrls';
import { SITE_URL_LOGIN } from '../../constants/SiteUrls';

import './Homepage.css';



const api = axios.create({baseURL: API_URL_BASE, withCredentials: true});

const Homepage = () => {

    const handleCheck = (e) => {
        api.get('/user')
        .then((response) => console.log(response))
    }

    const handleLogout = (e) => {

        api.post('/logout', '')
            .then((response) => {
                if (response.ok) {
                    window.location.href = SITE_URL_LOGIN
                }
            })
            .catch((error) => console.error('Error sending data:', error));
    };

    const handleUserLogout = () => {
        handleLogout()
        window.location.href = SITE_URL_LOGIN;
    };

    return (
        <div className="login-page">
            <h2 className='allmedHeading'>AllMed</h2>
            <div className="loginForm">
                <h2>Prihlásenie hotové</h2>
            </div>
            <Button variant="primary" type="button" className="patient-logout-button" onClick={handleUserLogout}>
                Odhlásiť
            </Button>

            <Button variant="primary" type="button" className="patient-logout-button" onClick={handleCheck}>
                check
            </Button>
        </div>
    );
};

export default Homepage;
