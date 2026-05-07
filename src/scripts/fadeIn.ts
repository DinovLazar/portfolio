const elements = document.querySelectorAll<HTMLElement>('[data-fade-in]');

if (elements.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  for (const el of elements) {
    observer.observe(el);
  }
} else {
  for (const el of elements) {
    el.classList.add('is-visible');
  }
}
