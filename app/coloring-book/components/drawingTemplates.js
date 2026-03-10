// Drawing Templates - Simple black and white line drawings for kids to color

export const drawDinosaur = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 100, y - 50, x + 200, y);
  ctx.lineTo(x + 180, y + 80);
  ctx.quadraticCurveTo(x + 100, y + 30, x, y + 80);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 200, y - 20, 40, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 215, y - 35, 5, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 50 + i * 40, y - 20);
    ctx.lineTo(x + 70 + i * 40, y - 60);
    ctx.lineTo(x + 90 + i * 40, y - 20);
    ctx.stroke();
  }
};

export const drawDog = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.arc(x + 150, y, 50, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x + 120, y - 40, 15, 25, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x + 180, y - 40, 15, 25, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 130, y - 15, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 170, y - 15, 5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 150, y + 10, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x + 150, y + 80, 80, 40, 0, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 100 + i * 35, y + 60);
    ctx.lineTo(x + 100 + i * 35, y + 120);
    ctx.stroke();
  }
};

export const drawCat = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.arc(x + 150, y, 45, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 120, y - 35);
  ctx.lineTo(x + 100, y - 70);
  ctx.lineTo(x + 140, y - 50);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 180, y - 35);
  ctx.lineTo(x + 200, y - 70);
  ctx.lineTo(x + 160, y - 50);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 130, y - 15, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 170, y - 15, 5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 130, y);
  ctx.lineTo(x + 100, y - 10);
  ctx.moveTo(x + 130, y);
  ctx.lineTo(x + 100, y + 10);
  ctx.moveTo(x + 170, y);
  ctx.lineTo(x + 200, y - 10);
  ctx.moveTo(x + 170, y);
  ctx.lineTo(x + 200, y + 10);
  ctx.stroke();
};

export const drawCar = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.rect(x, y, 300, 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x + 50, y - 50, 150, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x + 70, y - 40, 40, 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(x + 140, y - 40, 40, 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 70, y + 100, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 230, y + 100, 30, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawButterfly = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.ellipse(x, y, 20, 60, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x - 50, y - 20, 60, 40, -0.3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x + 50, y - 20, 60, 40, 0.3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x - 40, y + 30, 40, 30, 0.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x + 40, y + 30, 40, 30, -0.2, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawFlower = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.moveTo(x + 100, y + 100);
  ctx.lineTo(x + 100, y + 200);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x + 100, y + 150, 15, 30, -0.3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x + 100, y + 180, 15, 30, 0.3, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.ellipse(
      x + 100 + 30 * Math.cos(i * Math.PI / 3),
      y + 70 + 30 * Math.sin(i * Math.PI / 3),
      20, 20, 0, 0, Math.PI * 2
    );
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(x + 100, y + 70, 20, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawTree = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.rect(x - 20, y + 100, 40, 150);
  ctx.stroke();

  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(
      x + 20 * Math.cos(i * 1.2),
      y + 50 + 30 * Math.sin(i * 1.2),
      40, 0, Math.PI * 2
    );
    ctx.stroke();
  }
};

export const drawSun = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.arc(x, y, 60, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(
      x + 80 * Math.cos(i * Math.PI / 4),
      y + 80 * Math.sin(i * Math.PI / 4)
    );
    ctx.lineTo(
      x + 110 * Math.cos(i * Math.PI / 4),
      y + 110 * Math.sin(i * Math.PI / 4)
    );
    ctx.stroke();
  }
};

export const drawSimpleAnimal = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.arc(x, y, 80, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x - 40, y - 50, 25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 40, y - 50, 25, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x - 30, y - 20, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 30, y - 20, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y + 20, 10, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawRocket = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.rect(x + 80, y, 40, 150);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 80, y);
  ctx.lineTo(x + 100, y - 50);
  ctx.lineTo(x + 120, y);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 80, y + 120);
  ctx.lineTo(x + 50, y + 150);
  ctx.lineTo(x + 80, y + 150);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 120, y + 120);
  ctx.lineTo(x + 150, y + 150);
  ctx.lineTo(x + 120, y + 150);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 100, y + 50, 15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 85, y + 150);
  ctx.lineTo(x + 100, y + 180);
  ctx.lineTo(x + 115, y + 150);
  ctx.stroke();
};

