import "../styles/about.css";
import { t } from "../i18n";

export default function AboutPage({ lang }) {
  const name = t(lang, "about.name");
  const tagline = t(lang, "about.tagline");
  const intro = t(lang, "about.intro");

  const educationTitle = t(lang, "about.education.title");
  const education = t(lang, "about.education"); 

  const interestsTitle = t(lang, "about.interests.title");
  const interestsItems = t(lang, "about.interests.items");

  const workTitle = t(lang, "about.work.title");
  const work = t(lang, "about.work");

  const languagesTitle = t(lang, "about.languages.title");
  const languagesItems = t(lang, "about.languages.items");

  const avatarSrc = "/about/avatar.jpg";

  return (
    <div className="about-page">
      {/* TOP PROFILE */}
      <div className="about-top">
         {/*<img className="about-avatar" src={avatarSrc} alt="Profile" />*/}

        <div className="about-top-text">
          <h2 className="about-name">{name}</h2>
          <p className="about-intro">{intro}</p>

        </div>
      </div>

      {/* DIVIDER */}
      <div className="about-divider" />

      {/* CARDS */}
      <div className="about-grid">

        <section className="about-card">
          <h3 className="about-card-title">{educationTitle}</h3>
          <div className="edu-block">
            <div className="edu-degree">{education?.degree}</div>
            <div className="edu-school">{education?.school}</div>
            <div className="edu-period">{education?.period}</div>
          </div>
        </section>

        <section className="about-card">
          <h3 className="about-card-title">{interestsTitle}</h3>
          <ul className="about-list">
            {Array.isArray(interestsItems) && interestsItems.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </section>

        <section className="about-card">
          <h3 className="about-card-title">{workTitle}</h3>

          <div className="work-header">
            <div className="work-role">{work?.role}</div>
            <div className="work-meta">
              {work?.company}
              {work?.type ? ` · ${work.type}` : ""}
            </div>
          </div>

          <ul className="about-list">
            {Array.isArray(work?.items) &&
              work.items.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </section>

        <section className="about-card">
          <h3 className="about-card-title">{languagesTitle}</h3>
          <ul className="about-list">
            {Array.isArray(languagesItems) && languagesItems.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
