import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const categories = [
        {
            id: 1,
            name: 'Wedding Catering',
            description: 'Elegant catering services for your special day',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 2,
            name: 'Corporate Events',
            description: 'Professional catering for business gatherings',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 3,
            name: 'Special Occasions',
            description: 'Customized catering for any celebration',
            image: 'https://images.unsplash.com/photo-1511795409834-432f31147b22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Catering hero"
                    />
                    <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Delicious Catering for Every Occasion
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        Experience exceptional catering services with our professional team. From weddings to corporate events, we bring your vision to life with delicious food and impeccable service.
                    </p>
                    <div className="mt-10">
                        <Link
                            to="/menu"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                        >
                            View Our Menu
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                    Our Catering Services
                </h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-64">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {category.name}
                                </h3>
                                <p className="mt-2 text-gray-600">{category.description}</p>
                                <Link
                                    to="/menu"
                                    className="mt-4 inline-flex items-center text-primary hover:text-primary-dark"
                                >
                                    Learn more
                                    <svg
                                        className="ml-2 w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to get started?</span>
                        <span className="block text-white">Book your catering service today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home; 