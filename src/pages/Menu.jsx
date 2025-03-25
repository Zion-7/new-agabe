import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [foodsResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://localhost:4000/api/food'),
                    axios.get('http://localhost:4000/api/category'),
                ]);
                setFoods(foodsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (err) {
                setError('Failed to fetch menu items');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredFoods = selectedCategory === 'all'
        ? foods
        : foods.filter(food => food.category === selectedCategory);

    const addToCart = async (foodId) => {
        if (!user) {
            // Handle not logged in state
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/cart/add', {
                foodId,
                quantity: 1,
            });
            // Show success message or update cart count
        } catch (err) {
            console.error('Failed to add to cart:', err);
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
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Our Menu</h1>

            {/* Category Filter */}
            <div className="mb-8">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'all'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => setSelectedCategory(category._id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category._id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFoods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="relative h-48">
                            <img
                                src={`http://localhost:4000/${food.image}`}
                                alt={food.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
                            <p className="mt-1 text-sm text-gray-600">{food.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-primary">
                                    ${food.price.toFixed(2)}
                                </span>
                                {user && (
                                    <button
                                        onClick={() => addToCart(food._id)}
                                        className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFoods.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No items found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Menu; 