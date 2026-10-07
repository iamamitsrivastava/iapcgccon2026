'use client';
import React, { useState, useEffect } from 'react';

export default function SubmissionBanner() {
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        // Deadline: 7 October 2026 at 11:59 PM
        const deadline = new Date(2026, 9, 7, 23, 59, 59).getTime();
        if (Date.now() > deadline) {
            setIsClosed(true);
        }
    }, []);

    if (!isClosed) return null;

    return (
        <div style={{
            background: '#ef4444',
            color: 'white',
            textAlign: 'center',
            padding: '12px 20px',
            fontWeight: 'bold',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: 999999,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            fontSize: '1rem'
        }}>
            Abstract Submission is now closed. No more submissions are allowed.
        </div>
    );
}
