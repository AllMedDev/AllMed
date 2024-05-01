import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { API_URL_LOGIN, API_URL_POST_DOCTOR } from '../../constants/ApiUrls';
import { SITE_URL_LOGIN, SITE_URL_REGISTRATION_DOCTOR, SITE_URL_REGISTRATION_PATIENT } from '../../constants/SiteUrls';

import './Login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.includes('@')) newErrors.email = 'Zadajte správnu emailovú adresu';
        if (!formData.password) newErrors.password = 'Zadajte správne heslo';

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            fetch(API_URL_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => console.log('Server response:', data))
                .catch((error) => console.error('Error sending data:', error));
        }
    };

    const handleDoctorRegistrationButtonClick = () => {
        window.location.href = SITE_URL_REGISTRATION_DOCTOR;
    };

    const handlePatientRegistrationButtonClick = () => {
        window.location.href = SITE_URL_REGISTRATION_PATIENT;
    };

    return (
        <div className="login-page">
            <h2 className='allmedHeading'>AllMed</h2>
            <div className="loginForm">
                <h2>Prihlásenie</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={12}>
                            <Form.Group controlId="email" className="inputFieldGroup">
                                <Form.Label>Email</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={errors.email ? 'input-error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="password" className="inputFieldGroup">
                                <Form.Label>Heslo</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={errors.password ? 'input-error' : ''}
                                    />
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>
                            </Form.Group>

                            <Button className="loginButton" type="submit">Prihlásiť sa</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <span className="regs-separator">Ak ste nie ste registrovaný, využite možnosť registrácie</span>
            <Button variant="primary" type="button" className="doctor-reg-button" onClick={handleDoctorRegistrationButtonClick}>
                Registrovať sa ako pacient
            </Button>
            <Button variant="primary" type="button" className="patient-reg-button" onClick={handlePatientRegistrationButtonClick}>
                Registrovať sa ako lekár
            </Button>
        </div>
    );
};

export default LoginPage;
