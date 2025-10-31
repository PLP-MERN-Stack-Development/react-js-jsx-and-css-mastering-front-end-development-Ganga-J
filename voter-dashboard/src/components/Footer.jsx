import React from 'react';

export default function Footer() {
    // Define links for easy maintenance
    const footerLinks = [
        { name: 'Dashboard', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
    ];

    return (
        // Task 5: Use Tailwind classes for fixed height, sticky bottom, and theme support
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 mt-12 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Links Section */}
                <div className="flex justify-center space-x-6 mb-4">
                    {footerLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Copyright Section (Task 2 Requirement) */}
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        &copy; {new Date().getFullYear()} Voter Dashboard. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                        Built with React.js, JSX, and Tailwind CSS.
                    </p>
                </div>

            </div>
        </footer>
    );
}