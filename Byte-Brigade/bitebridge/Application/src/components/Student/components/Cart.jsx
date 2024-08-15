import React from 'react';
import axiosInstance from '../axiosInstance';
import { useLocation } from 'react-router-dom';
import '../styles/Cart.css'; // Assume you have some basic styles for the table

function Cart() {
    const location = useLocation();
    const cartItems = location.state?.cartItems || JSON.parse(localStorage.getItem('cartItems')) || [];

    // Calculate total quantity of items
    const getTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate total price of items
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handlePlaceOrder = async () => {
        try {
            const orderDetails = cartItems.map(item => ({
                dishId: item.dish_id, // Match the property name expected by backend
                quantity: item.quantity,
            }));
    
            console.log("Order Details:", orderDetails); // Log the payload for inspection
    
            await axiosInstance.post('/student/order', orderDetails); // Send array directly
            alert('Order placed successfully!');
            localStorage.removeItem('cartItems');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('There was an issue placing your order. Please try again.');
        }
    };

    return (
        <div className="cart-page-container">
            <h2>My Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-table-container">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.dish_id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price.toFixed(2)}</td>
                                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>{getTotalQuantity()}</strong></td>
                                <td></td>
                                <td><strong>₹{getTotalPrice()}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                    <button className="place-order-button" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
