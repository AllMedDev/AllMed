import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { API_URL_GET_DOCTORS } from '../../constants/ApiUrls';

import NavBar from '../../components/NavBar/NavBar';
import CardFiltering from '../../components/DoctorCards/CardFiltering';
import './Doctors.css'


const DoctorsPage = () => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJson = () => {
        fetch(API_URL_GET_DOCTORS, 
            { method: 'GET', headers: {'Content-Type': 'application/json'} 
            }) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchJson();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>; 
    }
    
    return (
        <div>
            <NavBar></NavBar>
            {Array.isArray(data) ? (
                <CardFiltering items={data}> </CardFiltering>
            ) : (
                    <div>No data available</div> 
                )}
        </div>
    );

}

export default DoctorsPage
