import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/customer/Register';
import Menu from './pages/customer/Menu';
import Cart from './pages/customer/Cart';
import Orders from './pages/customer/Orders';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/system_admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import ROLES from './config/roles';
import CateringDashboard from './pages/catering_manager/CateringDashboard';
import customer_logged_in_home from './pages/customer/Home';
// import ChefDashboard from './pages/executing_chef/ChefDashboard';
import ChefDashboard from './pages/excuting_chef/ChefDashboard';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/menu" element={<Menu />} />


                            {/* Catering manager route */}
                            <Route
                                path="/catering-dashboard"
                                element={
                                    <PrivateRoute>
                                        <CateringDashboard />
                                    </PrivateRoute>
                                }
                            />
                            {/* system admin route */}
                            <Route
                                path="/admin-dashboard"
                                element={
                                    <PrivateRoute>
                                        <AdminDashboard />
                                    </PrivateRoute>
                                }
                            />
                            {/* Executing Chef route */}
                            <Route
                                path="/chef-dashboard"
                                element={
                                    <PrivateRoute>
                                        <ChefDashboard />
                                    </PrivateRoute>
                                }
                            />
                            {/* Customer route */}
                            <Route
                                path="/customer"
                                element={
                                    <PrivateRoute>
                                        <customer_logged_in_home />
                                    </PrivateRoute>
                                }
                            />
                            {/* Protected Routes */}
                            <Route
                                path="/cart"
                                element={
                                    <PrivateRoute>
                                        <Cart />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <PrivateRoute>
                                        <Orders />
                                    </PrivateRoute>
                                }
                            />

                            {/* Role-based Dashboard Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />

                            {/* Admin Routes */}
                            <Route
                                path="/admin/*"
                                element={
                                    <AdminRoute allowedRoles={[ROLES.SYSTEM_ADMIN]}>
                                        <AdminDashboard />
                                    </AdminRoute>
                                }
                            />

                            {/* Catch all route */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App; 