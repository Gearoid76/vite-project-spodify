// src/Callback.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      // Handle the code (e.g., send it to your backend for token exchange)
      console.log('Authorization code:', code);

      // Navigate to your main application page or a success page
      navigate('/');
    } else {
      // Handle the error case
      console.error('No authorization code found');
      navigate('/');
    }
  }, [location, navigate]);

  return <div>Processing callback...</div>;
};

export default Callback;
