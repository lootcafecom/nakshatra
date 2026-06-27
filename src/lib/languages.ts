export interface Language {
  code: string;
  label: string;
  native: string;
}

// Priority order from the master plan, section 4
export const LANGUAGES: Language[] = [
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "en", label: "English", native: "English" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
];

export const DEFAULT_LANGUAGE = "en";
