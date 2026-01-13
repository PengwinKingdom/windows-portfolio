import "../styles/contact.css";
import { t } from "../i18n";

export default function ContactPage({ lang }) {
  const title = t(lang, "contact.title");
  const subtitle = t(lang, "contact.subtitle");
  const links = t(lang, "contact.links");

  if (!Array.isArray(links)) {
    return <div className="contact-page">No contact data</div>;
  }

  return (
    <div className="contact-page">
      <h2 className="contact-title">{title}</h2>

      {/* DIVIDER */}
      <div className="contact-divider" />


      <div className="contact-grid">
        {links.map((item) => (
          <a
            key={item.id}
            className="contact-icon"
            href={item.href}
            target={item.newTab ? "_blank" : undefined}
            rel={item.newTab ? "noreferrer" : undefined}
            aria-label={item.label}
            title={item.label}
          >
            <img className="contact-icon-img" src={item.icon} alt="" />
            <div className="contact-icon-label">{item.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
