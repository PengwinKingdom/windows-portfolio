import en from "./en.json";
import es from "./es.json";

export const dict = { en, es };

/**
 * t(lang, "assistant.hello", { section: "Projects" })
 */
export function t(lang, key, vars = {}) {
  const data = dict[lang] ?? dict.en;

  const value = key
    .split(".")
    .reduce((acc, part) => (acc && acc[part] != null ? acc[part] : null), data);

  if (typeof value !== "string") return key; // fallback si no existe

  
  return value.replace(/\{\{(\w+)\}\}/g, (_, name) => {
    return vars[name] ?? `{{${name}}}`;
  });
}
