import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import TopScrollButton from './components/TopScrollButton/TopScrollButton';

import LoginPage from "./pages/Login/Login";
import RegisterDoctorPage from "./pages/DoctorRegister/DoctorRegister";
import RegisterPatientPage from "./pages/PatientRegister/PatientRegister";
import ProfilePage from "./pages/Profile/Profile"
import DoctorsPage from "./pages/Doctors/Doctors";
import ReservationFormPage from './pages/NewReservation/NewReservation';
import PastAppointments from './pages/PastAppointments/PastAppointments';
import FutureAppointments from './pages/FutureAppointments/FutureAppointments';

// TBD
// import PastAppointments from './pages/PastAppointments/PastAppointments';
// import FutureAppointments from './pages/FutureAppointments/FutureAppointments';
import Doctors from "./pages/Doctors/Doctors";
import Homepage from './pages/Profile/Profile';
import NewReservation from './pages/NewReservation/NewReservation';

const App = () => {    
    return (
        <div className='gradient-background'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route path="/profil" element={<ProfilePage />} />
                    <Route path="/registracia-lekar" element={<RegisterDoctorPage /> } />
                    <Route path="/registracia-pacient" element={<RegisterPatientPage /> } />
                    <Route path="/lekari" element={<DoctorsPage />} />
                    <Route path="/nova-rezervacia" element={<ReservationFormPage />} />
                    <Route path="/planovane-rezervacie"element={<FutureAppointments />} />
                    <Route path="/historia-rezervacii" element={<PastAppointments />} />
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
