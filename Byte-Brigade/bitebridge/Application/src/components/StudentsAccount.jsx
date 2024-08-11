import React, { useState } from "react";
import './styles/studentsAccount.css';

// Username(email), password, first name, last name, prn, token balance 
const AddStudentForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [prnNumber, setPrnNumber] = useState("");
    const [tokens, setTokens] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Valid email is required.";
        }
        if (!password || password.length < 6) {
            formErrors.password = "Password must be at least 6 characters.";
        }
        if (!firstName) {
            formErrors.firstName = "First name is required.";
        }
        if (!lastName) {
            formErrors.lastName = "Last name is required.";
        }
        if (!prnNumber || prnNumber.length !== 12 || isNaN(prnNumber)) {
            formErrors.prnNumber = "PRN Number must be exactly 12 digits.";
        }
        if (tokens === "" || tokens < 0) {
            formErrors.tokens = "Tokens must be a non-negative number.";
        }

        if (Object.keys(formErrors).length === 0) {
            alert("Student added successfully");
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setPrnNumber("");
            setTokens("");
        } else {
            setErrors(formErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "firstName") setFirstName(value);
        if (name === "lastName") setLastName(value);
        if (name === "prnNumber") setPrnNumber(value);
        if (name === "tokens") setTokens(value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Student</h3>
            <label>
                Username (Email):
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter student email"
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </label>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
            </label>
            <label>
                PRN Number:
                <input
                    type="text"
                    name="prnNumber"
                    value={prnNumber}
                    onChange={handleChange}
                    placeholder="Enter PRN Number"
                    maxLength="12"
                    pattern="\d*"
                    required
                />
                {errors.prnNumber && <p className="error">{errors.prnNumber}</p>}
            </label>
            <label>
                Tokens:
                <input
                    type="number"
                    name="tokens"
                    value={tokens}
                    onChange={handleChange}
                    placeholder="Enter tokens"
                    min="0"
                    required
                />
                {errors.tokens && <p className="error">{errors.tokens}</p>}
            </label>
            <button type="submit">Add Student</button>
        </form>
    );
};

const DeleteStudentForm = () => (
    <form>
        <h3>Delete Student</h3>
        <label>
            PRN Number:
            <input type="text" placeholder="Enter PRN Number to delete" />
        </label>
        <button type="submit">Delete Student</button>
    </form>
);

const UpdateStudentForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [prnNumber, setPrnNumber] = useState("");
    const [tokens, setTokens] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Valid email is required.";
        }
        if (password && password.length < 6) { 
            formErrors.password = "Password must be at least 6 characters.";
        }
        if (!firstName) {
            formErrors.firstName = "First name is required.";
        }
        if (!lastName) {
            formErrors.lastName = "Last name is required.";
        }
        if (!prnNumber || prnNumber.length !== 12 || isNaN(prnNumber)) {
            formErrors.prnNumber = "PRN Number must be exactly 12 digits.";
        }
        if (tokens === "" || tokens < 0) {
            formErrors.tokens = "Tokens must be a non-negative number.";
        }

        if (Object.keys(formErrors).length === 0) {
            alert("Student updated successfully");
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setPrnNumber("");
            setTokens("");
        } else {
            setErrors(formErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "firstName") setFirstName(value);
        if (name === "lastName") setLastName(value);
        if (name === "prnNumber") setPrnNumber(value);
        if (name === "tokens") setTokens(value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Update Student</h3>
            <label>
                Username (Email):
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter student email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter new password (optional)"
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </label>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
            </label>
            <label>
                PRN Number:
                <input
                    type="text"
                    name="prnNumber"
                    value={prnNumber}
                    onChange={handleChange}
                    placeholder="Enter PRN Number"
                    maxLength="12"
                    pattern="\d*"
                />
                {errors.prnNumber && <p className="error">{errors.prnNumber}</p>}
            </label>
            <label>
                Tokens:
                <input
                    type="number"
                    name="tokens"
                    value={tokens}
                    onChange={handleChange}
                    placeholder="Enter tokens"
                    min="0"
                />
                {errors.tokens && <p className="error">{errors.tokens}</p>}
            </label>
            <button type="submit">Update Student</button>
        </form>
    );
};

export default function StudentsAccount() {
    const [activeForm, setActiveForm] = useState("");

    const toggleForm = (formName) => {
        setActiveForm((prev) => (prev === formName ? "" : formName));
    };

    return (
        <div className="student-management">
            <div className="buttons">
                <button onClick={() => toggleForm("add")}>Add Student</button>
                <button onClick={() => toggleForm("delete")}>Delete Student</button>
                <button onClick={() => toggleForm("update")}>Update Student</button>
            </div>
            <div className="forms">
                {activeForm === "add" && <AddStudentForm />}
                {activeForm === "delete" && <DeleteStudentForm />}
                {activeForm === "update" && <UpdateStudentForm />}
            </div>
        </div>
    );
}
