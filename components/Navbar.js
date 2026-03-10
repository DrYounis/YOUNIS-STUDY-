'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navStyles = {
        header: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            borderBottom: '2px solid rgba(255,255,255,0.2)',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 5px 30px rgba(102, 126, 234, 0.4)',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '1rem 2rem',
        },
        logo: {
            fontSize: '2rem',
            fontWeight: '800',
            color: 'white',
            textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
            textDecoration: 'none',
        },
        links: {
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
        link: {
            fontWeight: '700',
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.95)',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.2)',
        },
        mobileMenu: {
            position: 'absolute',
            top: '100px',
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '1rem',
            borderBottom: '2px solid rgba(255,255,255,0.2)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        },
        hamburger: {
            display: 'none',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
        }
    };

    return (
        <header style={navStyles.header}>
            <div className="container" style={navStyles.nav}>
                <Link href="/" style={navStyles.logo}>
                    🌍 Younis Adventures
                </Link>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={navStyles.links}>
                    <Link href="/" style={navStyles.link}>🏠 Home</Link>
                    <Link href="/fun-zone" style={{...navStyles.link, background: 'rgba(255,255,255,0.25)', fontWeight: '800'}}>🎉 Fun Zone</Link>
                    <Link href="/citizens" style={navStyles.link}>🏆 Citizens</Link>
                    <Link href="/secret-box" style={navStyles.link}>🔐 Secret</Link>
                    <Link href="/kids-tools" style={navStyles.link}>🎨 Kids Tools</Link>
                    <Link href="/coloring-book" style={navStyles.link}>📚 Coloring Book</Link>
                    <Link href="/bedtime-stories" style={navStyles.link}>📚 Stories</Link>
                    <Link href="/friends" style={navStyles.link}>💌 Friends</Link>
                    <Link href="/videos" style={navStyles.link}>🎬 Videos</Link>
                    <Link href="/gallery" style={navStyles.link}>🖼️ Gallery</Link>
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={toggleMenu} style={navStyles.hamburger}>
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Nav */}
                <div style={navStyles.mobileMenu}>
                    <Link href="/" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>🏠 Home</Link>
                    <Link href="/fun-zone" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center', background: 'rgba(255,255,255,0.25)' }}>🎉 Fun Zone</Link>
                    <Link href="/citizens" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>🏆 Citizens</Link>
                    <Link href="/secret-box" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>🔐 Secret Box</Link>
                    <Link href="/kids-tools" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>🎨 Kids Tools</Link>
                    <Link href="/coloring-book" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>📚 Coloring Book</Link>
                    <Link href="/bedtime-stories" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>📚 Stories</Link>
                    <Link href="/friends" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>💌 Friends</Link>
                    <Link href="/videos" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>🎬 Videos</Link>
                    <Link href="/gallery" onClick={toggleMenu} style={{ ...navStyles.link, fontSize: '1.3rem', textAlign: 'center' }}>🖼️ Gallery</Link>
                </div>
            </div>
            <style jsx>{`
        @media (max-width: 1200px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </header>
    );
}
