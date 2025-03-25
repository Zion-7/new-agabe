import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ROLES from '../config/roles';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [ordersResponse, statsResponse] = await Promise.all([
                axios.get('http://localhost:4000/api/order/recent'),
                axios.get('http://localhost:4000/api/stats'),
            ]);
            setRecentOrders(ordersResponse.data);
            setStats(statsResponse.data);
        } catch (err) {
            setError('Failed to fetch dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const renderDashboardContent = () => {
        switch (user.role) {
            case ROLES.CATERING_MANAGER:
                return (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900">Catering Manager Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Orders Overview</h2>
                                <p className="text-gray-600">View and manage all orders</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu Management</h2>
                                <p className="text-gray-600">Update menu items and prices</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Staff Management</h2>
                                <p className="text-gray-600">Manage staff assignments</p>
                            </div>
                        </div>
                    </div>
                );
            case ROLES.EXECUTIVE_CHEF:
                return (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900">Executive Chef Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Kitchen Orders</h2>
                                <p className="text-gray-600">View and manage kitchen orders</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipe Management</h2>
                                <p className="text-gray-600">Update recipes and ingredients</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory</h2>
                                <p className="text-gray-600">Check and manage inventory</p>
                            </div>
                        </div>
                    </div>
                );
            case ROLES.CUSTOMER:
                return (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">My Orders</h2>
                                <p className="text-gray-600">View your order history</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h2>
                                <p className="text-gray-600">Update your profile information</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Favorites</h2>
                                <p className="text-gray-600">View your favorite menu items</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
                        <p className="text-gray-600">You don't have permission to access this dashboard.</p>
                    </div>
                );
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
        <div className="container mx-auto px-4">
            {renderDashboardContent()}
        </div>
    );
};

export default Dashboard; 