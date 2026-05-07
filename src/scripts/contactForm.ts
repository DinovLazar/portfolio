const form = document.querySelector<HTMLFormElement>('#contact-form');
const statusEl = document.querySelector<HTMLParagraphElement>('#contact-statusEl');
const submitBtn = form?.querySelector<HTMLButtonElement>(
  'button[type="submit"]',
);

const setStatus = (text: string, tone: 'idle' | 'success' | 'error'): void => {
  if (!statusEl) return;
  statusEl.textContent = text;
  const toneClass =
    tone === 'success'
      ? 'text-active'
      : tone === 'error'
        ? 'text-red-400'
        : 'text-muted';
  statusEl.className = `text-sm min-h-[1.25rem] ${toneClass}`;
};

if (form && submitBtn) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const accessKey = (formData.get('access_key') as string | null) ?? '';

    if (!accessKey.trim()) {
      setStatus(
        'Form not configured. Set PUBLIC_WEB3FORMS_ACCESS_KEY in .env and restart the dev server.',
        'error',
      );
      return;
    }

    submitBtn.disabled = true;
    setStatus('Sending…', 'idle');

    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = (await res.json()) as { success: boolean; message?: string };

      if (result.success) {
        setStatus("Message sent! I'll get back to you soon.", 'success');
        form.reset();
      } else {
        setStatus(
          result.message || 'Something went wrong. Please try again.',
          'error',
        );
      }
    } catch {
      setStatus(
        'Network error. Please check your connection and try again.',
        'error',
      );
    } finally {
      submitBtn.disabled = false;
    }
  });
}
