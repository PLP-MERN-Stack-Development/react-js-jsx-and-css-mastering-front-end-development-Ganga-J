import React, { useState } from "react";


const Header = ({ title = "Voter Dashboard", onLogout = () => { } }) => {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(v => !v);
    const handleLogout = () => { setOpen(false); onLogout(); };

    const handleNavClick = (e, path) => {
        e.preventDefault(); // Prevent default anchor tag behavior (full page reload)
        setOpen(false);
        // In a real application without React Router, you might call a function here
        // to handle the route change, e.g., history.push(path) or a state update.
        console.log(`Navigating to: ${path}`);
    };

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

                <div className="flex items-center">

                    {/* Hamburger Button for Mobile Menu */}
                    <button
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2 sm:hidden" // Added mr-2 and sm:hidden to only show on mobile
                        onClick={toggleMenu}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <a
                        href="/" 
                        className="flex items-center cursor-pointer"
                        onClick={(e) => handleNavClick(e, '/')}
                    >
                        <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M7 12.5l2.5 2.5L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-tight text-gray-900">{title}</span>
                    </a>
                </div>

                {/* Main Navigation Links */}
                <nav
                    className={`absolute sm:static top-16 left-0 right-0 bg-white border-b sm:border-b-0 shadow-md sm:shadow-none p-4 sm:p-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 transition-transform duration-300 ${open ? "block" : "hidden sm:flex"}`}
                    aria-label="Main navigation"
                >
                
                    <a
                        href="/"
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                        onClick={(e) => handleNavClick(e, '/')}
                    >
                        Dashboard
                    </a>

                    <a
                        href="/candidates"
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                        onClick={(e) => handleNavClick(e, '/candidates')}
                    >
                        Candidates
                    </a>

                    {/* Logout Button (remains a button) */}
                    <button className="text-gray-700 hover:text-red-600 font-medium text-left sm:text-right" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;