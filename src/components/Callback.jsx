import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const callback = () => {
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');
            const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

            if (code) {
                try {
                    const response = await axios.post('redirect_uri/token', { code });
                } catch (error) {
                    console.error('Error exchanging code for token', error);
                }
            }
        };
        fetchData();
    }, [location]);

    return <div>Loading...</div>
};

export default Callback;