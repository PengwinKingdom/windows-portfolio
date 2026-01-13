import "../styles/how.css";
import { t } from "../i18n";

export default function HowPage({ lang }) {
  const title = t(lang, "how.title");
  const sections = t(lang, "how.sections");

  if (!Array.isArray(sections)) {
    return <div className="how-page">No data</div>;
  }

  return (
    <div className="how-page">
      <h2 className="how-title">{title}</h2>

      {/* DIVIDER */}
      <div className="how-divider" />

      <div className="how-grid">
        {sections.map((sec, idx) => (
          <section key={idx} className="how-card">
            <h3 className="how-card-title">{sec.title}</h3>

            <ul className="how-list">
              {sec.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
