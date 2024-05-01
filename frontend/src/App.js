import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import TopScrollButton from './components/TopScrollButton/TopScrollButton';
import Login from "./pages/Login/Login";
import RegisterDoctor from "./pages/DoctorRegister/DoctorRegister";
import RegisterPatient from "./pages/PatientRegister/PatientRegister";

import { SITE_URL_DOCTORS, 
    SITE_URL_PROFILE, 
    SITE_URL_APPOINTMENTS_FUTURE, 
    SITE_URL_APPOINTMENTS_PAST 
} from './constants/SiteUrls';

// TBD
// import PastAppointments from './pages/PastAppointments/PastAppointments';
// import FutureAppointments from './pages/FutureAppointments/FutureAppointments';
import Doctors from "./pages/Doctors/Doctors";
import Homepage from './pages/Homepage/Homepage';

const App = () => {    
    return (
        <div className='gradient-background'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="/uvod" element={<Homepage />} />
                    <Route path="/registracia-lekar" element={<RegisterDoctor /> } />
                    <Route path="/registracia-pacient" element={<RegisterPatient /> } />
                    <Route path="/lekari" element={<Doctors />} />
                    {/* TBD */}
                    {/* <Route path="/planovane-rezervacie"element={<PastAppointments />} />
                    <Route path="/historia-rezervacii" element={<FutureAppointments />} /> */}
                </Routes>
                <TopScrollButton />
            </Router>
        </div>
    );

}

export default App
