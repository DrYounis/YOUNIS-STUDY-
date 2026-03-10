'use client';

import { useState, useEffect } from 'react';

export default function Friends() {
    const [notes, setNotes] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [useSupabase, setUseSupabase] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        // Try Supabase first
        try {
            const { createClient } = await import('@supabase/supabase-js');
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL || '',
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
            );
            
            const { data, error } = await supabase
                .from('friends_notes')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && !error) {
                setNotes(data);
                setUseSupabase(true);
                return;
            }
        } catch (err) {
            console.log('Supabase not available, using localStorage');
        }

        // Fallback to localStorage
        const savedNotes = JSON.parse(localStorage.getItem('friendsNotes') || '[]');
        setNotes(savedNotes);
        setUseSupabase(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message) return;

        setLoading(true);

        // Try Supabase first
        if (useSupabase) {
            try {
                const { createClient } = await import('@supabase/supabase-js');
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
                );
                
                const { error } = await supabase
                    .from('friends_notes')
                    .insert([{ author_name: name, message }]);

                if (!error) {
                    setName('');
                    setMessage('');
                    fetchNotes();
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.log('Supabase error, switching to localStorage');
                setUseSupabase(false);
            }
        }

        // Fallback to localStorage
        const savedNotes = JSON.parse(localStorage.getItem('friendsNotes') || '[]');
        const newNote = {
            id: Date.now().toString(),
            author_name: name,
            message,
            created_at: new Date().toISOString(),
        };
        savedNotes.unshift(newNote);
        localStorage.setItem('friendsNotes', JSON.stringify(savedNotes));
        
        setName('');
        setMessage('');
        fetchNotes();
        setLoading(false);
    };

    const styles = {
        container: {
            padding: '4rem 0',
            maxWidth: '800px',
            margin: '0 auto',
        },
        header: {
            textAlign: 'center',
            marginBottom: '4rem',
        },
        form: {
            background: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '4rem',
            border: '1px solid rgba(255,255,255,0.05)',
        },
        input: {
            width: '100%',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: 'white',
            fontFamily: 'inherit',
        },
        note: {
            background: 'var(--color-surface)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            borderLeft: '4px solid var(--color-accent)',
        },
        author: {
            color: 'var(--color-primary)',
            fontWeight: '600',
            marginBottom: '0.5rem',
            display: 'block',
        }
    };

    return (
        <div className="container" style={styles.container}>
            <div style={styles.header}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Friends of Younis</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Leave a message to make my day brighter!</p>
                <div style={{ marginTop: '2rem' }}>
                    <a
                        href="/friends/quiz"
                        className="btn btn-secondary"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.2rem',
                            padding: '1rem 2rem',
                        }}
                    >
                        🎯 Take the Fun Quiz!
                    </a>
                    <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        Discover what fun activities are perfect for your day!
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Write a Message</h2>
                <input
                    type="text"
                    placeholder="Your Name (e.g. Best Friend)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                />
                <textarea
                    placeholder="Your message for Younis..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ ...styles.input, minHeight: '100px' }}
                    required
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Message'}
                </button>
                {!useSupabase && (
                    <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                        💾 Messages are saved locally in your browser
                    </p>
                )}
            </form>

            <div>
                <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Recent Notes</h2>
                {notes.length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)' }}>No notes yet. Be the first!</p>
                ) : (
                    notes.map((note) => {
                        // Randomize animation properties for organic feel
                        const randomDelay = Math.random() * 5; // 0-5s delay
                        const randomDuration = 5 + Math.random() * 4; // 5-9s duration
                        const randomRotation = (Math.random() - 0.5) * 2; // -1 to 1 degree tilt

                        return (
                            <div
                                key={note.id}
                                style={{
                                    ...styles.note,
                                    animationDelay: `${randomDelay}s`,
                                    animationDuration: `${randomDuration}s`,
                                    '--rot': `${randomRotation}deg`
                                }}
                                className="cloud-note"
                            >
                                <span style={styles.author}>{note.author_name} wrote:</span>
                                <p>{note.message}</p>
                                <small style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', display: 'block' }}>
                                    {new Date(note.created_at).toLocaleDateString()}
                                </small>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
