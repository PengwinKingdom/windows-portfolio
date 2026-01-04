import { useMemo, useState, useEffect } from "react";
import "../styles/projects.css";
import { t } from "../i18n";

export default function ProjectsPage({ lang }) {
  const projects = t(lang, "projects.featured");

  const firstId = useMemo(() => (projects?.[0]?.id ?? null), [projects]);
  const [selectedId, setSelectedId] = useState(firstId);

  useEffect(() => {
    if (!projects?.length) return;

    if (!selectedId || !projects.some((p) => p.id === selectedId)) {
      setSelectedId(projects[0].id);
    }
  }, [projects, selectedId]);

  const active = useMemo(() => {
    if (!projects?.length) return null;
    return projects.find((p) => p.id === selectedId) ?? projects[0];
  }, [projects, selectedId]);

  if (!Array.isArray(projects) || !projects.length || !active) {
    return <div className="projects-page">No projects data</div>;
  }

  return (
    <div className="projects-page">
      <div className="projects-layout">
        {/* LEFT: list */}
        <div className="projects-list">
          {projects.map((p) => (
            <button
              key={p.id}
              className={`project-item ${p.id === active.id ? "active" : ""}`}
              onClick={() => setSelectedId(p.id)}
              type="button">
              <div className="project-item-title">{p.title}</div>
              <div className="project-item-tags">
                {active.tags.map((tag, i) => (
    <span key={i} className="tag">{tag}</span>
  ))}
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT: details */}
        <div className="project-details">
          <h2 className="project-title">{active.title}</h2>

          <div className="project-tags">
            {active.tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="project-main">
            <div className="project-info">
              <p className="project-description">{active.description}</p>

              <h3>{t(lang, "projects.learnedTitle")}</h3>

              <ul>
                {active.learned.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {active.link && (
                <a
                  className="project-link"
                  href={active.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(lang, "projects.link")}
                </a>
              )}
            </div>

            <div className="project-preview">
              {active.image ? (
                <img
                  src={active.image}
                  alt={`${active.title} preview`}
                  className="project-image"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
