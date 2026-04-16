'use client';
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { setupCanvas } from '../../lib/drawingHelpers';

const TracingPad = forwardRef(({ lesson, showGuide = true, onDraw }, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState(null);
    const [currentStroke, setCurrentStroke] = useState(null);
    const strokesRef = useRef([]);

    useImperativeHandle(ref, () => ({
        clear: () => {
            strokesRef.current = [];
            redraw();
            if (onDraw) onDraw();
        },
        undo: () => {
            strokesRef.current.pop();
            redraw();
            if (onDraw) onDraw();
        },
        getStrokes: () => strokesRef.current,
        setStrokes: (saved) => {
            if (saved) {
                strokesRef.current = saved;
                redraw();
            }
        }
    }));

    const redraw = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Reset transform to clear correctly
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Restore dpr scaling
        const dpr = window.devicePixelRatio || 1;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Draw guides
        drawGuides(context, canvas.width / dpr, canvas.height / dpr);

        // Draw all strokes
        strokesRef.current.forEach(stroke => {
            if (stroke.points.length === 0) return;
            context.beginPath();
            context.lineCap = 'round';
            context.lineJoin = 'round';
            for (let i = 0; i < stroke.points.length; i++) {
                const pt = stroke.points[i];
                if (i === 0) {
                    context.moveTo(pt.x, pt.y);
                } else {
                    context.lineTo(pt.x, pt.y);
                }
            }
            context.strokeStyle = stroke.color;
            context.lineWidth = stroke.width; // We use base width, although could be variable
            context.stroke();
        });
    };

    const drawGuides = (context, w, h) => {
        // Draw baseline (خط الأساس)
        context.beginPath();
        context.setLineDash([5, 5]);
        context.moveTo(0, lesson.baselineY);
        context.lineTo(w, lesson.baselineY);
        context.strokeStyle = '#cccccc';
        context.lineWidth = 1;
        context.stroke();

        // Draw height line (خط القمة)
        context.beginPath();
        context.moveTo(0, lesson.heightLineY);
        context.lineTo(w, lesson.heightLineY);
        context.stroke();
        context.setLineDash([]); // Reset dash

        // Draw Guide Letter
        if (showGuide) {
            context.fillStyle = 'rgba(0, 0, 255, 0.15)';
            context.font = "200px 'Noto Naskh Arabic', serif";
            context.textAlign = 'center';
            context.textBaseline = 'alphabetic';
            context.fillText(lesson.letter, w / 2, lesson.baselineY);
        }
    };

    useEffect(() => {
        const initCanvas = () => {
            const { ctx: initCtx } = setupCanvas(canvasRef.current);
            setCtx(initCtx);
            redraw();
        };

        initCanvas();
        window.addEventListener('resize', initCanvas);
        
        // Ensure font is loaded before redrawing
        document.fonts.ready.then(() => {
            redraw();
        });

        return () => window.removeEventListener('resize', initCanvas);
    }, [lesson, showGuide]);

    const getCoord = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        setIsDrawing(true);
        const pt = getCoord(e);
        
        // Pressure sensitivity: default to 1, pen can range 0 to 1
        const pressure = e.pointerType === 'pen' ? e.pressure : 0.5;
        const width = 5 + (pressure * 10); // line width between 5 to 15

        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(pt.x, pt.y);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = width;

        const newStroke = { color: '#000000', width, points: [pt] };
        setCurrentStroke(newStroke);
    };

    const handlePointerMove = (e) => {
        e.preventDefault();
        if (!isDrawing || !ctx) return;
        
        const pt = getCoord(e);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();

        setCurrentStroke(prev => ({
            ...prev,
            points: [...prev.points, pt]
        }));
    };

    const handlePointerUp = (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        setIsDrawing(false);
        strokesRef.current.push(currentStroke);
        setCurrentStroke(null);
        if (onDraw) onDraw();
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', background: '#fafafa', borderRadius: '1rem', border: '1px solid #e0e0e0', overflow: 'hidden', touchAction: 'none' }}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap');
            `}</style>
            <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerOut={handlePointerUp}
                style={{ width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
            />
        </div>
    );
});

TracingPad.displayName = 'TracingPad';

export default TracingPad;
