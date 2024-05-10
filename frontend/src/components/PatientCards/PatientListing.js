import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Table, Button } from 'react-bootstrap';
import './PatientListing.css';

const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the string to a Date object
    const formatter = new Intl.DateTimeFormat('sk-SK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    return formatter.format(date);
};

const PatientListingWithFilter = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('last_appointment_date');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

   const handleSort = (field) => {
        const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'; // Toggle direction
        setSortField(field);
        setSortDirection(newDirection);

        // Sort the items based on the chosen field and direction
        const sortedItems = [...items].sort((a, b) => {
            const aValue = a[field].toString().toLowerCase();
            const bValue = b[field].toString().toLowerCase();
            return newDirection === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
        });

        // Update items to the sorted version
        return sortedItems;
    };

    const filteredPatients = items.filter((patient) => {
        const fullName = `${patient.first_name} ${patient.surname}`.toLowerCase();
        return fullName.includes(searchTerm);
    });

    return (
        <div className="patient-listing">
            <div className="patient-search-bar">
                <Form.Control
                    type="text"
                    className="patient-search-input"
                    placeholder="Vyhľadať podľa mena..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="patients-sorting-buttons">
                <Button className='patients-sort-button'
                    variant="primary"
                    onClick={() => handleSort('first_name')}
                >
                    Zoradiť podľa mena {sortField === 'first_name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </Button>
                <Button className='patients-sort-button'
                    variant="secondary"
                    onClick={() => handleSort('last_appointment_date')}
                >
                    Zoradiť podľa poslednej návštevy {sortField === 'last_appointment_date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rodné číslo</th>
                        <th onClick={() => handleSort('first_name')}>Meno</th>
                        <th>Telefón</th>
                        <th>Email</th>
                        <th>Adresa</th>
                        <th onClick={() => handleSort('last_appointment_date')}>Dátum poslednej návštevy</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.pin}</td>
                            <td>{`${patient.first_name} ${patient.surname}`}</td>
                            <td>{patient.telephone}</td>
                            <td>{patient.email}</td>
                            <td>
                                {patient.address_street}, {patient.address_city}
                            </td>
                            <td>{formatDate(patient.last_appointment_date)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PatientListingWithFilter;
