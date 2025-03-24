import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/cart');
            setCartItems(response.data);
        } catch (err) {
            setError('Failed to fetch cart items');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await axios.put(`http://localhost:4000/api/cart/update/${itemId}`, {
                quantity: newQuantity,
            });
            fetchCartItems();
        } catch (err) {
            console.error('Failed to update quantity:', err);
        }
    };

    const removeItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:4000/api/cart/remove/${itemId}`);
            fetchCartItems();
        } catch (err) {
            console.error('Failed to remove item:', err);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/order/create', {
                items: cartItems.map(item => ({
                    food: item.food._id,
                    quantity: item.quantity,
                })),
            });
            navigate('/orders');
        } catch (err) {
            console.error('Failed to create order:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow mb-4"
                            >
                                <img
                                    src={`http://localhost:4000/${item.food.image}`}
                                    alt={item.food.name}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {item.food.name}
                                    </h3>
                                    <p className="text-gray-600">${item.food.price.toFixed(2)}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="text-gray-500 hover:text-primary"
                                        >
                                            -
                                        </button>
                                        <span className="text-gray-900">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="text-gray-500 hover:text-primary"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="text-red-500 hover:text-red-700 ml-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-gray-900">
                                        ${(item.food.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow h-fit">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax (10%)</span>
                                <span className="text-gray-900">
                                    ${(calculateTotal() * 0.1).toFixed(2)}
                                </span>
                            </div>
                            <div className="border-t border-gray-200 pt-2">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold text-gray-900">
                                        Total
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">
                                        ${(calculateTotal() * 1.1).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-primary text-white py-3 rounded-md mt-6 hover:bg-primary-dark transition-colors duration-200"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart; 