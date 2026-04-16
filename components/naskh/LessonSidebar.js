'use client';
import Link from 'next/link';

export default function LessonSidebar({ lessons, currentLessonId, completedLessons }) {
    return (
        <div style={{
            background: '#ffffff',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e0e0e0',
            maxHeight: '600px',
            overflowY: 'auto'
        }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem', fontWeight: 'bold' }}>
                الحروف المفردة
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '0.5rem' }}>
                {lessons.map(lesson => {
                    const isCurrent = lesson.id === parseInt(currentLessonId);
                    const isCompleted = completedLessons.includes(lesson.id);
                    
                    return (
                        <Link 
                            key={lesson.id} 
                            href={`/practice/naskh/${lesson.id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '50px',
                                borderRadius: '0.5rem',
                                background: isCurrent ? '#007AFF' : (isCompleted ? '#E8F5E9' : '#f5f5f5'),
                                color: isCurrent ? '#ffffff' : (isCompleted ? '#2E7D32' : '#333333'),
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                transition: 'all 0.2s',
                                border: isCurrent ? '2px solid #0056b3' : '1px solid transparent'
                            }}
                        >
                            {lesson.letter}
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
