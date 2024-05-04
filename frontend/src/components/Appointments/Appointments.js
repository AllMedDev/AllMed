import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import './Appointments.css';

const ReservationList = ({ data, mainHeadline }) => {
  const [reservations, setReservations] = useState([]); // Initialize with an empty array
  const [sortCriterion, setSortCriterion] = useState('date'); // Default sorting
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setReservations(data); // Set the state with the provided data
    }
  }, [data]); // Re-run the effect if `data` changes

  const handleSort = (column) => {
    if (sortCriterion === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      setSortCriterion(column); // Change the sorting criterion
      setSortOrder('asc'); // Default to ascending for new criterion
    }
  };

  const sortReservations = (a, b) => {
    let comparison;

    if (sortCriterion === 'date') {
      const dateA = new Date(a.date.split('.').reverse().join('-')); // Convert to proper date format
      const dateB = new Date(b.date.split('.').reverse().join('-'));
      comparison = dateA - dateB; // Compare dates
    } else {
      comparison = a[sortCriterion].localeCompare(b[sortCriterion]); // Compare as strings
    }

    return sortOrder === 'asc' ? comparison : -comparison; // Adjust based on sort order
  };

  const sortedReservations = [...reservations].sort(sortReservations); // Sort the reservations

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
              Podľa dátumu ({sortCriterion === 'date' ? sortOrder.toUpperCase() : ''})
            </Button>
          </Col>
          <Col>
            <Button className='sort-button'
              variant="outline-primary"
              onClick={() => handleSort('doctor')}
            >
              Podľa lekára ({sortCriterion === 'doctor' ? sortOrder.toUpperCase() : ''})
            </Button>
          </Col>
          <Col>
            <Button className='sort-button'
              variant="outline-primary"
              onClick={() => handleSort('specialization')}
            >
              Podľa špecializácie ({sortCriterion === 'specialization' ? sortOrder.toUpperCase() : ''})
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
              <td>{reservation.date}</td>
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
