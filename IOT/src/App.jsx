import "./App.css";
import Location from "./Components/Location";
import RGB from "./Components/RGB";
import Gas from "./Components/Gas";
import { useState, useEffect } from "react";

function App() {
    // const WriteApiKey = "PK3S0ACP4IK1UBL6"; // Replace with your actual ThingSpeak API Key
    // const ReadApiKey = "GJ0KBPKT65YZYMUI";
    // const channelId = "2823585";

    const WriteApiKey = import.meta.env.VITE_WRITE_API_KEY;
    const ReadApiKey = import.meta.env.VITE_READ_API_KEY;
    const channelId = import.meta.env.VITE_CHANNEL_ID;


    // State for all fields
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    // initialise location as current location as nhi kr toh null jaegi cloud p..
    // ek bar toh krna hi pdegi initialise
    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setLatitude(position.coords.latitude);
    //                 setLongitude(position.coords.longitude);
    //             },
    //             (error) => console.error("Error getting location:", error)
    //         );
    //     } else {
    //         console.error("Geolocation is not supported by this browser.");
    //     }
    // }, []);


    const [gas, setGas] = useState(0);
    const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 });
    const [savePoint, setSavePoint] = useState(0); // New Save Point Field

    const updateThingSpeak = () => {
        const url = `https://api.thingspeak.com/update?api_key=${WriteApiKey}
            &field1=${latitude ?? 0}
            &field2=${longitude ?? 0}
            &field3=${gas ?? 0}
            &field4=0
            &field5=${rgb.r ?? 0}
            &field6=${rgb.g ?? 0}
            &field7=${rgb.b ?? 0}
            &field8=${savePoint ?? 0}`.replace(/\s+/g, ''); // Removing extra spaces

        fetch(url)
            .then(response => response.text())
            .then(data => console.log("ThingSpeak Update Response:", data))
            .catch(error => console.error("Error updating ThingSpeak:", error));
    };
    // updateThingSpeak();

    // Call updateThingSpeak whenever state changes
    useEffect(() => {
        updateThingSpeak();
        // fetchLatestValues();
        console.log("Updated state values:");
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        console.log("Gas:", gas);
        console.log("RGB:", rgb);
        console.log("Save Point:", savePoint);
    }, [latitude, longitude,  rgb, savePoint]);


    // Function to fetch latest values from ThingSpeak
//     const fetchLatestValues = () => {
//         const url = `https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${ReadApiKey}`;
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 if (data) {
//                     setLatitude(data.field1 || latitude);
//                     setLongitude(data.field2 || longitude);
//                     setGas(data.field3 ? parseInt(data.field3) : gas);
//                     setRgb({
//                         r: data.field5 ? parseInt(data.field5) : rgb.r,
//                         g: data.field6 ? parseInt(data.field6) : rgb.g,
//                         b: data.field7 ? parseInt(data.field7) : rgb.b
//                     });
//                     setSavePoint(data.field8 ? parseInt(data.field8) : savePoint);

//                     // Console log fetched values
//                     console.log(`Fetched Data:
// lat: ${data.field1 || latitude}
// long: ${data.field2 || longitude}
// r: ${data.field5 ? parseInt(data.field5) : rgb.r}
// g: ${data.field6 ? parseInt(data.field6) : rgb.g}
// b: ${data.field7 ? parseInt(data.field7) : rgb.b}
// gas: ${data.field3 ? parseInt(data.field3) : gas}
// save point: ${data.field8 ? parseInt(data.field8) : savePoint}`);
//                 }
//             })
//             .catch(error => console.error("Error fetching latest values:", error));
//     };

    // Fetch latest values every 10 seconds
    // useEffect(() => {
    //     const interval = setInterval(fetchLatestValues, 10000);
    //     fetchLatestValues(); // Initial fetch
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div>
            <div className="Heading"> 
                <p>Home Automation</p>
            </div>
            <br /><br />

            <div className="main-div">

            <Location
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
            />

            <br />

            <RGB rgb={rgb} setRgb={setRgb} savePoint={savePoint} setSavePoint={setSavePoint} />

            <br />

            <Gas readApiKey={ReadApiKey} channelId={channelId} gas={gas} setGas={setGas} />


            </div>
            


          
        </div>
    );

}

export default App;
