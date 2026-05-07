const STORAGE_KEY = 'portfolio-likes';

const button = document.getElementById('likes-button');
const countEl = document.querySelector<HTMLElement>('[data-likes-count]');

const safeGetCount = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const n = Number(stored);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
};

const safeSetCount = (n: number): void => {
  try {
    localStorage.setItem(STORAGE_KEY, String(n));
  } catch {
    // localStorage unavailable (private mode, etc.) — count won't persist
  }
};

if (countEl) {
  countEl.textContent = String(safeGetCount());
}

button?.addEventListener('click', () => {
  const next = safeGetCount() + 1;
  safeSetCount(next);
  if (countEl) countEl.textContent = String(next);

  button.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.06)' },
      { transform: 'scale(1)' },
    ],
    { duration: 200, easing: 'ease-out' },
  );
});
