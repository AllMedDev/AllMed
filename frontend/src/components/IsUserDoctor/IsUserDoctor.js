import { useState, useEffect } from 'react';

import { SITE_URL_LOGIN, SITE_URL_PROFILE } from '../../constants/SiteUrls';
import { API_URL_BASE } from '../../constants/ApiUrls';
import axios from 'axios';

const api = axios.create({ baseURL: API_URL_BASE, withCredentials: true });

const useIsUserDoctor = () => {
    const [is_doctor, setIsDoctor] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/user');
                if (response.status !== 200) {
                    window.location.href = SITE_URL_LOGIN;
                } else {
                    setIsDoctor(response.data.user.is_doctor);
                }
            } catch (error) {
                window.location.href = SITE_URL_LOGIN;
            }
        };

        fetchData();
    }, []);

    return is_doctor;
};

export default useIsUserDoctor;
