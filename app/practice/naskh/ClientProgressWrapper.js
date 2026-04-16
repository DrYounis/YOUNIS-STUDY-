'use client';
import { useEffect, useState } from 'react';
import ProgressTracker from '../../../components/naskh/ProgressTracker';

export default function ClientProgressWrapper({ totalLessons }) {
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('naskh_completed_lessons');
            if (saved) {
                setCompletedLessons(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to load progress', e);
        }
    }, []);

    return <ProgressTracker totalLessons={totalLessons} completedLessons={completedLessons} />;
}
