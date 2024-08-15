import React, { useState } from "react";
import axiosInstance from '../axiosInstance';
import '../styles/studentNavbar.css';
import Friends from './FriendList';
import Home from './HomeMenu';
import Cart from "./Cart";

export default function NavbarStudent() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Home");
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); // State to hold cart items

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/student/logout');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('cartItems'); // Clear cart items on logout
            alert("You have been logged out.");
            window.location.href = '/signup';
        } catch (error) {
            console.error('Error logging out:', error);
            alert("Error logging out. Please try again.");
        }
    };
    

    const handleViewCart = (updatedCartItems) => {
        setCartItems(updatedCartItems); // Update the cartItems state
        setSelectedItem("Cart");
    };

    return (
        <div className="mainContainer">
            <div className="navbarCover">
                <div className="nav-items">
                    <ul>
                        <li className="hamburger" onClick={toggleMenu}>
                            <span className="line"></span>
                            <span className="line"></span>
                            <span className="line"></span>
                        </li>
                        <li>ByteBridge</li>
                    </ul>
                    <ul>
                        <li className="profileImage" onClick={toggleProfileDropdown}>
                            <img src="/images/profileIcon.png" alt="ProfileIcon" />
                            <div className={`profile-dropdown ${profileDropdownOpen ? 'open' : ''}`}>
                                <ul>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={`studentDropdown-menu ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li onClick={() => handleMenuItemClick("Home")}>Home</li>
                        <li onClick={() => handleMenuItemClick("FriendList")}>FriendList</li>
                        <li onClick={() => handleMenuItemClick("Cart")}>Cart</li>
                    </ul>
                </div>
            </div>
            <div className="content-area">
                {selectedItem === "Home" && (
                    <Home 
                        onViewCart={handleViewCart} 
                        cartItems={cartItems} // Pass current cartItems to Home
                        setCartItems={setCartItems} // Pass setCartItems to update cartItems from Home
                    />
                )}
                {selectedItem === "FriendList" && <Friends />}
                {selectedItem === "Cart" && <Cart cartItems={cartItems} />} {/* Pass cartItems to Cart */}
                {!selectedItem && <h1>Welcome!</h1>}
            </div>
        </div>
    );
}
