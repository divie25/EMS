import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const RecyclingCenters = () => {
    // Dummy data for default display
  const dummyCenters = [
    // Chennai (17)
    { id: 1, name: "Chennai Green Center", address: "Adyar, Chennai", contact: "044-1234567" },
    { id: 2, name: "Eco Solutions", address: "Tambaram, Chennai", contact: "044-7654321" },
    { id: 3, name: "Chennai Plastic Recyclers", address: "OMR, Chennai", contact: "044-8765432" },
    { id: 4, name: "Urban Green Chennai", address: "Anna Nagar, Chennai", contact: "044-3214567" },
    { id: 5, name: "Smart Recycle Chennai", address: "T. Nagar, Chennai", contact: "044-9876543" },
    { id: 6, name: "Eco Drive Chennai", address: "Guindy, Chennai", contact: "044-1111222" },
    { id: 7, name: "BinRight Chennai", address: "Velachery, Chennai", contact: "044-3333444" },
    { id: 8, name: "Zero Waste Facility", address: "Perambur, Chennai", contact: "044-5555666" },
    { id: 9, name: "GreenStar Recycling", address: "Washermanpet, Chennai", contact: "044-7777888" },
    { id: 10, name: "CycleAgain Chennai", address: "Mylapore, Chennai", contact: "044-9999000" },
    { id: 11, name: "CleanBin", address: "Chromepet, Chennai", contact: "044-8888777" },
    { id: 12, name: "Recycle Hub", address: "Avadi, Chennai", contact: "044-2222333" },
    { id: 13, name: "Chennai Green Life", address: "Porur, Chennai", contact: "044-6666777" },
    { id: 14, name: "Eco Savers", address: "Kilpauk, Chennai", contact: "044-1010101" },
    { id: 15, name: "Trash2Cash", address: "Kodambakkam, Chennai", contact: "044-1212121" },
    { id: 16, name: "GreenChennai", address: "Royapettah, Chennai", contact: "044-4545454" },
    { id: 17, name: "Recycle House", address: "Nungambakkam, Chennai", contact: "044-3434343" },

    // Coimbatore (17)
    { id: 18, name: "Covai Eco Facility", address: "Gandhipuram, Coimbatore", contact: "0422-2233445" },
    { id: 19, name: "Green Covai", address: "RS Puram, Coimbatore", contact: "0422-1122334" },
    { id: 20, name: "RecycleIt Covai", address: "Peelamedu, Coimbatore", contact: "0422-9988776" },
    { id: 21, name: "Urban Waste Recyclers", address: "Sai Baba Colony, Coimbatore", contact: "0422-4433221" },
    { id: 22, name: "EcoRight", address: "Avinashi Road, Coimbatore", contact: "0422-3322110" },
    { id: 23, name: "Green Roots", address: "Singanallur, Coimbatore", contact: "0422-4445555" },
    { id: 24, name: "Recycle4Life", address: "Podanur, Coimbatore", contact: "0422-9998887" },
    { id: 25, name: "CleanCovai", address: "Ukkadam, Coimbatore", contact: "0422-1212121" },
    { id: 26, name: "Zero Waste Covai", address: "Kalapatti, Coimbatore", contact: "0422-4545454" },
    { id: 27, name: "GreenBin Covai", address: "Kuniamuthur, Coimbatore", contact: "0422-2323232" },
    { id: 28, name: "Eco Sparks", address: "Thudiyalur, Coimbatore", contact: "0422-6767676" },
    { id: 29, name: "Waste Warriors", address: "Saravanampatti, Coimbatore", contact: "0422-8787878" },
    { id: 30, name: "Covai Reuse Center", address: "Vadavalli, Coimbatore", contact: "0422-5656565" },
    { id: 31, name: "Eco Facility Zone", address: "Nehru Nagar, Coimbatore", contact: "0422-7878787" },
    { id: 32, name: "Green Movement", address: "Vilankurichi, Coimbatore", contact: "0422-3434343" },
    { id: 33, name: "Recycle Path", address: "Mettupalayam Road, Coimbatore", contact: "0422-6767980" },
    { id: 34, name: "Go Green Recyclers", address: "Ganapathy, Coimbatore", contact: "0422-1010101" },

    // Madurai (16)
    { id: 35, name: "Madurai Eco Zone", address: "Anna Nagar, Madurai", contact: "0452-1231231" },
    { id: 36, name: "Recycle Madurai", address: "KK Nagar, Madurai", contact: "0452-4564564" },
    { id: 37, name: "ZeroBin Facility", address: "Thiruparankundram, Madurai", contact: "0452-7897897" },
    { id: 38, name: "Green Madurai", address: "Koodal Nagar, Madurai", contact: "0452-3213213" },
    { id: 39, name: "Smart Waste Madurai", address: "Mattuthavani, Madurai", contact: "0452-6546546" },
    { id: 40, name: "EcoReclaim", address: "Arapalayam, Madurai", contact: "0452-2223334" },
    { id: 41, name: "GreenPoint Madurai", address: "Palanganatham, Madurai", contact: "0452-1112223" },
    { id: 42, name: "Sustainable Madurai", address: "Kalavasal, Madurai", contact: "0452-3334445" },
    { id: 43, name: "Madurai Clean Zone", address: "Sellur, Madurai", contact: "0452-6667778" },
    { id: 44, name: "Recycle Kart", address: "Simmakkal, Madurai", contact: "0452-8989898" },
    { id: 45, name: "EcoBin Madurai", address: "Melur Road, Madurai", contact: "0452-4445566" },
    { id: 46, name: "Green Touch", address: "Villapuram, Madurai", contact: "0452-7878123" },
    { id: 47, name: "Waste2Wealth", address: "Keelavasal, Madurai", contact: "0452-9090909" },
    { id: 48, name: "EcoNest Madurai", address: "Karuppayurani, Madurai", contact: "0452-2323232" },
    { id: 49, name: "EcoSmart Solutions", address: "Kochadai, Madurai", contact: "0452-8787888" },
    { id: 50, name: "Green Field Madurai", address: "Alanganallur, Madurai", contact: "0452-6565656" },
  // Mumbai
    { id: 6, name: "Mumbai Eco Facility", address: "Andheri West, Mumbai", contact: "022-2233445" },
    { id: 7, name: "Urban Recyclers Mumbai", address: "Bandra East, Mumbai", contact: "022-1122334" },
    { id: 8, name: "GoGreen Mumbai", address: "Dadar, Mumbai", contact: "022-9988776" },
    { id: 9, name: "City Waste Management", address: "Powai, Mumbai", contact: "022-4433221" },
    { id: 10, name: "RecycleRight", address: "Navi Mumbai", contact: "022-3322110" },

    // Delhi
    { id: 11, name: "Delhi Recycle Center", address: "Rohini Sector 5, Delhi", contact: "011-5556677" },
    { id: 12, name: "EcoBin Recycling", address: "Lajpat Nagar, Delhi", contact: "011-6667788" },
    { id: 13, name: "Delhi Plastic Recycling", address: "Dwarka, Delhi", contact: "011-7778899" },
    { id: 14, name: "UrbanCycle", address: "Saket, Delhi", contact: "011-8889900" },
    { id: 15, name: "ReGreen Center", address: "Karol Bagh, Delhi", contact: "011-9991001" },

    // Bangalore
    { id: 16, name: "Bangalore Waste Solutions", address: "Whitefield, Bangalore", contact: "080-1231231" },
    { id: 17, name: "EcoCycle Bangalore", address: "Koramangala, Bangalore", contact: "080-4564564" },
    { id: 18, name: "GreenBin Recyclers", address: "Indiranagar, Bangalore", contact: "080-7897897" },
    { id: 19, name: "CycleAgain", address: "Yeshwantpur, Bangalore", contact: "080-3213213" },
    { id: 20, name: "BinSmart", address: "HSR Layout, Bangalore", contact: "080-6546546" },

    // Hyderabad
    { id: 21, name: "Hyderabad Eco Centre", address: "Banjara Hills, Hyderabad", contact: "040-2223333" },
    { id: 22, name: "Recycle It", address: "Gachibowli, Hyderabad", contact: "040-4445555" },
    { id: 23, name: "Smart Waste Solutions", address: "Secunderabad, Hyderabad", contact: "040-6667777" },
    { id: 24, name: "GreenLab Hyderabad", address: "Madhapur, Hyderabad", contact: "040-8889999" },
    { id: 25, name: "EcoDrop", address: "Begumpet, Hyderabad", contact: "040-1234567" },

    // Kolkata
    { id: 26, name: "Kolkata Recycle Zone", address: "Salt Lake, Kolkata", contact: "033-2345678" },
    { id: 27, name: "Green Solutions", address: "Howrah, Kolkata", contact: "033-8765432" },
    { id: 28, name: "WasteLess", address: "Park Street, Kolkata", contact: "033-5678901" },
    { id: 29, name: "East Recycle Co", address: "New Town, Kolkata", contact: "033-1122334" },
    { id: 30, name: "UrbanBin Kolkata", address: "Dumdum, Kolkata", contact: "033-9988776" },

    // Pune
    { id: 31, name: "Pune Eco Warriors", address: "Kothrud, Pune", contact: "020-2233445" },
    { id: 32, name: "RecycleRite", address: "Shivajinagar, Pune", contact: "020-9988771" },
    { id: 33, name: "Green Collect", address: "Hadapsar, Pune", contact: "020-4433221" },
    { id: 34, name: "SmartBin Pune", address: "Baner, Pune", contact: "020-3344556" },
    { id: 35, name: "EcoNest", address: "Viman Nagar, Pune", contact: "020-8765432" },

    // Ahmedabad
    { id: 36, name: "Ahmedabad Eco Hub", address: "Maninagar, Ahmedabad", contact: "079-9988771" },
    { id: 37, name: "RecyclePlus", address: "Navrangpura, Ahmedabad", contact: "079-3344556" },
    
    // Jaipur
    { id: 38, name: "Jaipur Green Facility", address: "C-Scheme, Jaipur", contact: "0141-4433221" },

    // Lucknow
    { id: 39, name: "Lucknow Recycling Depot", address: "Hazratganj, Lucknow", contact: "0522-1234567" },
    { id: 40, name: "EcoWay Lucknow", address: "Alambagh, Lucknow", contact: "0522-7654321" }
]


    const [centers, setCenters] = useState(dummyCenters);
    const [areaName, setAreaName] = useState('Chennai');


    // useEffect(() => {
    // const fetchRecyclingCenters = async () => {
    //     try {
    //         const response = await axios.get(url + '/api/waste/recycling-centers');
    //         setCenters(response.data);
    //     } catch (error) {
    //         console.error('Error fetching recycling centers:', error);
    //     }
    // };

    // fetchRecyclingCenters();
    const fetchRecyclingCenters = async () => {
        try {
            const overpassQuery = `
            [out:json][timeout:25];
            area["name"="${areaName}"]->.searchArea;
            (
                node["amenity"="recycling"](area.searchArea);
            );
            out body;
            >;
            out skel qt;
        `;
            const response = await axios.post('https://overpass-api.de/api/interpreter', overpassQuery, {
                headers: { 'Content-Type': 'text/plain' },
            });
            const data = response.data.elements.map((element, index) => {
                const lat = element.lat;
                const lon = element.lon;
                return {
                    id: index + 1,
                    name: element.tags.name || 'Unnamed Recycling Center',
                    address: `${element.tags['addr:street'] || 'Street N/A'}, ${element.tags['addr:city'] || 'City N/A'}`,
                    contact: element.tags.phone || 'N/A',
                    lat,
                    lon,
                };
            });

            console.log(response.data);

            setCenters(data.length > 0 ? data : dummyCenters);
        } catch (error) {
            console.error('Error fetching recycling centers:', error);
        }
    };

    //   fetchRecyclingCenters();


    // }, []);

    useEffect(() => {
        fetchRecyclingCenters();
    }, []);

    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    placeholder="Enter Area Name (e.g., Chennai)"
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '60%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <button
                    onClick={fetchRecyclingCenters}
                    style={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </div>

            <div style={styles.container}>
                <h1 style={styles.heading}>Recycling Centers</h1>
                <ul style={styles.list}>
                    {centers.map(center => (
                        <li key={center.id} style={styles.listItem}>
                            <h2 style={styles.centerName}>{center.name}</h2>
                            <p style={styles.centerAddress}>
                                <a
                                    href={ center.lat!=undefined? `https://www.google.com/maps?q=${center.lat},${center.lon}`: `https://www.google.com/maps?q=${center.address+center.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#0077cc', textDecoration: 'none' }}
                                >
                                    {center.address}
                                </a>
                            </p>

                            <p style={styles.centerContact}>Contact: {center.contact}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#e9f7f6',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '40px auto',

    },
    heading: {
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '700',
        color: '#4caf50',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    listItem: {
        backgroundColor: '#ffffff',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    centerName: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
    },
    centerAddress: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '8px',
    },
    centerContact: {
        fontSize: '16px',
        color: '#777',
    },
};

// Adding hover effect for list items
const hoverEffectStyle = `
    .listItem:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
        background-color: #f0f8f7;
    }
`;

export default RecyclingCenters;
