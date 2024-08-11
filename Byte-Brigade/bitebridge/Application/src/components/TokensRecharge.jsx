import React, { useState } from "react";
import './styles/tokensRecharge.css';

export default function TokensRecharge() {
    // State for the input fields
    const [prnNumber, setPrnNumber] = useState("");
    const [tokens, setTokens] = useState("");
    const [error, setError] = useState("");

    // Handler function for the form submission
    const handleRecharge = (e) => {
        e.preventDefault(); // Prevents the default form submission

        // Validate PRN Number
        if (prnNumber.length !== 12 || isNaN(prnNumber)) {
            setError("PRN Number must be exactly 12 digits.");
            return;
        }

        // Convert PRN number to number type
        //this value will be used to search the prn in database
        const prnAsNumber = Number(prnNumber);

        // Reset error and show the alert
        setError("");
        alert("Recharge Successful");

        // Reset the form fields
        setPrnNumber("");
        setTokens("");
    };

    return (
        <div className="recharge-form">
            <form onSubmit={handleRecharge}>
                <div>
                    <label htmlFor="prnNumber">PRN Number:</label>
                    <input
                        type="text"
                        id="prnNumber"
                        value={prnNumber}
                        onChange={(e) => setPrnNumber(e.target.value)}
                        maxLength="12" // Limit to 12 characters
                        placeholder="Enter PRN Number"
                        pattern="\d*" // Allows only numeric input
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tokens">Tokens to Recharge:</label>
                    <input
                        type="number"
                        id="tokens"
                        value={tokens}
                        onChange={(e) => setTokens(e.target.value)}
                        placeholder="Enter number of tokens"
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button className="rechargeBtn" type="submit">Recharge</button>
            </form>
        </div>
    );
}
