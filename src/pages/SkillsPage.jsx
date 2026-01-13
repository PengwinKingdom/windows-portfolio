import "../styles/skills.css";
import { t } from "../i18n";

function SkillCard({title,items}){
    return(
        <div className="skill-card">
            <h3 className="skill-card-title">{title}</h3>
            <ul className="skill-list">
                {items.map((it, i) => (
                
                <li key={i}>{it}</li>
                ))}
            </ul>
        </div>
    );
}

export default function SkillsPage({ lang }) {
  const cardsObj = t(lang, "skills.cards");

  if (!cardsObj || typeof cardsObj !== "object") {
    return <div className="skills-page">No skills data</div>;
  }

  const cards = Object.entries(cardsObj);

  return (
    <div className="skills-page">
      <h2 className="skills-title">{t(lang, "skills.title")}</h2>

      {/* DIVIDER */}
      <div className="skills-divider" />

      <div className="skills-grid">
        {cards.map(([id, c]) => (
          <SkillCard key={id} title={c.title} items={c.items} />
        ))}
      </div>
    </div>
  );
}
