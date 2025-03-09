import React, { useState } from 'react';
import Geolocation from 'react-geolocation';
import Autocomplete from 'react-google-autocomplete';

const LocationInput = ({ onLocationSelect }) => {
    const [locationType, setLocationType] = useState('manual');
    const [manualLocation, setManualLocation] = useState('');
    const [liveLocation, setLiveLocation] = useState(null);

    // Handle GPS Location
    const fetchLiveLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locationData = `Lat: ${latitude}, Lng: ${longitude}`;
                setLiveLocation(locationData);
                onLocationSelect(locationData);
            },
            (error) => {
                console.error('Error fetching location:', error);
                alert('Unable to fetch live location.');
            }
        );
    };

    return (
        <div>
            <h3>Select Location Type:</h3>
            <label>
                <input
                    type="radio"
                    value="manual"
                    checked={locationType === 'manual'}
                    onChange={() => setLocationType('manual')}
                /> Manual Entry
            </label>
            <label>
                <input
                    type="radio"
                    value="gps"
                    checked={locationType === 'gps'}
                    onChange={() => setLocationType('gps')}
                /> Live Location (GPS)
            </label>

            {locationType === 'manual' && (
                <Autocomplete
                    apiKey="YOUR_GOOGLE_MAPS_API_KEY"
                    onPlaceSelected={(place) => {
                        const address = place.formatted_address;
                        setManualLocation(address);
                        onLocationSelect(address);
                    }}
                    options={{
                        types: ['geocode'],
                        componentRestrictions: { country: 'IN' }
                    }}
                    placeholder="Enter manual location"
                />
            )}

            {locationType === 'gps' && (
                <div>
                    <button onClick={fetchLiveLocation}>Get Live Location</button>
                    {liveLocation && <p>{liveLocation}</p>}
                </div>
            )}
        </div>
    );
};

export default LocationInput;
