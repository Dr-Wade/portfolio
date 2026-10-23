/**
 * All CV content, in one place.
 *
 * Text fields take either a plain string (names, places — same in every
 * language) or `{ en, fr }`. The `Localized` type requires both, so a missing
 * translation fails the build.
 *
 * Dates are 'YYYY' or 'YYYY-MM'.
 */
import type { Localized, Text } from '../i18n';

export interface CvEntry {
  /** Role, or degree for education. */
  title: Text;
  /** Employer, client or school. */
  org: Text;
  url?: string;
  location?: Text;
  start: string;
  /** null = ongoing ("present"); omitted = the start date alone. */
  end?: string | null;
  points?: Text[];
}

export interface Project {
  client: string;
  description: Localized;
  role?: Localized;
  /** Optional detail for long-running engagements. */
  points?: Localized[];
  /** Keep `points` in the data but don't show them. */
  hidePoints?: boolean;
  /** Used only to order the portfolio (most recent first) — never displayed. */
  start: string;
  /** null = ongoing, sorted first. */
  end: string | null;
}

export const profile = {
  name: 'Edward Tombre',
  role: { en: 'IT Consultant', fr: 'Consultant IT' } satisfies Localized,
  company: { name: 'MementoIT', url: 'https://mementoit.no' },
  location: 'Nancy, France',
  email: 'edward.tombre@gmail.com',
  github: 'Dr-Wade',
  linkedin: 'edward-tombre',
};

const fullStack: Localized = { en: 'Full-stack developer', fr: 'Développeur full-stack' };

const byRecency = (a: Project, b: Project) =>
  (b.end ?? '9999').localeCompare(a.end ?? '9999') || b.start.localeCompare(a.start);

export const projects: Project[] = ([
  {
    client: 'Valgdirektoratet',
    description: {
      en: 'Developed valgresultat.no, where Norway follows its election results as the votes are counted, and the election protocol solution that safeguards the integrity of the vote.',
      fr: 'Développement de valgresultat.no, où la Norvège suit les résultats de ses élections au fil du dépouillement, et de la solution de procès-verbaux électoraux qui garantit l’intégrité du scrutin.',
    },
    role: fullStack,
    start: '2023-08',
    end: '2023-12',
  },
  {
    client: 'UnoX',
    description: {
      en: 'Real-time features for the car wash service of UnoX, a major Norwegian fuel station chain.',
      fr: 'Fonctionnalités temps réel pour le service de lavage auto d’UnoX, grande chaîne de stations-service norvégienne.',
    },
    role: { en: 'Back-end developer', fr: 'Développeur back-end' },
    start: '2022-01',
    end: '2022-08',
  },
  {
    client: 'Gate Zero',
    description: {
      en: 'Mobile app talking to an Unreal Engine 4 game in real time, backed by PlayFab, from the app down to the cloud infrastructure.',
      fr: 'Application mobile dialoguant en temps réel avec un jeu Unreal Engine 4, adossée à PlayFab, de l’app jusqu’à l’infrastructure cloud.',
    },
    role: fullStack,
    start: '2020-11',
    end: '2022-04',
  },
  {
    client: 'BCC Media',
    description: {
      en: 'Real-time platform that lets viewers take part in live TV broadcasts, built to hold up under heavy load.',
      fr: 'Plateforme temps réel qui permet aux téléspectateurs de participer aux émissions en direct, conçue pour tenir une forte charge.',
    },
    role: fullStack,
    start: '2020-03',
    end: '2021-03',
  },
  {
    client: 'Raskenlund',
    description: {
      en: 'One platform to run video streaming at large scale, updated in real time.',
      fr: 'Une plateforme unique pour piloter la diffusion vidéo à grande échelle, mise à jour en temps réel.',
    },
    role: fullStack,
    start: '2020-09',
    end: '2020-11',
  },
  {
    client: 'Oslofjord AS',
    description: {
      en: 'Efficient reservation planning: a WordPress calendar that shows Dynamics 365 bookings at a glance.',
      fr: 'Planification efficace des réservations : un calendrier WordPress qui affiche d’un coup d’œil les réservations de Dynamics 365.',
    },
    role: fullStack,
    start: '2019-12',
    end: '2020-03',
  },
  {
    client: 'Ådalen Truck AS',
    description: {
      en: 'Making Dynamics 365 the hub of the business, and building what plugs into it.',
      fr: 'Faire de Dynamics 365 le cœur de l’entreprise, et construire tout ce qui s’y branche.',
    },
    role: { en: 'CTO', fr: 'CTO' },
    hidePoints: true,
    points: [
      {
        en: 'Built a customer portal, on web and mobile, on top of Dynamics 365.',
        fr: 'Création d’un portail client, web et mobile, adossé à Dynamics 365.',
      },
      {
        en: 'Custom-built Claude integration for the CRM: sellers work with Dynamics 365 in plain language, under their own permissions.',
        fr: 'Intégration Claude développée sur mesure pour le CRM : les vendeurs travaillent avec Dynamics 365 en langage naturel, avec leurs propres droits.',
      },
      {
        en: 'Connected Dynamics 365 and Tripletex both ways, so sales and accounting work from the same data.',
        fr: 'Synchronisation bidirectionnelle entre Dynamics 365 et Tripletex, pour que ventes et comptabilité partagent les mêmes données.',
      },
    ],
    // First project in Oct 2019 (course registration plugin); CTO today.
    start: '2019-10',
    end: null,
  },
  {
    client: 'Concent AS',
    description: {
      en: 'A community portal with forum and blogs on Dynamics 365, and the CRM connected to the accounting systems to end double entry.',
      fr: 'Un portail communautaire avec forum et blogs sur Dynamics 365, et un CRM connecté aux systèmes comptables pour en finir avec la double saisie.',
    },
    role: fullStack,
    start: '2019-09',
    end: '2019-11',
  },
  {
    client: 'SSSF',
    description: {
      en: 'A digital library that brings books and publications online.',
      fr: 'Une bibliothèque numérique qui met livres et publications en ligne.',
    },
    role: fullStack,
    start: '2019-03',
    end: '2019-07',
  },
] satisfies Project[]).sort(byRecency);

export const education: CvEntry[] = [
  {
    title: { en: 'Engineering programme', fr: 'Cycle ingénieur' },
    org: 'Télécom Paris',
    location: 'Paris, France',
    start: '2017',
    end: '2020',
  },
  {
    title: {
      en: 'Preparatory classes (CPGE), mathematics and physics',
      fr: 'Classes préparatoires (CPGE), mathématiques et physique',
    },
    org: 'Lycée Henri Poincaré',
    location: 'Nancy, France',
    start: '2015',
    end: '2017',
  },
  {
    title: { en: 'Baccalauréat with honours', fr: 'Baccalauréat avec mention' },
    org: 'Lycée Saint-Pierre Fourier',
    location: 'Lunéville, France',
    start: '2012',
    end: '2015',
  },
];

export const languages: { name: Localized; level: Localized }[] = [
  { name: { en: 'French', fr: 'Français' }, level: { en: 'Native', fr: 'Langue maternelle' } },
  { name: { en: 'English', fr: 'Anglais' }, level: { en: 'Fluent', fr: 'Courant' } },
  { name: { en: 'Norwegian', fr: 'Norvégien' }, level: { en: 'Fluent', fr: 'Courant' } },
  { name: { en: 'German', fr: 'Allemand' }, level: { en: 'Working knowledge', fr: 'Bonnes notions' } },
];
