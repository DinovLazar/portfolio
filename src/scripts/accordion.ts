const items = document.querySelectorAll<HTMLElement>('.accordion-item');

for (const item of items) {
  const trigger = item.querySelector<HTMLButtonElement>('.accordion-trigger');
  if (!trigger) continue;

  trigger.addEventListener('click', () => {
    const wasOpen = item.dataset.open === 'true';

    for (const other of items) {
      other.dataset.open = 'false';
      const otherTrigger = other.querySelector('.accordion-trigger');
      otherTrigger?.setAttribute('aria-expanded', 'false');
    }

    if (!wasOpen) {
      item.dataset.open = 'true';
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
}
