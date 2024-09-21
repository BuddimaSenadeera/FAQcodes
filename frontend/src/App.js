import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Login from './components/Login';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Logic handled in HomePage
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header
                    token={token}
                    handleLogout={handleLogout}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    showAuthLinks={false} // Hide Login and Register links on HomePage
                />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/login" element={<Login setToken={setToken} />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
