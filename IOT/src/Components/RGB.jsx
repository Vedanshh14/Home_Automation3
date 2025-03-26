import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import './rgb.css';

function RGB({ rgb, setRgb, savePoint, setSavePoint }) {
    const [color, setColor] = useState("#ff0000"); // Selected HEX color
    const [rgbPreview, setRgbPreview] = useState({ r: 255, g: 0, b: 0 }); // Temporary RGB preview

    // Convert HEX to RGB
    const hexToRgb = (hex) => {
        let bigint = parseInt(hex.substring(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    };

    // Handle color change (only updates preview, not final state)
    const handleColorChange = (newColor) => {
        setColor(newColor);
        setRgbPreview(hexToRgb(newColor)); // Updates only preview state
    };

    // Set final RGB state when clicking the button
    const handleSetColor = () => {
        setRgb(rgbPreview);
    };

    // Toggle Save Point
    const handleSavePointChange = (value) => {
        setSavePoint(value);
    };

    return (
        <div className="rgbcontainer">
            <h2 className="light-heading">Light Theme</h2>
            <div className="radio-container">
                <label className="light-label">
                    <input type="radio" checked={savePoint === 0} onChange={() => handleSavePointChange(0)} />
                    Automatic
                </label>
                <label className="light-label">
                    <input type="radio" checked={savePoint === 1} onChange={() => handleSavePointChange(1)} />
                    Manual
                </label>
            </div>


            {savePoint === 1 && (
                <>
                    <HexColorPicker className="pallette" color={color} onChange={handleColorChange} />
                    <p>Selected RGB: {rgbPreview.r}, {rgbPreview.g}, {rgbPreview.b}</p>

                    <button className="set-button" onClick={handleSetColor}>
                        Set Color
                    </button>

                    {/* <p>Final RGB: {rgb.r}, {rgb.g}, {rgb.b}</p> */}
                </>
            )}
        </div>
    );
}

export default RGB;

