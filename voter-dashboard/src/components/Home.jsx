import React, { useState, useEffect } from "react";
import VoterCard from "./VoterCard";
import VoterForm from "./VoterForm";
import { fetchVoters, createVoter, updateVoter, deleteVoter } from "../lib/api";

export default function Home() {
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadVoters = async () => {
            setError(""); // Clear previous errors
            try {
                setLoading(true);
                const data = await fetchVoters();
                setVoters(data);
            } catch (e) {
                // Task 4: Implement loading and error states
                setError(`Failed to fetch voters: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        loadVoters();
    }, []); 
    // --- CRUD Handlers (Task 3: State Management) ---

    // 3. handleAdd: 
    async function handleAdd(newVoter) {
        try {
            const created = await createVoter(newVoter);
            setVoters(prev => [created, ...prev]);
        } catch (e) {
            setError(`Failed to add voter: ${e.message}`);
        }
    }

    // handleEdit: 
    async function handleEdit(voterToUpdate) {
        try {
            const updated = await updateVoter(voterToUpdate._id, voterToUpdate);
            // Check if the IDs match to replace the old voter with the new one
            setVoters(prev => prev.map(v => (v._id === voterToUpdate._id ? updated : v)));
        } catch (e) {
            setError(`Failed to update voter: ${e.message}`);
        }
    }

    // 4. handleDelete: Corrected filter logic
    async function handleDelete(idToDelete) {
        try {
            await deleteVoter(idToDelete);
            // Correct filter logic: keep voters whose _id does NOT match the idToDelete
            setVoters(prev => prev.filter(voter => voter._id !== idToDelete));
        } catch (e) {
            setError(`Failed to delete voter: ${e.message}`);
        }
    }

    // --- JSX Return (Task 2 & 4) ---
    return (
        <main className="container mx-auto p-4">
            {/* <h1 className="text-3xl font-bold mb-6 text-gray-800">Voter Management Dashboard</h1> */}
            <VoterForm onSubmit={handleAdd} />

            {/* Display Loading/Error States */}
            {loading && <p className="text-center py-8 text-indigo-600 font-semibold">
                Loading voter data...
            </p>}
            {error && <p className="text-center py-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                **Error:** {error}
            </p>}

            {/* Display Voter List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {voters.map(voter =>
                    <VoterCard
                        key={voter._id}
                        voter={voter}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* Display message if no voters and not loading/errored */}
            {!loading && !error && voters.length === 0 && (
                <p className="text-center py-12 text-gray-500">No voters found. Add one above!</p>
            )}
        </main>
    );
}