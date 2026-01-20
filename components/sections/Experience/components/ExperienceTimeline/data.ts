import type { WorkExperience } from './types';

export const EXPERIENCE_DATA: WorkExperience[] = [
  {
    id: 'cognizant-2',
    period: '2021 — Present',
    role: 'Senior Technical Lead',
    company: 'Cognizant Technology Solutions',
    location: 'Kolkata, India',
    type: 'engineering',
    current: true,
    description:
      'Leading multiple engineering teams delivering enterprise solutions for global clients in finance and ratings. Architecture ownership, CI/CD implementation, and mentoring engineers.',
    highlights: [
      'Led 3-5 developer teams across multiple workstreams',
      'Enterprise delivery for AXA, Allianz, S&P Global',
      'Established coding standards and review culture',
    ],
    technologies: ['React', 'Node.js', 'GraphQL', 'AWS', 'GitHub Actions', 'Docker'],
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
    id: 'storebrand',
    period: '2016 — 2019',
    role: 'UI Developer & Knowledge Lead',
    company: 'Storebrand ASA',
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
    id: 'cognizant-1',
    period: '2013 — 2016',
    role: 'Software Engineer → Programmer Analyst',
    company: 'Cognizant Technology Solutions',
    location: 'Chennai → Kolkata, India',
    type: 'engineering',
    description:
      'Started career in healthcare domain, moved to European Insurance vertical. Hackathon champion and COE member.',
    highlights: [
      'Progressed from trainee to analyst',
      'Built mobile apps for innovation demos',
      'Center of Excellence member',
    ],
    technologies: ['JavaScript', 'AngularJS', 'Java', 'Cordova', 'jQuery'],
  },
];
