import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { SPECIALIZATIONS } from '../../constants/DoctorSpecializations';
import { API_URL_POST_DOCTOR } from '../../constants/ApiUrls';
import { SITE_URL_LOGIN } from '../../constants/SiteUrls';

import './DoctorRegister.css';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        pin: '',
        specialization: '',
        isDoctor: true,
        first_name: '',
        surname: '',
        telephone: '',
        email: '',
        address_street: '',
        address_city: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'Vložte krstné meno';
        if (!formData.surname) newErrors.surname = 'Vložte priezvisko';
        if (!formData.pin) newErrors.pin = 'Vložte IČO';
        if (!formData.telephone) newErrors.telephone = 'Vložte telefón';
        if (!formData.address_street) newErrors.address_street = 'Vložte ulicu a číslo';
        if (!formData.address_city) newErrors.address_city = 'Vložte mesto';
        if (!formData.email.includes('@')) newErrors.email = 'Vložte správnu adresu';
        if (formData.password.length < 6) newErrors.password = 'Vložte heslo dĺžky aspoň 6';
        if (!formData.specialization) newErrors.specialization = 'Vyberte špecializáciu';

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
            fetch(API_URL_POST_DOCTOR, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then ((response) => {
                if (response.ok) {
                    window.location.href = "http://localhost:3000/login"
                }
            })
            .catch((error) => console.error('Error sending data:', error));
        }
    };

    const handleLoginButtonClick = () => {
        window.location.href = SITE_URL_LOGIN;
    };

    return (
        <div className='DoctorRegComp'>
            <h2 className='allmedheading'>AllMed</h2>
            <div className="registration-form">
                <h2>Registrácia lekára</h2>
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
                                <Form.Label>IČO</Form.Label>
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

                            <Form.Group controlId="email" className='inputFieldGroup'>
                                <Form.Label>Email</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={errors.email ? 'input-error' : ''}
                                    />
                                    {errors.email && <span class="error-message">{errors.email}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="specialization">
                                <Form.Label>Špecializácia</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        as="select"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleInputChange}
                                        className={errors.specialization ? 'input-error' : ''}
                                    >
                                        <option value="">-- Vyberte špecializáciu --</option>
                                        {SPECIALIZATIONS.map((spec) => (
                                            <option key={spec} value={spec}>
                                                {spec}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    {errors.specialization && <span class="error-message">{errors.specialization}</span>}
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
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={errors.address_city ? 'input-error' : ''}
                                    />
                                    {errors.address_city && <span class="error-message">{errors.address_city}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="password" className='inputFieldGroup'>
                                <Form.Label>Heslo</Form.Label>
                                <div className="input-container">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={errors.password ? 'input-error' : ''}
                                    />
                                    {errors.password && <span class="error-message">{errors.password}</span>}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="button-row">
                <Button variant="primary" type="button" className="reg-button" onClick={handleSubmit}>
                    Registrovať sa
                </Button>
                <Button variant="primary" type="button" className="login-button" onClick={handleLoginButtonClick}>
                    Prihlásiť sa
                </Button>
            </div>
            <span className="separator">Ak ste registrovaný používateľ využite možnosť prihlásiť sa.</span>
        </div>


    );
};

export default RegistrationForm;
