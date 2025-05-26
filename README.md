# 🏠 Home Automation Web App

A smart home web application built using **React.js** that controls and updates light colors based on the user's location. The system simulates home arrival detection using **ThingSpeak** cloud platform and integrates real-time RGB light control.

---

## 📌 Features

- 🎯 Detects user's proximity to home using geolocation.
- 🎨 Allows users to set RGB values to control a smart light.
- ☁️ Sends RGB data to ThingSpeak cloud in real-time.
- 🔄 Automatically updates cloud data when values or location change.
- ⚡ Responsive UI built with React and modern hooks (`useState`, `useEffect`, `useContext`).

---

## 🧩 Tech Stack

- **Frontend**: React.js (with Vite)
- **Cloud Platform**: ThingSpeak (IoT data platform)
- **Language**: JavaScript, HTML, CSS

---

## 📁 Project Structure

/home-automation-app
│
├── public/ # Static files
├── src/
│ ├── components/
│ │ ├── RGB.jsx # RGB controller component
│ │ └── Location.jsx# Location-based automation
│ ├── App.jsx # Root component
│ └── index.js
├── .gitignore
├── package.json
└── README.md

---

## 🚀 Getting Started

1. Clone the Repository

git clone https://github.com/your-username/home-automation-app.git
cd home-automation-app
2. Install Dependencies
bash
Copy code
npm install
3. Set Up ThingSpeak
Create a ThingSpeak channel.

Enable "Allow URL updates".

Note your Write API Key and Channel ID.

4. Configure API Details
In your writeToCloud() function inside your React components (e.g., RGB.jsx or Location.jsx), update the fetch/API URL with your:

Channel ID

Write API Key

5. Start the App
bash
Copy code
npm run dev
🧠 How It Works
The app fetches your live location.

If you're near a predefined point (e.g., your home), it triggers a light change.

The RGB sliders allow you to customize the color.

These values are sent to ThingSpeak using an API call.

The Raspberry Pi (or any IoT device) reads the updated values and changes the light accordingly.


🛠️ Future Improvements
Add user authentication

Use MQTT or WebSockets for real-time updates

Add scheduling or automation rules

Integrate with Google Maps API for more accurate geofencing


📬 Contact
Vedansh Upadhyay
📧 vedanshupadhyay1401@gmail.com
