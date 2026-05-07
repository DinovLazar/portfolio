const sectionIds = ['home', 'projects', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

const links = new Map<SectionId, HTMLAnchorElement>();
for (const id of sectionIds) {
  const link = document.querySelector<HTMLAnchorElement>(
    `[data-nav-link="${id}"]`,
  );
  if (link) links.set(id, link);
}

const sections: HTMLElement[] = [];
for (const id of sectionIds) {
  const section = document.getElementById(id);
  if (section) sections.push(section);
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

const updateActive = (): void => {
  const probe = window.scrollY + window.innerHeight * 0.4;
  let activeId: SectionId = sectionIds[0];

  for (const section of sections) {
    const top = section.getBoundingClientRect().top + window.scrollY;
    if (top <= probe) {
      activeId = section.id as SectionId;
    } else {
      break;
    }
  }

  setActive(activeId);
};

let raf = 0;
const onScroll = (): void => {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    updateActive();
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
updateActive();
