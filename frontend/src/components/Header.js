import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import logo from '../assets/logo-ss.png'; // Adjust the path to your logo

function Header({ token, handleLogout, searchQuery, setSearchQuery, handleSearch, showAuthLinks }) {
    return (
        <header className="p-4 bg-white">
            <div className="container flex items-center justify-between mx-auto">
                {/* Logo Section */}
                <div className="text-xl font-bold">
                    <Link to="/" className="flex items-center text-gray-800">
                        <img src={logo} alt="Forum Logo" className="h-16 mr-2" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">Course Content</Link>
                    <Link to="/blog" className="text-gray-700 hover:text-blue-500">Forum</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-blue-500">Cart</Link>
                </nav>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="p-2 text-white hover:bg-[#8e9afa] bg-[#8b7ae6] rounded-r-md focus:outline-none">
                        <FaSearch />
                    </button>
                </form>

                {/* Authentication Links */}
                <nav className="flex items-center space-x-4">
                    {token ? (
                        <>
                            <span className="mr-4 text-gray-700">
                                Welcome, Admin
                                {" | "}
                                <Link to="/report" className="text-blue-500 hover:underline">Report</Link>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-red-500 hover:text-red-700 focus:outline-none"
                            >
                                <FaSignOutAlt className="mr-1" />
                                Logout
                            </button>
                        </>
                    ) : (
                        showAuthLinks && (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <FaSignInAlt className="mr-1" />
                                    Login
                                </Link>
                                <Link to="/register" className="flex items-center text-gray-700 hover:text-blue-500">
                                    <FaUserPlus className="mr-1" />
                                    Register
                                </Link>
                            </div>
                        )
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;