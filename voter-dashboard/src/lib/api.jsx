const API = import.meta.env.VITE_API_URL

// --- READ (Fetching all voters) ---
export async function fetchVoters() {
    // Corrected to use /voters endpoint
    const res = await fetch(`${API}/voters`);

    if (!res.ok) {
        const errorDetail = await res.text();
        throw new Error(`Failed to fetch voters (Status: ${res.status}): ${errorDetail}`);
    }

    return res.json();
}

// --- CREATE (Adding a new voter) ---
export async function createVoter(voterData) {
    // Corrected to use /voters endpoint
    const res = await fetch(`${API}/voters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(voterData),
    });

    if (!res.ok) {
        const errorDetail = await res.text();
        throw new Error(`Failed to create voter (Status: ${res.status}): ${errorDetail}`);
    }

    return res.json();
}

// --- UPDATE (Editing an existing voter) ---
export async function updateVoter(id, voterData) {
    // Corrected to use /voters endpoint and ID for specific resource
    const res = await fetch(`${API}/voters/${id}`, {
        method: 'PUT', // or 'PATCH'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(voterData),
    });

    if (!res.ok) {
        const errorDetail = await res.text();
        throw new Error(`Failed to update voter (Status: ${res.status}): ${errorDetail}`);
    }

    return res.json();
}

// --- DELETE (Removing a voter) ---
export async function deleteVoter(id) {
    // Corrected to use /voters endpoint and ID for specific resource
    const res = await fetch(`${API}/voters/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const errorDetail = await res.text();
        throw new Error(`Failed to delete voter (Status: ${res.status}): ${errorDetail}`);
    }

    return { success: true, id };
}
