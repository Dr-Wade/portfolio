export type Locale = 'en' | 'fr';

/** A string in every locale — a missing translation fails the build. */
export type Localized = Record<Locale, string>;

/** Either language-neutral text (a name, a place) or a per-locale string. */
export type Text = string | Localized;

export interface Dictionary {
  /** <html lang> value, e.g. "en" or "fr". */
  htmlLang: string;
  /** Intl locale used to format dates, e.g. "en-GB". */
  dateLocale: string;
  meta: {
    title: string;
    description: string;
  };
  skipLink: string;
  nav: {
    /** Accessible label for the section navigation. */
    label: string;
    /** Accessible group label for the language switcher (e.g. "Choose language"). */
    languageSwitcherLabel: string;
  };
  intro: {
    /** Joins role and employer: "IT Consultant at MementoIT". */
    at: string;
    photoAlt: string;
    locationLabel: string;
    emailLabel: string;
    githubLabel: string;
    linkedinLabel: string;
    print: string;
  };
  sections: {
    portfolio: string;
    education: string;
    languages: string;
  };
  /** End of an ongoing period, e.g. "Jul 2022 – present". */
  present: string;
  notFound: {
    title: string;
    body: string;
    back: string;
  };
}
