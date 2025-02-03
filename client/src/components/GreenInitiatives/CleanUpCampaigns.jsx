import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CleanUpCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('/api/green-initiatives/cleanup-campaigns');
                setCampaigns(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    if (loading) return <div>Loading campaigns...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Clean-Up Campaigns</h2>
            <ul>
                {campaigns.map(campaign => (
                    <li key={campaign.id}>
                        <h3>{campaign.title}</h3>
                        <p>{campaign.description}</p>
                        <p>Date: {campaign.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CleanUpCampaigns;