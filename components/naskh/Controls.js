'use client';
import Link from 'next/link';

export default function Controls({ onClear, onUndo, onToggleCompare, showGuide, previousLesson, nextLesson, onMarkComplete, isCompleted }) {
    const btnStyle = {
        padding: '0.8rem 1.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                    onClick={onUndo}
                    style={{ ...btnStyle, background: '#f0f0f0', color: '#333' }}
                >
                    تراجع (Undo)
                </button>
                <button 
                    onClick={onClear}
                    style={{ ...btnStyle, background: '#ffebee', color: '#c62828' }}
                >
                    مسح (Clear)
                </button>
                <button 
                    onClick={onToggleCompare}
                    style={{ ...btnStyle, background: showGuide ? '#e3f2fd' : '#ffffff', color: '#1565c0', border: '1px solid #1565c0' }}
                >
                    {showGuide ? 'إخفاء المثال (Hide)' : 'قارن (Compare)'}
                </button>
                <button 
                    onClick={onMarkComplete}
                    style={{ ...btnStyle, background: isCompleted ? '#4CAF50' : '#E0E0E0', color: isCompleted ? 'white' : '#333' }}
                >
                    {isCompleted ? '✓ مكتمل (Completed)' : 'تحديد كمكتمل (Mark Done)'}
                </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                {previousLesson ? (
                    <Link href={`/practice/naskh/${previousLesson.id}`} style={{ ...btnStyle, background: '#007AFF', color: 'white' }}>
                        الدرس السابق
                    </Link>
                ) : <div />}
                
                {nextLesson ? (
                    <Link href={`/practice/naskh/${nextLesson.id}`} style={{ ...btnStyle, background: '#007AFF', color: 'white' }}>
                        الدرس التالي
                    </Link>
                ) : <div />}
            </div>
        </div>
    );
}
