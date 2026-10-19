"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { projects } from "./portfolio-data";

function Mark({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`project-mark ${className}`} aria-hidden="true">{children}</span>;
}

const categories = [
  "All projects",
  "G17 Program",
  "Research & learning",
  "Campus & culture",
  "Community & service",
  "Environment & sustainability",
];

const categoryIcons: Record<string, string> = {
  "G17 Program": "◉",
  "Research & learning": "⌕",
  "Campus & culture": "♧",
  "Community & service": "♡",
  "Environment & sustainability": "✳",
};

export default function ProjectsSection() {
  const [category, setCategory] = useState("All projects");
  const [projectStyle, setProjectStyle] = useState<"cards" | "glow">("glow");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleProjects = projects
    .map((project, index) => ({ ...project, index }))
    .filter((project) => category === "All projects" || project.category === category);

  function chooseProjectStyle(style: "cards" | "glow") {
    setProjectStyle(style);
  }

  const activeCarouselIndex = visibleProjects.length ? carouselIndex % visibleProjects.length : 0;
  const glowProject = visibleProjects[activeCarouselIndex];
  const previousProject = visibleProjects[(activeCarouselIndex - 1 + visibleProjects.length) % visibleProjects.length];
  const nextProject = visibleProjects[(activeCarouselIndex + 1) % visibleProjects.length];

  useEffect(() => {
    if (selected === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = closeRef.current?.closest("[role='dialog']");
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [selected]);

  const activeProject = selected === null ? null : projects[selected];

  return (
    <>
      <section className="projects-section" id="projects" aria-labelledby="projects-title">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Projects, service & field learning</p>
              <h2 id="projects-title">Small steps.<br /><em>Shared impact.</em></h2>
            </div>
            <p className="heading-aside">
              Projects, field research, and cultural experiences — a journey of learning, leadership, and shared purpose.
            </p>
          </div>

          <div className="project-style-row">
            <span className="project-style-label">Choose a view</span>
            <div className="project-style-switch" role="group" aria-label="Project section style">
              <button type="button" className={projectStyle === "cards" ? "is-active" : ""} aria-pressed={projectStyle === "cards"} onClick={() => chooseProjectStyle("cards")}>Classic cards</button>
              <button type="button" className={projectStyle === "glow" ? "is-active" : ""} aria-pressed={projectStyle === "glow"} onClick={() => chooseProjectStyle("glow")}>Glow carousel</button>
            </div>
          </div>

          <div className="project-filters" role="group" aria-label="Filter projects">
            {categories.map((item) => (
              <button
                className={`project-filter${category === item ? " is-active" : ""}`}
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
                {item === "All projects" && <span>{projects.length}</span>}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {visibleProjects.length} projects shown
          </p>

          {projectStyle === "glow" && glowProject ? (
            <div className="project-glow-carousel">
              <div className="project-glow-stage" key={glowProject.title}>
                <div className="project-glow-aura" />
                <button className="glow-side-card glow-side-prev" type="button" onClick={() => setCarouselIndex((index) => (index - 1 + visibleProjects.length) % visibleProjects.length)} aria-label={`Previous project: ${previousProject.title}`}>
                  {previousProject.cover && <img src={previousProject.cover} alt="" loading="lazy" />}
                  <span>{previousProject.title}</span>
                </button>
                <button
                  className="glow-feature-card"
                  type="button"
                  onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(glowProject.index); }}
                  aria-label={`Read about ${glowProject.title}`}
                >
                  {glowProject.cover ? <img src={glowProject.cover} alt={`${glowProject.title} project`} /> : <div className={`glow-placeholder tone-${glowProject.tone}`}><span>{glowProject.word}</span></div>}
                  <span className="glow-feature-shade" />
                  <span className="glow-feature-copy"><small>{glowProject.category} · {glowProject.year}</small><strong>{glowProject.title}</strong><span>View project <b aria-hidden="true">↗</b></span></span>
                </button>
                <button className="glow-side-card glow-side-next" type="button" onClick={() => setCarouselIndex((index) => (index + 1) % visibleProjects.length)} aria-label={`Next project: ${nextProject.title}`}>
                  {nextProject.cover && <img src={nextProject.cover} alt="" loading="lazy" />}
                  <span>{nextProject.title}</span>
                </button>
                <button className="glow-arrow glow-arrow-prev" type="button" onClick={() => setCarouselIndex((index) => (index - 1 + visibleProjects.length) % visibleProjects.length)} aria-label="Previous project">‹</button>
                <button className="glow-arrow glow-arrow-next" type="button" onClick={() => setCarouselIndex((index) => (index + 1) % visibleProjects.length)} aria-label="Next project">›</button>
              </div>
              <div className="glow-project-caption">
                <div><span>{glowProject.date} · {glowProject.tag}</span><p>{glowProject.summary}</p></div>
                <span className="glow-counter">{String(activeCarouselIndex + 1).padStart(2, "0")} <i>/</i> {String(visibleProjects.length).padStart(2, "0")}</span>
              </div>
              <div className="glow-carousel-dots" aria-label="Choose project">
                {visibleProjects.map((project, index) => <button key={project.title} type="button" className={index === activeCarouselIndex ? "is-active" : ""} onClick={() => setCarouselIndex(index)} aria-label={`Show ${project.title}`} aria-current={index === activeCarouselIndex ? "true" : undefined} />)}
              </div>
            </div>
          ) : (
          <div className="project-grid">
            {visibleProjects.map((project) => {
              const categoryIcon = categoryIcons[project.category] ?? "✳";

              return (
                <button
                  className={`project-card tone-${project.tone}`}
                  key={project.title}
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setSelected(project.index);
                  }}
                  aria-label={`Read about ${project.title}`}
                >
                  <div className={`project-art${project.cover ? " project-photo" : ""}`}>
                    {project.cover ? (
                      <>
                        <img
                          src={project.cover}
                          alt={`${project.title} — a photograph from the project`}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="project-photo-count">
                          {project.images.length} {project.images.length === 1 ? "photo" : "photos"}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="project-art-ring" />
                        <span className="project-art-ring project-art-ring-two" />
                        <Mark className="project-category-mark">{categoryIcon}</Mark>
                        <span className="project-art-word">{project.word}</span>
                      </>
                    )}
                    <span className="project-art-year">{project.year}</span>
                  </div>
                  <div className="project-card-body">
                    <div className="project-card-category">
                      <span>{project.category}</span>
                      <Mark>↗</Mark>
                    </div>
                    <h3>{project.title}</h3>
                    <span className="project-card-date">{project.date}</span>
                    <p>{project.summary}</p>
                    <div className="project-card-bottom">
                      <span>{project.tag}</span>
                      <span>Explore project <Mark>→</Mark></span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          )}

          <p className="project-footnote">
            Open a project to read the full story, personal contribution, and see its photographs.
          </p>
        </div>
      </section>

      {activeProject && (
        <div
          className="project-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button
              className="project-modal-close"
              ref={closeRef}
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close project details"
            >
              <Mark className="project-close-mark">×</Mark>
            </button>
            <p className="eyebrow">{activeProject.category} / {activeProject.year}</p>
            <h2 id="project-modal-title">{activeProject.title}</h2>
            <span className="project-modal-tag">{activeProject.tag}</span>
            <p className="project-modal-date">{activeProject.date}</p>
            <h3>My experience & contribution</h3>
            <p className="project-modal-detail">{activeProject.detail}</p>
            <div className="project-learning">
              {activeProject.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
            {activeProject.images.length > 0 && (
              <div className="project-detail-gallery">
                <h3>From the experience <span>{activeProject.images.length} {activeProject.images.length === 1 ? "photo" : "photos"}</span></h3>
                <div className="project-detail-grid">
                  {activeProject.images.map((src, index) => (
                    <figure key={src}>
                      <img src={src} alt={`${activeProject.title} project photograph ${index + 1}`} loading="lazy" decoding="async" />
                      <figcaption>{activeProject.title} · {index + 1} / {activeProject.images.length}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
            <div className="project-modal-note"><Mark>♡</Mark><span>Part of my journey in community service and purposeful leadership.</span></div>
          </section>
        </div>
      )}
    </>
  );
}
