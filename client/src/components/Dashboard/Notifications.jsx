import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: 'New user signed up.',
            date: '2025-01-24T10:30:00Z',
        },
        {
            id: 2,
            message: 'System update completed successfully.',
            date: '2025-01-24T11:00:00Z',
        },
        {
            id: 3,
            message: 'New comment on your post.',
            date: '2025-01-24T12:15:00Z',
        },
        {
            id: 4,
            message: 'Your subscription has been renewed.',
            date: '2025-01-24T14:00:00Z',
        },
        {
            id: 5,
            message: 'Server maintenance scheduled for tonight.',
            date: '2025-01-24T15:30:00Z',
        },
    ]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(url + '/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div
            className="notifications"
            style={{
                backgroundColor: '#f4f4f9',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px',
                margin: '20px auto',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#333',
                    fontSize: '24px',
                    fontWeight: 'bold',
                }}
            >
                Notifications
            </h2>
            <ul
                style={{
                    listStyleType: 'none',
                    padding: '0',
                    margin: '0',
                }}
            >
                {notifications.map((notification) => (
                    <li
                        key={notification.id}
                        style={{
                            backgroundColor: '#fff',
                            padding: '15px',
                            marginBottom: '10px',
                            borderRadius: '8px',
                            borderLeft: '5px solid #4CAF50', // Green left border for new notifications
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.02)';
                            e.target.style.backgroundColor = '#f1f1f1'; // Light grey background on hover
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.backgroundColor = '#fff'; // Reset to white on hover out
                        }}
                    >
                        <p
                            style={{
                                color: '#555',
                                fontSize: '16px',
                                margin: '0',
                                fontWeight: 'normal',
                            }}
                        >
                            {notification.message}
                        </p>
                        <span
                            style={{
                                display: 'block',
                                marginTop: '8px',
                                color: '#888',
                                fontSize: '14px',
                            }}
                        >
                            {new Date(notification.date).toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