export const drawCastle = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.rect(x + 50, y + 100, 200, 150);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x + 20, y + 50, 50, 200);
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(x + 230, y + 50, 50, 200);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x + 100, y + 20, 100, 80);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 150, y + 250, 25, Math.PI, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 70, y + 100, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 230, y + 100, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 45, y + 50);
  ctx.lineTo(x + 45, y + 20);
  ctx.lineTo(x + 65, y + 35);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 255, y + 50);
  ctx.lineTo(x + 255, y + 20);
  ctx.lineTo(x + 275, y + 35);
  ctx.closePath();
  ctx.stroke();
};

export const drawRobot = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.rect(x + 50, y, 100, 80);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 80, y + 30, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 120, y + 30, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 100, y);
  ctx.lineTo(x + 100, y - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 100, y - 30, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x + 40, y + 100, 120, 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x, y + 110, 40, 60);
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(x + 160, y + 110, 40, 60);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(x + 50, y + 200, 40, 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(x + 110, y + 200, 40, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 80, y + 140, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 100, y + 160, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 120, y + 140, 8, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawUnicorn = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.ellipse(x + 100, y + 120, 80, 50, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 150, y + 80);
  ctx.quadraticCurveTo(x + 180, y + 50, x + 180, y);
  ctx.lineTo(x + 140, y);
  ctx.quadraticCurveTo(x + 140, y + 50, x + 120, y + 80);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x + 170, y - 20, 30, 25, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 180, y - 40);
  ctx.lineTo(x + 190, y - 90);
  ctx.lineTo(x + 200, y - 40);
  ctx.closePath();
  ctx.stroke();

  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(x + 150 + i * 10, y + 10 - i * 15, 15, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 40 + i * 40, y + 100);
    ctx.lineTo(x + 40 + i * 40, y + 180);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(x + 20, y + 100);
  ctx.quadraticCurveTo(x - 20, y + 150, x - 10, y + 180);
  ctx.stroke();
};

export const drawLion = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.arc(x + 100, y + 80, 70, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 100, y + 80, 50, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 60, y + 40, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 140, y + 40, 15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 80, y + 70, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 120, y + 70, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 100, y + 95, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x + 100, y + 180, 60, 40, 0, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawFrog = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.ellipse(x + 100, y + 100, 70, 50, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 60, y + 50, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 140, y + 50, 20, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 60, y + 50, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 140, y + 50, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x + 40, y + 140, 20, 30, -0.3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x + 160, y + 140, 20, 30, 0.3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 100, y + 90, 20, 0.2, Math.PI - 0.2);
  ctx.stroke();
};

export const drawShip = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.moveTo(x + 50, y + 100);
  ctx.quadraticCurveTo(x + 150, y + 150, x + 250, y + 100);
  ctx.lineTo(x + 250, y + 50);
  ctx.quadraticCurveTo(x + 150, y + 80, x + 50, y + 50);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 150, y + 80);
  ctx.lineTo(x + 150, y - 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 150, y - 40);
  ctx.lineTo(x + 150, y + 20);
  ctx.lineTo(x + 220, y + 20);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 150, y - 50);
  ctx.lineTo(x + 180, y - 40);
  ctx.lineTo(x + 150, y - 30);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 100, y + 75, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 200, y + 75, 10, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawMoon = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.arc(x, y, 60, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 30, y - 10, 50, 0, Math.PI * 2);
  ctx.strokeStyle = 'white';
  ctx.stroke();
  ctx.strokeStyle = 'black';

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const sx = x + Math.cos(angle) * 100;
    const sy = y + Math.sin(angle) * 100;
    drawStarShape(ctx, sx, sy, 8, 4, thickness);
  }
};

export const drawStarShape = (ctx, x, y, outerRadius, innerRadius) => {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI / 5) - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
};

export const drawStar = (ctx, x, y, thickness) => {
  drawStarShape(ctx, x, y, 60, 25);

  ctx.beginPath();
  ctx.arc(x - 15, y - 10, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 15, y - 10, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y + 15, 10, 0.2, Math.PI - 0.2);
  ctx.stroke();
};

export const drawRainbow = (ctx, x, y, thickness) => {
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(x, y + 100, 150 - i * 20, Math.PI, 0);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = thickness + 2;
    ctx.stroke();
  }
  ctx.strokeStyle = 'black';
  ctx.lineWidth = thickness;

  drawCloud(ctx, x - 120, y + 80, thickness);
  drawCloud(ctx, x + 120, y + 80, thickness);
};

export const drawCloud = (ctx, x, y, thickness) => {
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.arc(x + 25, y - 10, 35, 0, Math.PI * 2);
  ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
};
