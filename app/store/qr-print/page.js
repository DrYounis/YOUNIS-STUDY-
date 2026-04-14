'use client';

import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const STORE_URL = 'https://younis.world/store';
const QR_COUNT = 12; // 4x3 grid

export default function QRCodePrintPage() {
    const printRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={styles.page}>
            {/* Print Button - Hidden when printing */}
            <div style={styles.noPrint}>
                <button onClick={handlePrint} style={styles.printBtn}>
                    🖨️ Print QR Codes
                </button>
                <p style={styles.hint}>Click to print, or right-click → Save as PDF</p>
            </div>

            {/* Printable Sheet */}
            <div ref={printRef} style={styles.sheet} id="printable-sheet">
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>🧩 Younis Store</h1>
                    <p style={styles.subtitle}>Create Your Own Custom Puzzle!</p>
                    <p style={styles.url}>📱 Scan to visit: <strong>{STORE_URL}</strong></p>
                    <p style={styles.price}>Only <strong>50 SAR</strong></p>
                </div>

                {/* QR Code Grid */}
                <div style={styles.grid}>
                    {Array.from({ length: QR_COUNT }).map((_, i) => (
                        <div key={i} style={styles.qrCard}>
                            <QRCodeSVG
                                value={STORE_URL}
                                size={140}
                                level="H"
                                includeMargin={true}
                            />
                            <p style={styles.qrLabel}>Scan to Order!</p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <p>🎉 Upload your photo → Fill your details → Pay → Get your custom puzzle!</p>
                    <p style={styles.footerSmall}>Powered by Younis Store • younis.world</p>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .no-print, button {
                        display: none !important;
                    }
                    #printable-sheet {
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    noPrint: {
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#667eea',
        color: 'white',
    },
    printBtn: {
        padding: '1rem 3rem',
        fontSize: '1.3rem',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: '#667eea',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
    },
    hint: {
        marginTop: '0.5rem',
        fontSize: '0.9rem',
        opacity: 0.8,
    },
    sheet: {
        maxWidth: '210mm', // A4 width
        margin: '2rem auto',
        padding: '1.5rem',
        backgroundColor: 'white',
        boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '3px solid #667eea',
    },
    title: {
        fontSize: '2.5rem',
        color: '#667eea',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1.3rem',
        color: '#666',
        marginBottom: '0.5rem',
    },
    url: {
        fontSize: '1rem',
        color: '#333',
    },
    price: {
        fontSize: '1.5rem',
        color: '#ef4444',
        fontWeight: 'bold',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        marginBottom: '1.5rem',
    },
    qrCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        border: '2px dashed #ddd',
        borderRadius: '12px',
        backgroundColor: '#fafafa',
    },
    qrLabel: {
        marginTop: '0.5rem',
        fontSize: '0.85rem',
        color: '#667eea',
        fontWeight: '600',
    },
    footer: {
        textAlign: 'center',
        padding: '1rem',
        borderTop: '2px solid #667eea',
        color: '#333',
        fontSize: '1rem',
    },
    footerSmall: {
        fontSize: '0.8rem',
        color: '#999',
        marginTop: '0.25rem',
    },
};

// Print-specific overrides
if (typeof window !== 'undefined') {
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            body * {
                visibility: hidden;
            }
            #printable-sheet, #printable-sheet * {
                visibility: visible;
            }
            #printable-sheet {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 10mm;
                box-shadow: none;
            }
            .no-print {
                display: none !important;
            }
            @page {
                size: A4 portrait;
                margin: 5mm;
            }
        }
    `;
    document.head.appendChild(printStyle);
}
