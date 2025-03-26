import './location.css'; 
import { useState, useEffect } from "react";


function Location({ latitude, longitude, setLatitude, setLongitude }) {
    const [locationSync, setLocationSync] = useState(false);

    // Function to fetch current location
    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => console.error("Error getting location:", error)
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    // Automatically fetch location every 2 minutes if sync is ON
    useEffect(() => {
        if (locationSync) {
            fetchLocation(); // Fetch immediately when sync is turned ON
            const interval = setInterval(fetchLocation, 120000);
            return () => clearInterval(interval);
        }
    }, [locationSync]);

    return (
        <div className='location-container'>
            <h2 className='location-heading'>Location: {locationSync ? "ON" : "OFF"}</h2>
            <button className='location-button' onClick={() => setLocationSync(!locationSync)}>
                {locationSync ? "Stop Sync" : "Start Sync"}
            </button>
        </div>
    );
}

export default Location;
