import type { WorkExperience } from './types';

export const EXPERIENCE_DATA: WorkExperience[] = [
  {
    id: 'nous',
    period: 'Dec 2021 — Present',
    role: 'Senior Technical Lead',
    company: 'Nous Infosystems',
    location: 'Kolkata, India',
    type: 'engineering',
    current: true,
    description:
      'Leading frontend engineering for enterprise clients in financial services — Fitch Ratings (2021-2023) and Royal Bank of Canada (2023-Present). Managing 8 UI developers across 6 squads.',
    highlights: [
      'RBC: 8 UI devs across 6 squads, React + React Native + GraphQL subscriptions',
      'Fitch: Architected real-time meeting platform with Node.js + MongoDB',
      'CI/CD ownership with Jenkins, 85% test coverage gate, SonarQube integration',
      'GitHub Copilot Certification (GH-300) — 92% score',
    ],
    technologies: [
      'React',
      'React Native',
      'TypeScript',
      'GraphQL',
      'Node.js',
      'Spring Boot',
      'Jenkins',
      'Docker',
    ],
  },
  {
    id: 'localoi',
    period: 'Aug — Dec 2021',
    role: 'CTO & Co-founder',
    company: 'Localoi.in',
    location: 'Kolkata, India',
    type: 'engineering',
    description:
      'Co-founded hyperlocal e-commerce platform. Built 3-app ecosystem from scratch — consumer, merchant, and delivery partner apps.',
    highlights: [
      'Designed full-stack architecture: React Native, Next.js, NestJS',
      'Led team of 3 developers end-to-end',
      'Integrated Razorpay, Google Maps, WhatsApp Business API',
    ],
    technologies: [
      'React Native',
      'Next.js',
      'NestJS',
      'GraphQL',
      'MongoDB',
      'MySQL',
      'Docker',
    ],
  },
  {
    id: 'fincompare',
    period: '2019 — 2021',
    role: 'Senior UI Lead',
    company: 'FinCompare GmbH',
    location: 'Berlin, Germany',
    type: 'engineering',
    description:
      'Led team of 3 UI developers at FinTech startup. Built shared component library and SME onboarding flows.',
    highlights: [
      'Built reusable component library from scratch',
      'Implemented SME financing onboarding',
      'Met Dan Abramov at a Berlin hackathon',
    ],
    technologies: ['React', 'Redux', 'Styled Components', 'Node.js', 'Jest'],
  },
  {
    id: 'cognizant-oslo',
    period: '2016 — 2019',
    role: 'Onsite Coordinator & Team Lead',
    company: 'Cognizant (at Storebrand)',
    location: 'Oslo, Norway',
    type: 'engineering',
    description:
      'Led knowledge transition for React applications. Full ownership of TrackMyCase application with Express.js backend.',
    highlights: [
      'Full-stack ownership of customer portal',
      'Knowledge transition lead for React apps',
      'Real-time updates with MQTT',
    ],
    technologies: ['React', 'Redux Saga', 'Express.js', 'MQTT', 'CouchDB'],
  },
  {
    id: 'cognizant-india',
    period: '2013 — 2016',
    role: 'Junior → Analyst Developer',
    company: 'Cognizant Technology Solutions',
    location: 'Chennai → Kolkata',
    type: 'engineering',
    description:
      'Started career in US Healthcare, moved to European Insurance (Belgium). Hackathon champion and Center of Excellence member.',
    highlights: [
      'Progressed from trainee to analyst',
      'Built mobile apps for innovation demos',
      'Center of Excellence member',
    ],
    technologies: ['JavaScript', 'AngularJS', 'Java', 'Cordova', 'jQuery'],
  },
];
