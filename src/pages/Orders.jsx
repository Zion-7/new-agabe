import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/order');
            setOrders(response.data);
        } catch (err) {
            setError('Failed to fetch orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'preparing':
                return 'bg-purple-100 text-purple-800';
            case 'ready':
                return 'bg-green-100 text-green-800';
            case 'delivered':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Order History</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No orders found</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-lg shadow overflow-hidden"
                        >
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Order #{order._id.slice(-6).toUpperCase()}
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>
                            </div>
                            <div className="border-t border-gray-200">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={`http://localhost:4000/${item.food.image}`}
                                                        alt={item.food.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900">
                                                            {item.food.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    ${(item.food.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:px-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        Total Amount: ${order.totalAmount.toFixed(2)}
                                    </div>
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => {
                                                // Handle order cancellation
                                            }}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders; 