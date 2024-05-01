import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Navbar } from 'react-bootstrap';

import NavBar from "../../components/NavBar/NavBar"

import axios from 'axios';
import { API_URL_BASE, API_URL_LOGOUT, API_URL_USER, API_URL_POST_PATIENT } from '../../constants/ApiUrls';
import { SITE_URL_LOGIN } from '../../constants/SiteUrls';

import './Profile.css';



const api = axios.create({baseURL: API_URL_BASE, withCredentials: true});

const Homepage = () => {

    useEffect(() => {
        const fetchData = async () => {
            var response = api.get('/user')
            if (!response.ok) {
                window.location.href = SITE_URL_LOGIN;
            }
            setFormData(response.data['user'])
        };
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        id: '',
        pin: '',
        first_name: '',
        surname: '',
        telephone: '',
        email: '',
        address_street: '',
        address_city: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleCheck = (e) => {
        api.get('/user')
        .then((response) => response.data)
        .then(data =>data['user'])
        .then(data => setFormData(data))
    }

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'Vložte krstné meno';
        if (!formData.surname) newErrors.surname = 'Vložte priezvisko';
        if (!formData.pin) newErrors.pin = 'Vložte rodné číslo';
        if (!formData.telephone) newErrors.telephone = 'Vložte telefón';
        if (!formData.address_street) newErrors.address_street = 'Vložte ulicu a číslo';
        if (!formData.address_city) newErrors.address_city = 'Vložte mesto';

        return newErrors;
    };

    const handleLogout = (e) => {

        api.post('/logout', '')
            .then((response) => {
                if (response.ok) {
                    window.location.href = SITE_URL_LOGIN
                }
            })
            .catch((error) => console.error('Error sending data:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            api.put(`/register`, formData)
            // fetch(API_URL_POST_PATIENT, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // })
            .then ((response) => {
                if (response.ok) {
                    //TODO
                }
            })
            .catch((error) => console.error('Error sending data:', error));
        }
    };

    const handleUserLogout = () => {
        handleLogout()
        window.location.href = SITE_URL_LOGIN;
    };

    return (
        <div>
            <div>
                <NavBar></NavBar>
                <div className="UserData">
                    <h2>Profil užívateľa {formData.first_name}</h2>
                    <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="first_name" className='inputFieldGroup'>
                                <Form.Label>Krstné meno</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        className={errors.first_name ? 'input-error' : ''}
                                    />
                                    {errors.first_name && <span className="error-message">{errors.first_name}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="pin" className='inputFieldGroup'>
                                <Form.Label>Rodné číslo</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="text"
                                        name="pin"
                                        value={formData.pin}
                                        onChange={handleInputChange}
                                        className={errors.pin ? 'input-error' : ''}
                                    />
                                    {errors.pin && <span class="error-message">{errors.pin}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="address_street" className='inputFieldGroup'>
                                <Form.Label>Ulica, číslo</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="text"
                                        name="address_street"
                                        value={formData.address_street}
                                        onChange={handleInputChange}
                                        className={errors.address_street ? 'input-error' : ''}
                                    />
                                    {errors.address_street && <span class="error-message">{errors.address_street}</span>}
                                </div>
                            </Form.Group>
                        </Col>

                        <Col sm={6}>
                            <Form.Group controlId="surname" className='inputFieldGroup'>
                                <Form.Label>Priezvisko</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        className={errors.surname ? 'input-error' : ''}
                                    />
                                    {errors.surname && <span class="error-message">{errors.surname}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="telephone" className='inputFieldGroup'>
                                <Form.Label>Telefón</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="text"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        className={errors.telephone ? 'input-error' : ''}
                                    />
                                    {errors.telephone && <span class="error-message">{errors.telephone}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="address_city" className='inputFieldGroup'>
                                <Form.Label>Mesto</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="text"
                                        name="address_city"
                                        value={formData.address_city}
                                        onChange={handleInputChange}
                                        className={errors.address_city ? 'input-error' : ''}
                                    />
                                    {errors.address_city && <span class="error-message">{errors.address_city}</span>}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                </div>
            </div>
            <div className='Buttons'>
                <Button variant="primary" type="button" className="patient-logout-button" onClick={handleUserLogout}>
                    Odhlásiť
                </Button>

                <Button variant="primary" type="button" className="patient-logout-button" onClick={handleSubmit}>
                    Uložiť
                </Button>
            </div>
        </div>
    );
};

export default Homepage;
