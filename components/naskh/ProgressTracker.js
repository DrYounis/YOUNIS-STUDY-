'use client';
import { useEffect, useState } from 'react';

export default function ProgressTracker({ totalLessons, completedLessons }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const percentage = Math.round((completedLessons.length / totalLessons) * 100) || 0;

    return (
        <div style={{
            background: '#ffffff',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e0e0e0',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>تقدمك في التدريب (Your Progress)</span>
                <span style={{ fontWeight: 'bold', color: '#007AFF' }}>{percentage}%</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: '#f0f0f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ 
                    width: `${percentage}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                    transition: 'width 0.5s ease-out'
                }} />
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                لقد أنجزت {completedLessons.length} من أصل {totalLessons} حرفاً
            </p>
        </div>
    );
}
