import en from "./en.json";
import es from "./es.json";

const translations = { en, es };

export function t(lang, key, vars) {
  const dict = translations[lang] ?? translations.en;

  // Soporta paths tipo "projects.featured.title"
  const parts = key.split(".");
  let value = dict;

  for (const part of parts) {
    value = value?.[part];
    if (value === undefined) break;
  }

  if (value === undefined) return key;

  if (typeof value === "string" && vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replaceAll(`{${k}}`, String(v));
    }
  }

  return value;
}
