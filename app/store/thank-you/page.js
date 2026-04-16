'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

// Import Arabic font
if (typeof document !== 'undefined' && !document.querySelector('[data-arabic-font]')) {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    link.setAttribute('data-arabic-font', 'true');
    document.head.appendChild(link);
}

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div style={styles.page} dir="rtl">
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.icon}>🎉</div>
                    <h1 style={styles.title}>شكراً لك!</h1>
                    <p style={styles.subtitle}>تم تقديم طلبك بنجاح!</p>

                    {orderId && (
                        <div style={styles.orderIdBox}>
                            <p style={styles.orderIdLabel}>رقم الطلب</p>
                            <p style={styles.orderIdValue}>{orderId}</p>
                        </div>
                    )}

                    <div style={styles.infoCard}>
                        <h3 style={styles.infoTitle}>ماذا سيحدث بعد ذلك؟</h3>
                        <ul style={styles.infoList}>
                            <li style={styles.infoItem}>
                                <span style={styles.infoIcon}>📧</span>
                                <span>سنتواصل معك عبر البريد الإلكتروني/الجوال لتأكيد طلبك.</span>
                            </li>
                            <li style={styles.infoItem}>
                                <span style={styles.infoIcon}>🧩</span>
                                <span>سيتم طباعة البازل المخصصة بصورتك.</span>
                            </li>
                            <li style={styles.infoItem}>
                                <span style={styles.infoIcon}>🚚</span>
                                <span>سيتم ترتيب التوصيل حسب طريقتك المفضلة.</span>
                            </li>
                            <li style={styles.infoItem}>
                                <span style={styles.infoIcon}>💳</span>
                                <span>
                                    إذا اخترت <strong>تحويل بنكي</strong>، يرجى إتمام التحويل
                                    وسنؤكد الدفع يدوياً.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div style={styles.buttonRow}>
                        <Link href="/" style={styles.btnSecondary}>
                            رجوع للرئيسية ←
                        </Link>
                        <Link href="/store" style={styles.btnPrimary}>
                            اطلب بازل أخرى 🧩
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cairo', 'Inter', 'Segoe UI', sans-serif",
    },
    container: {
        maxWidth: '600px',
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '3rem 2rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        textAlign: 'center',
    },
    icon: {
        fontSize: '5rem',
        marginBottom: '1rem',
    },
    title: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '2rem',
    },
    orderIdBox: {
        backgroundColor: '#F5F5F5',
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem',
    },
    orderIdLabel: {
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '0.5rem',
    },
    orderIdValue: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#FF6B6B',
        fontFamily: 'monospace',
        wordBreak: 'break-all',
    },
    infoCard: {
        backgroundColor: '#E8F5E9',
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem',
        textAlign: 'left',
    },
    infoTitle: {
        fontSize: '1.2rem',
        color: '#333',
        marginBottom: '1rem',
    },
    infoList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.75rem 0',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        fontSize: '1rem',
        color: '#555',
    },
    infoIcon: {
        fontSize: '1.5rem',
        flexShrink: 0,
    },
    buttonRow: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
    },
    btnPrimary: {
        padding: '1rem 2rem',
        backgroundColor: '#FF6B6B',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
    },
    btnSecondary: {
        padding: '1rem 2rem',
        backgroundColor: '#f5f5f5',
        color: '#666',
        border: '2px solid #ddd',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
    },
};

// Loading fallback
function ThankYouLoading() {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.card}>
                    <p>Loading...</p>
                </div>
            </div>
        </div>
    );
}

// Default export with Suspense boundary
export default function ThankYouPage() {
    return (
        <Suspense fallback={<ThankYouLoading />}>
            <ThankYouContent />
        </Suspense>
    );
}
