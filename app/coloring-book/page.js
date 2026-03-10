'use client';
import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import * as templates from './components/drawingTemplates';

export default function ColoringBook() {
  const canvasRef = useRef(null);
  const [childName, setChildName] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);
  const [bookTitle, setBookTitle] = useState('كتيبي للتلوين');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewPage, setPreviewPage] = useState(null);

  const drawingCategories = {
    '🐶 حيوانات': ['dog', 'cat', 'bunny', 'elephant', 'lion', 'frog'],
    '🚗 مركبات': ['car', 'rocket', 'airplane', 'train', 'ship'],
    '🌳 طبيعة': ['tree', 'flower', 'sun', 'rainbow', 'moon', 'star'],
    '🦄 خيال': ['unicorn', 'dragon', 'castle', 'robot', 'fairy']
  };

  const allDrawings = Object.values(drawingCategories).flat();

  const togglePage = (drawing) => {
    if (selectedPages.includes(drawing)) {
      setSelectedPages(selectedPages.filter(p => p !== drawing));
    } else {
      if (selectedPages.length < 10) {
        setSelectedPages([...selectedPages, drawing]);
      }
    }
  };

  const drawPreview = async (drawing) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 800);

    // Draw border
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 560, 760);

    // Find and draw the template
    const drawFunc = findDrawingFunction(drawing);
    if (typeof drawFunc === 'function') {
      ctx.save();
      ctx.scale(1.5, 1.5);
      drawFunc(ctx, 200, 300, 6);
      ctx.restore();
    }

    setPreviewPage(drawing);
  };

  const findDrawingFunction = (name) => {
    const drawingMap = {
      dinosaur: templates.drawDinosaur,
      dog: templates.drawDog,
      cat: templates.drawCat,
      car: templates.drawCar,
      butterfly: templates.drawButterfly,
      flower: templates.drawFlower,
      tree: templates.drawTree,
      sun: templates.drawSun,
      rocket: templates.drawRocket,
      castle: templates.drawCastle,
      robot: templates.drawRobot,
      unicorn: templates.drawUnicorn,
      lion: templates.drawLion,
      frog: templates.drawFrog,
      ship: templates.drawShip,
      moon: templates.drawMoon,
      star: templates.drawStar,
      rainbow: templates.drawRainbow,
      bunny: templates.drawSimpleAnimal,
      elephant: templates.drawSimpleAnimal,
      dragon: templates.drawSimpleAnimal,
      fairy: templates.drawSimpleAnimal,
    };
    return drawingMap[name] || templates.drawSun;
  };

  const generateColoringBook = async () => {
    if (!childName || selectedPages.length === 0) {
      alert('الرجاء اختيار اسم الطفل والصفحات أولاً!');
      return;
    }

    setIsGenerating(true);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // ========== FIRST PAGE - Welcome ==========
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 800);
    
    // Decorative border
    const gradient = ctx.createLinearGradient(0, 0, 600, 800);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(0.5, '#764ba2');
    gradient.addColorStop(1, '#667eea');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);
    
    // White inner frame
    ctx.fillStyle = 'white';
    ctx.fillRect(30, 30, 540, 740);
    
    // Decorative corners
    ctx.font = '40px Arial';
    ctx.fillText('🌟', 50, 80);
    ctx.fillText('⭐', 520, 80);
    ctx.fillText('🌟', 50, 750);
    ctx.fillText('⭐', 520, 750);
    
    // Welcome text
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('أهلاً بك في عالم التلوين!', 300, 180);
    
    // Child's name
    ctx.fillStyle = '#764ba2';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.fillText(childName, 300, 280);
    
    // Decorative elements
    ctx.font = '60px Arial';
    ctx.fillText('🎨🖍️🎨', 300, 380);
    
    // Message
    ctx.fillStyle = '#333';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText('هذا الكتيب من صنعك!', 300, 480);
    ctx.fillText('استمتع بالتلوين يا بطل!', 300, 540);
    
    // Signature
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('younis.world', 300, 680);
    ctx.fillText('صُنع بحب في حائل ❤️', 300, 720);

    let imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

    // ========== COVER PAGE ==========
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 800);
    
    // Colorful cover border
    const gradient2 = ctx.createLinearGradient(0, 0, 600, 800);
    gradient2.addColorStop(0, '#667eea');
    gradient2.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient2;
    ctx.fillRect(10, 10, 580, 780);
    
    // White inner rectangle
    ctx.fillStyle = 'white';
    ctx.fillRect(30, 30, 540, 740);
    
    // Title
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.fillText(bookTitle, 300, 200);
    
    // Child's name
    ctx.fillStyle = '#764ba2';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillText(`إعداد: ${childName}`, 300, 280);
    
    // Decorative elements
    ctx.font = '60px Arial, sans-serif';
    ctx.fillText('🎨🖍️✏️', 300, 380);
    
    // Subtitle
    ctx.fillStyle = '#666';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText(`${selectedPages.length} صفحات للتلوين`, 300, 450);
    ctx.fillText('صممه ابنك بنفسه!', 300, 500);
    
    // Footer
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('younis.world', 300, 720);
    ctx.fillText('صُنع بحب في حائل ❤️', 300, 750);

    imgData = canvas.toDataURL('image/png');
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

    // ========== Drawing Pages ==========
    for (let i = 0; i < selectedPages.length; i++) {
      const drawing = selectedPages[i];
      
      // Clear canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 600, 800);
      
      // Border
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 20, 560, 760);
      
      // Page number
      ctx.fillStyle = '#999';
      ctx.font = '14px Arial, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`صفحة ${i + 1}`, 560, 50);
      
      // Draw the template
      const drawFunc = findDrawingFunction(drawing);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (typeof drawFunc === 'function') {
        ctx.save();
        ctx.scale(1.5, 1.5);
        drawFunc(ctx, 200, 300, 6);
        ctx.restore();
      }
      
      // Name line at bottom
      ctx.strokeStyle = '#999';
      ctx.beginPath();
      ctx.moveTo(350, 720);
      ctx.lineTo(560, 720);
      ctx.stroke();
      ctx.fillStyle = '#999';
      ctx.font = '16px Arial, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('الاسم:', 330, 730);

      const pageImgData = canvas.toDataURL('image/png');
      pdf.addPage();
      pdf.addImage(pageImgData, 'PNG', 0, 0, 210, 297);
    }

    // ========== LAST PAGE - Thank You ==========
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 600, 800);
    
    // Decorative border
    const gradient3 = ctx.createLinearGradient(0, 0, 600, 800);
    gradient3.addColorStop(0, '#43e97b');
    gradient3.addColorStop(1, '#38f9d7');
    ctx.fillStyle = gradient3;
    ctx.fillRect(0, 0, 600, 800);
    
    // White inner frame
    ctx.fillStyle = 'white';
    ctx.fillRect(30, 30, 540, 740);
    
    // Thank you message
    ctx.fillStyle = '#43e97b';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('أحسنت يا بطل! 🌟', 300, 250);
    
    ctx.fillStyle = '#333';
    ctx.font = '28px Arial, sans-serif';
    ctx.fillText('أكملت الكتيب بنجاح!', 300, 350);
    
    // Decorative stars
    ctx.font = '60px Arial';
    ctx.fillText('⭐🌟⭐', 300, 450);
    
    // Encouragement
    ctx.fillStyle = '#666';
    ctx.font = '22px Arial, sans-serif';
    ctx.fillText('نتمنى أنك استمتعت بالتلوين!', 300, 550);
    ctx.fillText('إلى اللقاء في كتيب جديد! 👋', 300, 600);
    
    // Signature
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('younis.world', 300, 680);
    ctx.fillText('صُنع بحب في حائل ❤️', 300, 720);

    imgData = canvas.toDataURL('image/png');
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

    // Save PDF
    const filename = `${childName.replace(/\s+/g, '-')}-كتيب-تلوين.pdf`;
    pdf.save(filename);
    
    setIsGenerating(false);
    alert('✅ تم تحميل الكتيب بنجاح!');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      color: 'white',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '0.5rem',
      textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
    },
    subtitle: {
      fontSize: '1.2rem',
      opacity: 0.9,
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    },
    inputGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      color: '#333',
      fontSize: '1.1rem',
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1.1rem',
      direction: 'rtl',
    },
    categorySection: {
      marginBottom: '2rem',
    },
    categoryTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#667eea',
      marginBottom: '1rem',
    },
    buttonsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '0.75rem',
    },
    pageButton: {
      padding: '1rem',
      border: '3px solid #e0e0e0',
      borderRadius: '10px',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    previewSection: {
      textAlign: 'center',
      padding: '2rem',
      background: '#f8f9fa',
      borderRadius: '15px',
    },
    canvas: {
      maxWidth: '300px',
      border: '5px solid #667eea',
      borderRadius: '10px',
    },
    generateButton: {
      width: '100%',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 5px 20px rgba(67, 233, 123, 0.4)',
      transition: 'all 0.3s ease',
    },
    selectedCount: {
      textAlign: 'center',
      padding: '1rem',
      background: '#667eea',
      color: 'white',
      borderRadius: '10px',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    homeButton: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      fontWeight: 'bold',
      marginBottom: '1rem',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255,255,255,0.3)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Home Button */}
        <div style={{ textAlign: 'center' }}>
          <a href="/" style={styles.homeButton}>🏠 العودة للرئيسية</a>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🎨 كتيب التلوين الخاص بطفلك 🖍️</h1>
          <p style={styles.subtitle}>صمم كتيب تلوين مخصص باسم طفلك وحمله بصيغة PDF!</p>
        </div>

        {/* Step 1: Child Info */}
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea' }}>
            1️⃣ معلومات الكتيب
          </h2>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>اسم الطفل 📝</label>
            <input
              type="text"
              style={styles.input}
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="مثال: أحمد، فاطمة، محمد..."
              dir="rtl"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>عنوان الكتيب 📚</label>
            <input
              type="text"
              style={styles.input}
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="مثال: كتيبي للتلوين، رسوماتي الجميلة..."
              dir="rtl"
            />
          </div>
        </div>

        {/* Step 2: Select Pages */}
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea' }}>
            2️⃣ اختر الصفحات (حد أقصى ١٠ صفحات)
          </h2>

          <div style={styles.selectedCount}>
            ✅ الصفحات المختارة: {selectedPages.length} / 10
          </div>

          {Object.entries(drawingCategories).map(([category, drawings]) => (
            <div key={category} style={styles.categorySection}>
              <h3 style={styles.categoryTitle}>{category}</h3>
              <div style={styles.buttonsGrid}>
                {drawings.map((drawing) => (
                  <button
                    key={drawing}
                    onClick={() => {
                      togglePage(drawing);
                      drawPreview(drawing);
                    }}
                    style={{
                      ...styles.pageButton,
                      borderColor: selectedPages.includes(drawing) ? '#43e97b' : '#e0e0e0',
                      background: selectedPages.includes(drawing) ? '#f0fff4' : 'white',
                    }}
                  >
                    {selectedPages.includes(drawing) ? '✅ ' : '➕ '}
                    {drawing}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Step 3: Preview */}
        {previewPage && (
          <div style={styles.card}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea' }}>
              3️⃣ معاينة الصفحة
            </h2>
            <div style={styles.previewSection}>
              <canvas
                ref={canvasRef}
                width={600}
                height={800}
                style={styles.canvas}
              />
              <p style={{ marginTop: '1rem', color: '#666' }}>
                معاينة: {previewPage}
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Generate */}
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#667eea' }}>
            4️⃣ تحميل الكتيب
          </h2>
          
          <button
            onClick={generateColoringBook}
            disabled={isGenerating || selectedPages.length === 0 || !childName}
            style={{
              ...styles.generateButton,
              opacity: (isGenerating || selectedPages.length === 0 || !childName) ? 0.5 : 1,
              cursor: (isGenerating || selectedPages.length === 0 || !childName) ? 'not-allowed' : 'pointer',
            }}
          >
            {isGenerating ? '⏳ جاري التحميل...' : `📥 تحميل الكتيب (${selectedPages.length} صفحة)`}
          </button>

          {selectedPages.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
              ⚠️ اختر صفحة واحدة على الأقل
            </p>
          )}
        </div>

        {/* Info Box */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '15px',
          padding: '1.5rem',
          textAlign: 'center',
        }}>
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>📋 كيف يعمل؟</h3>
          <ol style={{ textAlign: 'right', lineHeight: '2', color: '#333' }}>
            <li>اكتب اسم طفلك وعنوان الكتيب</li>
            <li>اختر الرسومات اللي تعجبه (حد أقصى ١٠)</li>
            <li>شوف المعاينة عشان تتأكد</li>
            <li>اضغط "تحميل الكتيب" وراح ينزل PDF جاهز للطباعة!</li>
          </ol>
          <p style={{ color: '#666', marginTop: '1rem', fontSize: '0.9rem' }}>
            🖨️ الكتيب بصيغة A4 وجاهز للطباعة المنزلية
          </p>
        </div>
      </div>
    </div>
  );
}
