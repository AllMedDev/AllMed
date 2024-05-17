import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Table, Button } from 'react-bootstrap';
import './PatientListing.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const PatientListingWithFilter = ({ items }) => {
    console.log(items);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('patient_surname');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedItems, setSortedItems] = useState([]);

    useEffect(() => {
        setSortedItems([...items]);
    }, [items]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleSort = (field) => {
        const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newDirection);

        const sorted = [...sortedItems].sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            if (field === 'last_appointment_date') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else {
                aValue = aValue.toString().toLowerCase();
                bValue = bValue.toString().toLowerCase();
            }

            if (aValue < bValue) return newDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return newDirection === 'asc' ? 1 : -1;
            return 0;
        });

        setSortedItems(sorted);
    };

    const filteredPatients = sortedItems.filter((patient) => {
        const fullName = `${patient.patient_first_name} ${patient.patient_surname}`.toLowerCase();
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
                    onClick={() => handleSort('patient_surname')}
                >
                    Zoradiť podľa mena {sortField === 'patient_surname' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
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
                        <th onClick={() => handleSort('patient_surname')}>Meno</th>
                        <th>Telefón</th>
                        <th>Email</th>
                        <th>Adresa</th>
                        <th onClick={() => handleSort('last_appointment_date')}>Dátum poslednej návštevy</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.patient_pin}</td>
                            <td>{`${patient.patient_first_name} ${patient.patient_surname}`}</td>
                            <td>{patient.patient_telephone}</td>
                            <td>{patient.patient_email}</td>
                            <td>
                                {patient.patient_address_street}, {patient.patient_address_city}
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
