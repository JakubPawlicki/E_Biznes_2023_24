import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedPage = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                }

                const response = await axios.get('http://localhost:5000/protected', {
                    headers: {
                        'x-access-token': token
                    }
                });

                setMessage(response.data.message);
            } catch (error) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>
            <h2>{message}</h2>
        </div>
    );
};

export default ProtectedPage;
