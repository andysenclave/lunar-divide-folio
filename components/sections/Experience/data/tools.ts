import type { Tool, SideType, StatItem } from '../types';

export const TOOLS: Record<SideType, Tool[]> = {
  engineering: [
    { name: 'VS Code', icon: '\uD83D\uDCBB', category: 'Editor' },
    { name: 'Git', icon: '\uD83D\uDD00', category: 'Version Control' },
    { name: 'Figma', icon: '\uD83C\uDFA8', category: 'Design' },
    { name: 'Postman', icon: '\uD83D\uDCEC', category: 'API Testing' },
    { name: 'Jira', icon: '\uD83D\uDCCB', category: 'Project Mgmt' },
    { name: 'Notion', icon: '\uD83D\uDCDD', category: 'Documentation' },
    { name: 'Terminal', icon: '\u2328\uFE0F', category: 'CLI' },
    { name: 'Chrome DevTools', icon: '\uD83D\uDD0D', category: 'Debugging' },
  ],
  adventure: [
    { name: 'DJI Osmo', icon: '\uD83D\uDCF9', category: 'Gimbal' },
    { name: 'Sony A6000', icon: '\uD83D\uDCF7', category: 'Camera' },
    { name: 'iPhone 13 Pro', icon: '\uD83D\uDCF1', category: 'Mobile' },
    { name: 'iPad Pro', icon: '\uD83D\uDCF1', category: 'Tablet' },
    { name: 'GoPro', icon: '\uD83C\uDFA5', category: 'Action Cam' },
    { name: 'Rode Mic', icon: '\uD83C\uDF99', category: 'Audio' },
  ],
};

export const STATS: StatItem[] = [
  { value: '12+', label: 'Years Experience' },
  { value: '35+', label: 'Projects Delivered' },
  { value: '3', label: 'Countries Worked' },
  { value: '15+', label: 'Engineers Mentored' },
];
