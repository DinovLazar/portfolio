const chars =
  '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>/\\=+-*&|';

interface Rain {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  drops: number[];
  fontSize: number;
  lastTime: number;
}

const rains: Rain[] = [];

const initRain = (canvas: HTMLCanvasElement): Rain | null => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const fontSize = 14;
  const rain: Rain = {
    canvas,
    ctx,
    width: 0,
    height: 0,
    drops: [],
    fontSize,
    lastTime: 0,
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    rain.width = rect.width;
    rain.height = rect.height;
    const cols = Math.max(1, Math.floor(rect.width / fontSize));
    if (rain.drops.length !== cols) {
      rain.drops = Array.from({ length: cols }, () => Math.random() * -50);
    }
  };

  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  return rain;
};

const drawRain = (rain: Rain): void => {
  const { ctx, width, height, drops, fontSize } = rain;

  ctx.fillStyle = 'rgba(10, 10, 10, 0.06)';
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Consolas, monospace`;
  ctx.fillStyle = '#a78bfa';

  for (let i = 0; i < drops.length; i++) {
    const char = chars.charAt(Math.floor(Math.random() * chars.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(char, x, y);

    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i] += 1;
  }
};

const tick = (now: number): void => {
  for (const rain of rains) {
    if (now - rain.lastTime >= 60) {
      drawRain(rain);
      rain.lastTime = now;
    }
  }
  requestAnimationFrame(tick);
};

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

if (!reduceMotion) {
  const canvases = document.querySelectorAll<HTMLCanvasElement>(
    '[data-code-rain]',
  );
  for (const canvas of canvases) {
    const rain = initRain(canvas);
    if (rain) rains.push(rain);
  }

  if (rains.length > 0) {
    requestAnimationFrame(tick);
  }
}
