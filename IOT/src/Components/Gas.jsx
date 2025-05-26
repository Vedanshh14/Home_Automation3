import './gas.css'; 
import { useState, useEffect } from "react";

function Gas({ GasreadApiKey, GaschannelId, gas, setGas }) {
    const [beepSound, setBeepSound] = useState(null);

    // Initialize beep sound
    useEffect(() => {
        const sound = new Audio("/gas_alarm.mp3");
        setBeepSound(sound);
    }, []);

    // Function to fetch gas status from ThingSpeak
    const fetchGasStatus = () => {
        if (!GasreadApiKey || !GaschannelId) {
            console.error("API Key or Channel ID is missing!");
            return;
        }

        const url = `https://api.thingspeak.com/channels/${GaschannelId}/feeds/last.json?api_key=${GasreadApiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data && data.field1 !== undefined) {
                    setGas(parseInt(data.field1) === 1 ? 1 : 0); // Ensure it's only 0 or 1
                    // gasValue=0;
                    // gasValue=1;
                    // setGas(gasValue);
                }
            })
            .catch(error => {
                console.error("Error fetching gas status:", error);
            });
    };

    // Effect to handle sound based on gas status
    useEffect(() => {
        if (beepSound) {
          
            if (gas === 1) {
                beepSound.loop = true;
                beepSound.play().catch(err => console.log("Audio play error:", err));
            } else {
                beepSound.pause();
                beepSound.currentTime = 0; // Reset sound
            }
    }
    }, [gas, beepSound]); // Now this runs whenever gas changes

    // Fetch gas data every 2 seconds
    useEffect(() => {
        fetchGasStatus(); // Initial fetch
        const interval = setInterval(fetchGasStatus, 1000);
        return () => clearInterval(interval); // Cleanup interval
    }, []); // Fetching only on mount

    return (
        <div>
            <h2 className='gas-heading'>Gas Sensor Status:</h2>
            <h3 className='gas-status'>
                {gas ? "🔴🔥 Gas Detected !!" : "🟢 No Gas Detected."}
            </h3>
        </div>
    );
}

export default Gas;

