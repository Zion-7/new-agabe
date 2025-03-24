import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';
import ROLES from '../config/roles';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await api.get('/api/auth/me');
                setUser(response.data);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            console.log('Attempting login with:', credentials.email);
            const response = await api.post('/api/auth/login', credentials);
            console.log('Login response:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data);
                return response.data;
            } else {
                throw new Error('No token received from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            console.log('Attempting registration with:', userData.email);
            const response = await api.post('/api/auth/register', userData);
            console.log('Registration response:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data);
                return response.data;
            } else {
                throw new Error('No token received from server');
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../config/api';
// import ROLES from '../config/roles';

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [roles, setRoles] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         checkAuth();
//     }, []);

//     const checkAuth = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 const response = await api.get('/api/auth/me');
//                 setUser(response.data);
//                 setRoles(response.data.roles || []);
//                 redirectUser(response.data.roles || []);
//             }
//         } catch (error) {
//             console.error('Auth check failed:', error);
//             localStorage.removeItem('token');
//             setUser(null);
//             setRoles([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const login = async (credentials) => {
//         try {
//             console.log('Attempting login with:', credentials.email);
//             const response = await api.post('/api/auth/login', credentials);
//             console.log('Login response:', response.data);

//             if (response.data.token) {
//                 localStorage.setItem('token', response.data.token);
//                 setUser(response.data);
//                 setRoles(response.data.roles || []);
//                 redirectUser(response.data.roles || []);
//                 return response.data;
//             } else {
//                 throw new Error('No token received from server');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             throw error;
//         }
//     };

//     const register = async (userData) => {
//         try {
//             console.log('Attempting registration with:', userData.email);
//             const response = await api.post('/api/auth/register', userData);
//             console.log('Registration response:', response.data);

//             if (response.data.token) {
//                 localStorage.setItem('token', response.data.token);
//                 setUser(response.data);
//                 setRoles(response.data.roles || []);
//                 redirectUser(response.data.roles || []);
//                 return response.data;
//             } else {
//                 throw new Error('No token received from server');
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//             throw error;
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         setRoles([]);
//         window.location.href = '/login';
//     };

//     const hasRole = (role) => roles.includes(role);

//     const redirectUser = (roles) => {
//         if (roles.includes('System Admin')) {
//             window.location.href = '/admin-dashboard';
//         } else if (roles.includes('Executive Chef')) {
//             window.location.href = '/chef-dashboard';
//         } else if (roles.includes('Catering Manager')) {
//             window.location.href = '/catering-dashboard';
//         } else {
//             window.location.href = '/customer-dashboard';
//         }
//     };

//     const value = {
//         user,
//         roles,
//         loading,
//         login,
//         register,
//         logout,
//         checkAuth,
//         hasRole,
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
