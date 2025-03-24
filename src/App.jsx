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
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import ROLES from './config/roles';
import CateringDashboard from './pages/catering_manager/CateringDashboard';
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