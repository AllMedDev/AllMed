import React from 'react';
import { Card } from 'react-bootstrap';
import { SITE_URL_APPOINTMENT_NEW } from '../../constants/SiteUrls'
import './ItemDoctorCard.css';

const ItemDoctorCard = ({ person }) => {
    return (
        <div onClick={event => window.location.href = `${SITE_URL_APPOINTMENT_NEW}?doctorid=${person.id}`}>
            <Card className="mb-3 card-center card-max-width">
                <Card.Body>
                    <Card.Title>
                        {person.first_name} {person.surname}
                    </Card.Title>
                    <Card.Text>
                        {person.address_street}, {person.address_city}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ItemDoctorCard;
