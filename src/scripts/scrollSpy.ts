const sectionIds = ['home', 'projects', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

const links = new Map<SectionId, HTMLAnchorElement>();
for (const id of sectionIds) {
  const link = document.querySelector<HTMLAnchorElement>(
    `[data-nav-link="${id}"]`,
  );
  if (link) links.set(id, link);
}

const setActive = (activeId: SectionId): void => {
  for (const [id, link] of links) {
    if (id === activeId) {
      link.dataset.active = 'true';
    } else {
      delete link.dataset.active;
    }
  }
};

const ratios = new Map<SectionId, number>(
  sectionIds.map((id) => [id, 0]),
);

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const id = entry.target.id as SectionId;
      ratios.set(id, entry.intersectionRatio);
    }

    let bestId: SectionId = sectionIds[0];
    let bestRatio = -1;
    for (const [id, ratio] of ratios) {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    }
    setActive(bestId);
  },
  { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
);

for (const id of sectionIds) {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
}

setActive('home');
