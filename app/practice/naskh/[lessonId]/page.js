'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { naskhLessons } from '../../../../lib/naskhLessons';
import TracingPad from '../../../../components/naskh/TracingPad';
import LessonSidebar from '../../../../components/naskh/LessonSidebar';
import Controls from '../../../../components/naskh/Controls';

export default function NaskhLessonPage({ params }) {
    const lessonId = parseInt(params.lessonId);
    const lessonIndex = naskhLessons.findIndex(l => l.id === lessonId);
    const lesson = naskhLessons[lessonIndex];
    
    const previousLesson = lessonIndex > 0 ? naskhLessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < naskhLessons.length - 1 ? naskhLessons[lessonIndex + 1] : null;

    const canvasRef = useRef(null);
    const [showGuide, setShowGuide] = useState(true);
    const [completedLessons, setCompletedLessons] = useState([]);
    
    // Load local storage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('naskh_completed_lessons');
            if (saved) {
                setCompletedLessons(JSON.parse(saved));
            }
            
            // Also attempt to load saved strokes for this specific letter
            const savedStrokes = localStorage.getItem(`naskh_strokes_${lessonId}`);
            if (savedStrokes && canvasRef.current) {
                canvasRef.current.setStrokes(JSON.parse(savedStrokes));
            }
        } catch (e) {
            console.error('Failed to load local state', e);
        }
    }, [lessonId]);

    const saveStrokes = () => {
        if (!canvasRef.current) return;
        const strokes = canvasRef.current.getStrokes();
        localStorage.setItem(`naskh_strokes_${lessonId}`, JSON.stringify(strokes));
    }

    const handleClear = () => canvasRef.current && canvasRef.current.clear();
    const handleUndo = () => canvasRef.current && canvasRef.current.undo();
    const handleToggleCompare = () => setShowGuide(!showGuide);

    const toggleMarkComplete = () => {
        let updated;
        if (completedLessons.includes(lessonId)) {
            updated = completedLessons.filter(id => id !== lessonId);
        } else {
            updated = [...completedLessons, lessonId];
        }
        setCompletedLessons(updated);
        localStorage.setItem('naskh_completed_lessons', JSON.stringify(updated));
    };

    if (!lesson) return <div style={{ direction: 'rtl', padding: '2rem' }}>الدرس غير موجود (Lesson not found)</div>;

    const isCompleted = completedLessons.includes(lessonId);

    return (
        <div className="container" style={{ direction: 'rtl', padding: '2rem 0', minHeight: '100vh' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    حرف: {lesson.name}
                </h1>
                <Link href="/practice/naskh" style={{ textDecoration: 'none', color: '#007AFF', fontWeight: 'bold', border: '1px solid #007AFF', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                    العودة للقائمة (Back to list)
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem' }}>
                
                {/* Sidebar Navigation */}
                <div style={{ order: 2 }}> 
                    <LessonSidebar 
                        lessons={naskhLessons} 
                        currentLessonId={lessonId}
                        completedLessons={completedLessons}
                    />
                </div>

                {/* Main Canvas Area */}
                <div style={{ order: 1 }}>
                    <div style={{ marginBottom: '1rem', background: '#e3f2fd', padding: '1rem', borderRadius: '0.5rem', color: '#0d47a1', border: '1px solid #bbdefb' }}>
                        💡 <b>تلميح:</b> تتبع مسار الحرف الشفاف بدقة. يمكنك استخدام مسكة قلم الآيباد للحصول على خطوط متغيرة السماكة كما في الخط العربي الحقيقي.
                    </div>

                    <TracingPad 
                        ref={canvasRef}
                        lesson={lesson}
                        showGuide={showGuide}
                        onDraw={saveStrokes}
                    />

                    <Controls 
                        onClear={handleClear}
                        onUndo={handleUndo}
                        onToggleCompare={handleToggleCompare}
                        showGuide={showGuide}
                        previousLesson={previousLesson}
                        nextLesson={nextLesson}
                        onMarkComplete={toggleMarkComplete}
                        isCompleted={isCompleted}
                    />
                </div>

            </div>
            
            {/* Simple CSS block for the grid responsiveness */}
            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="order: 2"] {
                        order: 1 !important;
                    }
                    div[style*="order: 1"] {
                        order: 2 !important;
                    }
                }
            `}</style>
        </div>
    );
}
