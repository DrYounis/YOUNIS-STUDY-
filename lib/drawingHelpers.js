export function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();
    
    // Give the canvas pixel dimensions of their CSS size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    
    // Scale all drawing operations by the dpr, so you don't have to worry about it.
    ctx.scale(dpr, dpr);
    
    // Setup base styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    return { ctx, rect, dpr };
}

export function drawStrokes(ctx, strokes, color = '#000000') {
    if (!strokes || strokes.length === 0) return;
    
    strokes.forEach(stroke => {
        if (stroke.points.length === 0) return;
        
        ctx.beginPath();
        for (let i = 0; i < stroke.points.length; i++) {
            const point = stroke.points[i];
            
            // Re-apply pressure style per point if using dynamic width
            // Since canvas paths only support one line width per stroke,
            // for true dynamic width we'd draw individual segments.
            // For general smoothness, we just draw the whole path.
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.strokeStyle = stroke.color || color;
        ctx.lineWidth = stroke.width || 5;
        ctx.stroke();
    });
}
