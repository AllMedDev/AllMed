import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import './PatientsAppointments.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const ReservationList = ({ data, mainHeadline }) => {
    const [reservations, setReservations] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setReservations(data);
        }
    }, [data]);

    const handleSort = (column) => {
        if (sortCriterion === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriterion(column);
            setSortOrder('asc');
        }
    };

    const sortReservations = (a, b) => {
        let comparison = 0;

        if (sortCriterion === 'date') {
            const dateA = new Date(a.date.split('.').reverse().join('-'));
            const dateB = new Date(b.date.split('.').reverse().join('-'));
            comparison = dateA - dateB;
            if (comparison === 0) {
                comparison = a.doctor.localeCompare(b.doctor);
            }
        } else if (sortCriterion === 'doctor') {
            comparison = a.doctor.localeCompare(b.doctor);
            if (comparison === 0) {
                const dateA = new Date(a.date.split('.').reverse().join('-'));
                const dateB = new Date(b.date.split('.').reverse().join('-'));
                comparison = dateA - dateB;
            }
        } else {
            comparison = a[sortCriterion].localeCompare(b[sortCriterion]);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    };

    const sortedReservations = [...reservations].sort(sortReservations);

    return (
        <div className="reservation-list-container">
            <h2>{mainHeadline}</h2>
            <h4 className="headline">Svoje rezervácie si môžete zoradiť</h4>
            <div className="sort-buttons-row">
                <Row>
                    <Col>
                        <Button className='sort-button'
                            variant="outline-primary"
                            onClick={() => handleSort('date')}
                        >
                            Podľa dátumu {sortCriterion === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </Button>
                    </Col>
                    <Col>
                        <Button className='sort-button'
                            variant="outline-primary"
                            onClick={() => handleSort('doctor')}
                        >
                            Podľa lekára {sortCriterion === 'doctor' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </Button>
                    </Col>
                    <Col>
                        <Button className='sort-button'
                            variant="outline-primary"
                            onClick={() => handleSort('specialization')}
                        >
                            Podľa špecializácie {sortCriterion === 'specialization' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </Button>
                    </Col>
                </Row>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Dátum</th>
                        <th>Čas</th>
                        <th>Lekár</th>
                        <th>Špecializácia</th>
                        <th>Adresa</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedReservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{formatDate(reservation.date)}</td>
                            <td>{reservation.time}</td>
                            <td>{reservation.doctor_firstname} {reservation.doctor_surname}</td>
                            <td>{reservation.specialization}</td>
                            <td>{reservation.address_street}, {reservation.address_city}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ReservationList;
