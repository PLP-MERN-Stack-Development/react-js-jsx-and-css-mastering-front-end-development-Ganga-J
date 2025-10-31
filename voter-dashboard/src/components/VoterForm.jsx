import React, { useState, useEffect } from "react";

// Accept initialVoter (for editing) and onSubmit (handleAdd/handleEdit) as props.
export default function VoterForm({ initialVoter, onSubmit }) {
    // 1. Initialize state based on props (for edit mode) or default values (for add mode)
    const [form, setForm] = useState({
        name: "",
        address: "",
        age: "",
        voterID: "",
        // Include _id if present for editing
        ...(initialVoter || {}),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // 2. Use useEffect to synchronize form state if initialVoter changes (e.g., when clicking 'Edit' in the parent)
    useEffect(() => {
        if (initialVoter) {
            setForm(initialVoter);
        } else {
            // Reset for Add mode
            setForm({ name: "", address: "", age: "", voterID: "" });
        }
    }, [initialVoter]);

    // Handler to update state for all inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Clear status message on input change
        setStatusMessage({ type: '', text: '' });
        setForm(prevForm => ({
            ...prevForm,
            [name]: value // Use the input's 'name' attribute as the key
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!onSubmit) {
            console.error("VoterForm: onSubmit handler is missing.");
            setStatusMessage({ type: 'error', text: 'Form handler not set.' });
            return;
        }

        setIsSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        // Prepare submission data
        const submissionData = {
            ...form,
            age: parseInt(form.age, 10),
            // Default fields needed by the model, if not present
            isRegistered: form.isRegistered ?? true,
        };

        try {
            // Call the handler passed from Home (handleAdd or handleEdit)
            await onSubmit(submissionData);

            // Success feedback
            setStatusMessage({
                type: 'success',
                text: `${initialVoter ? 'Voter updated' : 'Voter added'} successfully!`
            });

            // Reset only if adding a new voter
            if (!initialVoter) {
                setForm({ name: "", address: "", age: "", voterID: "" });
            }

        } catch (error) {
            // Task 4: Error handling for API submission
            setStatusMessage({
                type: 'error',
                text: `Submission failed: ${error.message}`
            });
            console.error("Form Submission Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEditMode = !!initialVoter;
    const buttonText = isEditMode ? (isSubmitting ? "Updating..." : "Save Changes") : (isSubmitting ? "Adding..." : "Add Voter");
    const title = isEditMode ? "Edit Voter Details" : "Voter Registration";

    // Dynamic classes for status messages
    const statusClasses = {
        success: "bg-green-100 border-green-400 text-green-700",
        error: "bg-red-100 border-red-400 text-red-700",
    };


    return (
        <div className="max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-800 dark:text-gray-100 transition-colors duration-200">
                {title}
            </h2>
            <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 space-y-4 shadow-lg transition-colors duration-200">

                {/* Status Message Box */}
                {statusMessage.text && (
                    <div className={`p-3 rounded-lg border font-medium ${statusClasses[statusMessage.type]}`}>
                        {statusMessage.text}
                    </div>
                )}

                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Address Input */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Residential Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Residential Address"
                        required
                        className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Age Input */}
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                        min="18" // Assuming minimum voting age
                        className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Voter ID Input */}
                <div>
                    <label htmlFor="voterID" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unique Voter ID</label>
                    <input
                        id="voterID"
                        name="voterID"
                        type="text"
                        value={form.voterID}
                        onChange={handleChange}
                        placeholder="Unique Voter ID"
                        required
                        className="mt-1 border rounded-lg px-3 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Submission Button (Task 2: Button Component Styling) */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white rounded-lg px-4 py-3 font-semibold transition duration-150 ${isSubmitting
                            ? 'bg-indigo-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    {buttonText}
                </button>
            </form>
        </div>
    );
}
