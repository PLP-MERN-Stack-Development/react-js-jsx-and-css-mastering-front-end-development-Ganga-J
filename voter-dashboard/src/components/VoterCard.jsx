import React from 'react';
export default function VoterCard({ voter, onEdit, onDelete }) {
    // Basic validation to ensure a voter object is passed
    if (!voter) {
        return <div className="p-4 text-red-600">Voter data is missing.</div>;
    }

    return (
        // Task 2 & 5: Implementing Card component and Tailwind styling
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition duration-300 hover:shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {voter.name || 'Unknown Voter'}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
                ID: <span className="font-mono text-indigo-600">{voter.id || 'N/A'}</span>
            </p>

            <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Age:</strong> {voter.age}</p>
                {/* Assuming a status exists, e.g., 'Registered', 'Pending' */}
                <p><strong>Status:</strong>
                    <span className={`font-medium ml-1 ${voter.isRegistered ? 'text-green-600' : 'text-yellow-600'}`}>
                        {voter.isRegistered ? 'Registered' : 'Not Registered'}
                    </span>
                </p>
            </div>

            {/* Task 2: Using the Button component concept for actions */}
            <div className="mt-5 flex justify-end space-x-3">
                <button
                    onClick={() => onEdit(voter)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(voter.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}