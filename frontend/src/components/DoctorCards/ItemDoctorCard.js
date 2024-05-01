import React from 'react';
import { Card } from 'react-bootstrap';
import './ItemDoctorCard.css';

const ItemDoctorCard = ({ person }) => {
    return (
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
    );
};

export default ItemDoctorCard;
