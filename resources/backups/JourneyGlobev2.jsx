'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

// ============================================
// THEME COLORS
// ============================================
const COLORS = {
  bg: '#0A0E27',
  bgSecondary: '#1A1F3A',
  bgCard: 'rgba(26, 31, 58, 0.95)',
  divider: '#2A2F4A',
  cyan: '#00D9FF',
  cyanGlow: 'rgba(0, 217, 255, 0.3)',
  orange: '#FF6B35',
  orangeGlow: 'rgba(255, 107, 53, 0.3)',
  gold: '#FFD700',
  text: '#FFFFFF',
  textSecondary: '#B0B9C6',
  textTertiary: '#7A8396',
  ocean: '#0D1A2D',
  land: '#1E4D5C',
  landStroke: '#2A6A7A',
  graticule: 'rgba(42, 106, 122, 0.1)',
  flightPath: 'rgba(255, 255, 255, 0.6)',
  flightGlow: 'rgba(255, 255, 255, 0.3)',
};

// ============================================
// JOURNEY DATA - REVERSED (2026 → 2013)
// ============================================
const LOCATIONS = [
  {
    id: 'kolkata-2',
    name: 'Kolkata',
    country: 'India',
    coords: [88.3639, 22.5726],
    period: '2021 – Present',
    era: 'The Return',
    year: 2026,
    experiences: [
      {
        id: 'cognizant-lead',
        type: 'engineering',
        icon: '👔',
        title: 'Senior Technical Lead',
        subtitle: 'Cognizant Technology Solutions',
        desc: 'Leading multiple engineering teams. Enterprise delivery for global clients in finance and ratings.',
        date: '2021 – Present',
        content: {
          intro:
            'Returned to where it started — but at a completely different level.',
          body: '<p>Rejoining Cognizant as Senior Technical Lead was coming full circle.</p><h3>Current Responsibilities</h3><ul><li>Leading 3-5 developer teams</li><li>Architecture ownership</li><li>CI/CD and DevOps</li><li>Mentoring engineers</li></ul>',
          tags: ['Leadership', 'Enterprise', 'Architecture', 'Mentoring'],
        },
      },
      {
        id: 'localoi',
        type: 'engineering',
        icon: '🏪',
        title: 'Building Localoi',
        subtitle: 'Entrepreneurial Venture',
        desc: 'Side venture connecting local businesses with communities through technology.',
        date: '2022 – Present',
        content: {
          intro: 'The entrepreneurial itch needed scratching.',
          body: '<p>Localoi emerged from observing how local businesses struggle against platform giants.</p>',
          tags: ['Startup', 'Entrepreneurship', 'Product'],
        },
      },
      {
        id: 'andys-enclave',
        type: 'adventure',
        icon: '🎬',
        title: "Andy's Enclave",
        subtitle: 'Content Creation Hub',
        desc: 'Travel vlogs, audio stories, photography. Darjeeling as creative sanctuary.',
        date: 'Ongoing',
        featured: true,
        places: ['Darjeeling', 'India'],
        hasVideo: true,
        content: {
          intro: 'Where the adventure side gets its voice.',
          body: "<p>Andy's Enclave is where I channel years of travel into content.</p><h3>Content Streams</h3><ul><li>Travel Vlogs</li><li>Audio Stories</li><li>Photography</li></ul>",
          tags: ['YouTube', 'Content Creation', 'Darjeeling', 'Photography'],
        },
      },
    ],
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    coords: [13.405, 52.52],
    period: '2019 – 2021',
    era: 'The Startup Phase',
    year: 2019,
    experiences: [
      {
        id: 'fincompare',
        type: 'engineering',
        icon: '🚀',
        title: 'Senior UI Lead',
        subtitle: 'FinCompare, Berlin',
        desc: 'Led team of 3 UI developers at FinTech startup. Built shared component library.',
        date: '2019 – 2021',
        featured: true,
        funFact: 'Met Dan Abramov at a hackathon! 🎉',
        content: {
          intro: 'Resigned from Cognizant. Joined the Berlin startup scene.',
          body: '<p>FinCompare was transforming German banking.</p><h3>What I Built</h3><ul><li>Component Library</li><li>SME Onboarding</li><li>Marketing Pages</li></ul>',
          tags: [
            'FinTech',
            'Leadership',
            'Component Library',
            'Startup',
            'Berlin',
          ],
        },
      },
      {
        id: 'krakow-offsite',
        type: 'adventure',
        icon: '🏆',
        title: 'Krakow Company Offsite',
        subtitle: '6 Days in Poland',
        desc: 'Team building — rowing, surfing, ideation sessions, exploring Krakow.',
        date: '2019',
        places: ['Krakow', 'Poland'],
        hasPhotos: true,
        content: {
          intro: 'Six days of team building in Poland.',
          body: '<p>The FinCompare offsite in Krakow was legendary.</p>',
          tags: ['Team Building', 'Krakow', 'Poland'],
        },
      },
      {
        id: 'berlin-life',
        type: 'adventure',
        icon: '🎄',
        title: 'Berlin Life',
        subtitle: 'Christmas Markets & City Culture',
        desc: 'Living the Berlin experience — Christmas markets, parties, city energy.',
        date: '2019 – 2021',
        places: ['Berlin', 'Germany'],
        content: {
          intro: 'Berlin is unlike any other city.',
          body: '<p>The Christmas markets were magical — Gendarmenmarkt, Kreuzberg, hot Glühwein.</p>',
          tags: ['Berlin', 'Christmas Markets', 'Culture'],
        },
      },
    ],
  },
  {
    id: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    coords: [10.7522, 59.9139],
    period: '2016 – 2019',
    era: 'The Scandinavian Chapter',
    year: 2016,
    experiences: [
      {
        id: 'storebrand',
        type: 'engineering',
        icon: '⚡',
        title: 'UI Developer & Knowledge Lead',
        subtitle: 'Storebrand, Norway',
        desc: 'Led knowledge transition for React apps. Full ownership of TrackMyCase.',
        date: '2016 – 2019',
        content: {
          intro: 'Norway changed everything — technically and personally.',
          body: '<p>Traveled to Oslo for Knowledge Transition.</p><h3>TrackMyCase — Full Ownership</h3><p>Express.js, REST APIs, MQTT, CouchDB.</p>',
          tags: ['React', 'Redux Saga', 'Express.js', 'MQTT', 'Full Stack'],
        },
      },
      {
        id: 'europe-travels-1',
        type: 'adventure',
        icon: '✈️',
        title: 'Conquering Europe',
        subtitle: 'Brussels, Paris, Amsterdam & More',
        desc: 'First European adventures — Belgium, France, Netherlands.',
        date: '2016 – 2017',
        places: ['Brussels', 'Paris', 'Amsterdam'],
        hasPhotos: true,
        content: {
          intro:
            'Living in Europe meant easy access to incredible destinations.',
          body: '<p>Brussels Grand Place, Paris Eiffel Tower, Amsterdam canals.</p>',
          tags: ['Brussels', 'Paris', 'Amsterdam', 'Europe'],
        },
      },
      {
        id: 'skydiving',
        type: 'adventure',
        icon: '🪂',
        title: 'Skydiving Over Hemsedal',
        subtitle: '15,000 Feet Above Norway',
        desc: 'The bucket list moment — freefall over Norwegian mountains.',
        date: '2017',
        featured: true,
        places: ['Hemsedal', 'Norway'],
        hasVideo: true,
        content: {
          intro: '15,000 feet. Norwegian mountains below.',
          body: '<p>Hemsedal, Norway. Standing at the edge of the plane. Then the jump — freefall at 200 km/h.</p>',
          tags: ['Skydiving', 'Bucket List', 'Norway', 'Adrenaline'],
        },
      },
      {
        id: 'norway-explore',
        type: 'adventure',
        icon: '🌊',
        title: 'Exploring Norway',
        subtitle: 'Bergen, Lillehammer & Beyond',
        desc: 'Deep dives into Norwegian beauty — fjords, mountains.',
        date: '2016 – 2019',
        places: ['Bergen', 'Lillehammer', 'Norwegian Fjords'],
        hasPhotos: true,
        content: {
          intro: 'Norway itself was an endless adventure.',
          body: '<p>Bergen with colorful houses, Lillehammer Olympic legacy.</p>',
          tags: ['Bergen', 'Lillehammer', 'Fjords', 'Norway'],
        },
      },
    ],
  },
  {
    id: 'kolkata-1',
    name: 'Kolkata',
    country: 'India',
    coords: [88.3639, 22.5726],
    period: '2015 – 2016',
    era: 'Building Momentum',
    year: 2015,
    experiences: [
      {
        id: 'cts-kolkata',
        type: 'engineering',
        icon: '🏢',
        title: 'European Insurance & Innovation',
        subtitle: 'Cognizant - Insurance Europe',
        desc: 'Worked with AXA, Allianz, Zurich. Built mobile apps. Hackathon champion.',
        date: '2015 – 2016',
        content: {
          intro: 'This phase transformed me from developer to innovator.',
          body: '<p>European Insurance vertical with major clients.</p><h3>Innovation & Hackathons</h3><p>Native and hybrid mobile apps for demos.</p>',
          tags: ['Insurance', 'AXA', 'Allianz', 'Mobile Apps', 'Hackathons'],
        },
      },
      {
        id: 'sikkim-trek',
        type: 'adventure',
        icon: '🏔️',
        title: 'Sikkim & North Bengal Trek',
        subtitle: 'Into the Himalayas',
        desc: 'Epic trekking through the Himalayas. Extensive photography.',
        date: '2016',
        featured: true,
        places: ['Sikkim', 'North Bengal', 'Darjeeling'],
        hasPhotos: true,
        content: {
          intro: 'My first real adventure — trekking through the Himalayas.',
          body: '<p>Epic excursion through Sikkim and North Bengal. Prayer flags, monasteries, snow-capped peaks.</p>',
          tags: ['Trekking', 'Himalayas', 'Sikkim', 'Photography'],
        },
      },
    ],
  },
  {
    id: 'chennai',
    name: 'Chennai',
    country: 'India',
    coords: [80.2707, 13.0827],
    period: '2013 – 2015',
    era: 'The Beginning',
    year: 2013,
    experiences: [
      {
        id: 'cts-chennai',
        type: 'engineering',
        icon: '💻',
        title: 'Where It All Began',
        subtitle: 'Cognizant Technology Solutions',
        desc: 'Started as trainee, grew to Software Engineer. Healthcare domain. COE member.',
        date: '2013 – 2015',
        content: {
          intro: 'Chennai is where my professional journey began.',
          body: '<p>Joined Cognizant as trainee, progressed to Software Engineer.</p><h3>Key Experiences</h3><ul><li>Healthcare domain</li><li>Center of Excellence member</li></ul>',
          tags: ['Cognizant', 'Healthcare', 'COE', 'First Job'],
        },
      },
      {
        id: 'chennai-explore',
        type: 'adventure',
        icon: '🏖️',
        title: 'South India Beginnings',
        subtitle: 'First Adventures',
        desc: 'Beach trips, Chennai zoo, weekend escape to Pondicherry.',
        date: '2013 – 2015',
        places: ['Marina Beach', 'Pondicherry', 'Chennai Zoo'],
        content: {
          intro: 'Not much adventure yet, but the seeds were planted.',
          body: '<p>Weekend trips to beaches, exploring Chennai, Pondicherry trip.</p>',
          tags: ['Chennai', 'Pondicherry', 'Beaches'],
        },
      },
    ],
  },
];

// Marker locations
const MARKER_LOCATIONS = [
  { id: 'chennai', coords: [80.2707, 13.0827], type: 'engineering' },
  { id: 'kolkata', coords: [88.3639, 22.5726], type: 'engineering' },
  { id: 'oslo', coords: [10.7522, 59.9139], type: 'engineering' },
  { id: 'berlin', coords: [13.405, 52.52], type: 'engineering' },
  { id: 'darjeeling', coords: [88.2663, 27.041], type: 'adventure' },
];

// ============================================
// BUILD SCROLL TIMELINE (Slower transitions)
// ============================================
const buildScrollTimeline = () => {
  const timeline = [];
  let currentProgress = 0;
  const progressPerLocation = 0.14;
  const transitionTime = 0.05;
  const cardRevealDelay = 0.018;

  LOCATIONS.forEach((loc, locIndex) => {
    const startProgress = currentProgress;

    if (locIndex > 0) {
      const prevLoc = LOCATIONS[locIndex - 1];
      timeline.push({
        progress: startProgress,
        scale: 1.4,
        rotation: [
          -(prevLoc.coords[0] + loc.coords[0]) / 2,
          -(prevLoc.coords[1] + loc.coords[1]) / 2,
        ],
        locationId: null,
        year: loc.year + 1,
        era: 'Traveling...',
        cardVisibility: [],
        isTransition: true,
        flightFrom: prevLoc.coords,
        flightTo: loc.coords,
      });
      timeline.push({
        progress: startProgress + transitionTime * 0.5,
        scale: 1.2,
        rotation: [
          -(prevLoc.coords[0] * 0.3 + loc.coords[0] * 0.7),
          -(prevLoc.coords[1] * 0.3 + loc.coords[1] * 0.7),
        ],
        locationId: null,
        year: loc.year,
        era: 'Traveling...',
        cardVisibility: [],
        isTransition: true,
        flightFrom: prevLoc.coords,
        flightTo: loc.coords,
      });
      currentProgress = startProgress + transitionTime;
    }

    const dwellStart = currentProgress;
    const expCount = loc.experiences.length;

    timeline.push({
      progress: dwellStart,
      scale: 1.8,
      rotation: [-loc.coords[0], -loc.coords[1]],
      locationId: loc.id,
      year: loc.year,
      era: loc.era,
      cardVisibility: [],
      isTransition: false,
    });

    for (let i = 0; i < expCount; i++) {
      const cardProgress = dwellStart + 0.02 + i * cardRevealDelay;
      const cardsToShow = Array.from({ length: i + 1 }, (_, j) => j);
      const yearOffset = loc.id === 'kolkata-2' ? 5 : loc.id === 'oslo' ? 3 : 2;
      const yearInterp = loc.year - Math.floor((i / expCount) * yearOffset);

      timeline.push({
        progress: Math.min(
          cardProgress,
          dwellStart + progressPerLocation - 0.015,
        ),
        scale: 2.2,
        rotation: [-loc.coords[0], -loc.coords[1]],
        locationId: loc.id,
        year: Math.max(
          yearInterp,
          parseInt(loc.period.split('–')[0]) || loc.year,
        ),
        era: loc.era,
        cardVisibility: cardsToShow,
        isTransition: false,
      });
    }

    timeline.push({
      progress: dwellStart + progressPerLocation - 0.01,
      scale: 2.2,
      rotation: [-loc.coords[0], -loc.coords[1]],
      locationId: loc.id,
      year: parseInt(loc.period.split('–')[0]) || loc.year,
      era: loc.era,
      cardVisibility: loc.experiences.map((_, i) => i),
      isTransition: false,
    });

    currentProgress = dwellStart + progressPerLocation;
  });

  timeline.push({
    progress: 0.98,
    scale: 1.1,
    rotation: [-82, -22],
    locationId: null,
    year: 2013,
    era: 'Where It All Began',
    cardVisibility: [],
    isTransition: false,
  });

  return timeline;
};

const SCROLL_TIMELINE = buildScrollTimeline();

// ============================================
// UTILITY FUNCTIONS
// ============================================
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const generateArcPoints = (start, end, numPoints = 60) => {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lng = lerp(start[0], end[0], t);
    const lat = lerp(start[1], end[1], t);
    const arcHeight = Math.sin(t * Math.PI) * 12;
    points.push([lng, lat + arcHeight]);
  }
  return points;
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function JourneyGlobe() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentEra, setCurrentEra] = useState('The Return');
  const [isAdventureMode, setIsAdventureMode] = useState(false);
  const [modalExp, setModalExp] = useState(null);
  const [flightData, setFlightData] = useState(null);

  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const projectionRef = useRef(null);
  const baseScaleRef = useRef(null);

  // Initialize D3 Globe
  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const baseScale = Math.min(width, height) / 2.4;
    baseScaleRef.current = baseScale;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
    svg.selectAll('*').remove();

    const projection = d3
      .geoOrthographic()
      .scale(baseScale)
      .rotate([-88, -22])
      .translate([width / 2, height / 2]);
    projectionRef.current = projection;

    const path = d3.geoPath().projection(projection);
    const globe = svg.append('g');

    globe
      .append('circle')
      .attr('class', 'ocean')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())
      .style('fill', COLORS.ocean);

    globe
      .append('path')
      .datum(d3.geoGraticule().step([15, 15]))
      .attr('d', path)
      .style('fill', 'none')
      .style('stroke', COLORS.graticule)
      .style('stroke-width', 0.5);

    const countriesGroup = globe.append('g').attr('class', 'countries');
    const flightGroup = globe.append('g').attr('class', 'flights');
    const markersGroup = globe.append('g').attr('class', 'markers');

    // Load world map and correct India map
    Promise.all([
      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
      d3
        .json(
          'https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@8d907bc/topojson/india.json',
        )
        .catch(() => null),
    ]).then(([world, indiaData]) => {
      // Get world countries excluding India (id 356) if we have India data
      const worldFeatures = topojson
        .feature(world, world.objects.countries)
        .features.filter((f) =>
          indiaData ? f.id !== '356' && f.id !== 356 : true,
        );

      // Get India with correct boundaries - merge all districts into single country shape
      let indiaFeatures = [];
      if (indiaData && indiaData.objects) {
        const objectKey = Object.keys(indiaData.objects)[0];
        if (objectKey) {
          // Use topojson.merge to combine all districts/states into one unified India boundary
          const mergedIndia = topojson.merge(
            indiaData,
            indiaData.objects[objectKey].geometries,
          );
          indiaFeatures = [
            {
              type: 'Feature',
              geometry: mergedIndia,
              properties: { name: 'India' },
            },
          ];
        }
      }

      // Combine: world (minus India) + correct India (or just world if India failed)
      const allFeatures = [...worldFeatures, ...indiaFeatures];

      countriesGroup
        .selectAll('path')
        .data(allFeatures)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', COLORS.land)
        .style('stroke', COLORS.landStroke)
        .style('stroke-width', 0.5);

      MARKER_LOCATIONS.forEach((loc) => {
        const g = markersGroup.append('g').attr('data-id', loc.id);
        const color = loc.type === 'adventure' ? COLORS.orange : COLORS.cyan;
        g.append('circle')
          .attr('r', 16)
          .style('fill', color)
          .style('opacity', 0.12)
          .style('filter', 'blur(5px)');
        g.append('circle')
          .attr('class', 'pulse')
          .attr('r', 6)
          .style('fill', 'none')
          .style('stroke', color)
          .style('stroke-width', 1.5)
          .style('opacity', 0);
        g.append('circle')
          .attr('r', 4)
          .style('fill', color)
          .style('stroke', '#fff')
          .style('stroke-width', 1.5);
      });

      const pulse = () => {
        markersGroup
          .selectAll('.pulse')
          .transition()
          .duration(1800)
          .attr('r', 18)
          .style('opacity', 0.5)
          .transition()
          .duration(1800)
          .attr('r', 6)
          .style('opacity', 0)
          .on('end', pulse);
      };
      pulse();
    });

    const handleResize = () => {
      const w = window.innerWidth,
        h = window.innerHeight;
      baseScaleRef.current = Math.min(w, h) / 2.4;
      svg.attr('width', w).attr('height', h);
      projection.translate([w / 2, h / 2]);
      globe
        .select('.ocean')
        .attr('cx', w / 2)
        .attr('cy', h / 2);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateGlobe = useCallback((flightInfo) => {
    if (!projectionRef.current || !svgRef.current) return;

    const projection = projectionRef.current;
    const path = d3.geoPath().projection(projection);
    const svg = d3.select(svgRef.current);

    svg.selectAll('.countries path').attr('d', path);
    svg.select('.ocean').attr('r', projection.scale());

    const rot = projection.rotate();
    MARKER_LOCATIONS.forEach((loc) => {
      const coords = projection(loc.coords);
      const visible =
        d3.geoDistance(loc.coords, [-rot[0], -rot[1]]) < Math.PI / 2;
      svg
        .select(`[data-id="${loc.id}"]`)
        .attr('transform', `translate(${coords[0]},${coords[1]})`)
        .style('opacity', visible ? 1 : 0);
    });

    // Flight path rendering
    const flightGroup = svg.select('.flights');
    flightGroup.selectAll('*').remove();

    if (
      flightInfo &&
      flightInfo.from &&
      flightInfo.to &&
      flightInfo.progress > 0
    ) {
      const arcPoints = generateArcPoints(flightInfo.from, flightInfo.to, 60);
      const visiblePoints = arcPoints.filter(
        (p) => d3.geoDistance(p, [-rot[0], -rot[1]]) < Math.PI / 2,
      );

      if (visiblePoints.length >= 2) {
        const lineGen = d3
          .line()
          .x((d) => projection(d)[0])
          .y((d) => projection(d)[1])
          .curve(d3.curveCatmullRom);
        const pointsToShow = Math.floor(
          visiblePoints.length * Math.min(flightInfo.progress, 1),
        );
        const trailPoints = visiblePoints.slice(0, pointsToShow);

        if (trailPoints.length >= 2) {
          // Trail segments
          for (let i = 0; i < 6; i++) {
            const start = Math.floor((trailPoints.length * i) / 6);
            const end = Math.floor((trailPoints.length * (i + 1)) / 6);
            const seg = trailPoints.slice(start, end + 1);
            if (seg.length >= 2) {
              flightGroup
                .append('path')
                .datum(seg)
                .attr('d', lineGen)
                .style('fill', 'none')
                .style('stroke', COLORS.flightPath)
                .style('stroke-width', 2 - i * 0.25)
                .style('opacity', 0.15 + (i / 6) * 0.5)
                .style('stroke-linecap', 'round');
            }
          }

          // Plane dot
          const currentPos = trailPoints[trailPoints.length - 1];
          const proj = projection(currentPos);
          flightGroup
            .append('circle')
            .attr('cx', proj[0])
            .attr('cy', proj[1])
            .attr('r', 10)
            .style('fill', COLORS.flightGlow)
            .style('filter', 'blur(5px)');
          flightGroup
            .append('circle')
            .attr('cx', proj[0])
            .attr('cy', proj[1])
            .attr('r', 4)
            .style('fill', '#fff')
            .style('stroke', COLORS.cyan)
            .style('stroke-width', 2);

          // Cloud trail
          for (let c = 1; c <= 4; c++) {
            const idx = Math.max(0, trailPoints.length - 1 - c * 4);
            if (trailPoints[idx]) {
              const cp = projection(trailPoints[idx]);
              flightGroup
                .append('circle')
                .attr('cx', cp[0])
                .attr('cy', cp[1])
                .attr('r', 4 - c * 0.7)
                .style('fill', 'rgba(255,255,255,' + (0.4 - c * 0.08) + ')')
                .style('filter', 'blur(3px)');
            }
          }
        }
      }
    }
  }, []);

  // Scroll handler
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight - window.innerHeight;
        const relativeScroll = window.scrollY - sectionTop + window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(1, relativeScroll / sectionHeight),
        );

        setScrollProgress(progress);

        let curr = SCROLL_TIMELINE[0],
          next = SCROLL_TIMELINE[1],
          t = 0;
        for (let i = 0; i < SCROLL_TIMELINE.length - 1; i++) {
          if (
            progress >= SCROLL_TIMELINE[i].progress &&
            progress <= SCROLL_TIMELINE[i + 1].progress
          ) {
            curr = SCROLL_TIMELINE[i];
            next = SCROLL_TIMELINE[i + 1];
            t = (progress - curr.progress) / (next.progress - curr.progress);
            break;
          }
        }
        if (progress >= SCROLL_TIMELINE[SCROLL_TIMELINE.length - 1].progress) {
          curr = next = SCROLL_TIMELINE[SCROLL_TIMELINE.length - 1];
          t = 1;
        }

        const ease = easeOutQuart(t);

        if (projectionRef.current && baseScaleRef.current) {
          const scale = lerp(curr.scale, next.scale, ease);
          const rotLng = lerp(curr.rotation[0], next.rotation[0], ease);
          const rotLat = lerp(curr.rotation[1], next.rotation[1], ease);
          projectionRef.current.scale(baseScaleRef.current * scale);
          projectionRef.current.rotate([rotLng, rotLat]);

          const fInfo =
            curr.isTransition || next.isTransition
              ? {
                  from: (curr.isTransition ? curr : next).flightFrom,
                  to: (curr.isTransition ? curr : next).flightTo,
                  progress: curr.isTransition ? ease : 0,
                }
              : null;

          setFlightData(fInfo);
          updateGlobe(fInfo);
        }

        setCurrentYear(Math.round(lerp(curr.year, next.year, ease)));
        setCurrentEra(next.era || curr.era || '');

        const activeLocId = next.locationId || curr.locationId;
        setCurrentLocation(
          activeLocId ? LOCATIONS.find((l) => l.id === activeLocId) : null,
        );
        setVisibleCards(next.cardVisibility || curr.cardVisibility || []);

        const activeLoc = LOCATIONS.find((l) => l.id === activeLocId);
        setIsAdventureMode(
          activeLoc?.experiences.some((e) => e.type === 'adventure') || false,
        );

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateGlobe]);

  const engineeringCards =
    currentLocation?.experiences.filter((e) => e.type === 'engineering') || [];
  const adventureCards =
    currentLocation?.experiences.filter((e) => e.type === 'adventure') || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes pulse-line { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes bounce { 0%, 100% { transform: rotate(45deg) translate(0, 0); } 50% { transform: rotate(45deg) translate(3px, 3px); } }
        @keyframes plane-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>

      <div style={styles.topProgress}>
        <motion.div
          style={styles.topProgressFill}
          animate={{ scaleX: scrollProgress }}
        />
      </div>

      <section style={styles.introSection}>
        <h1 style={styles.introTitle}>THE JOURNEY</h1>
        <p style={styles.introSubtitle}>
          From Present Day Back to the Beginning
        </p>
        <p style={styles.introYears}>2026 — 2013</p>
        <div style={styles.introScroll}>
          <span>SCROLL TO BEGIN</span>
          <div style={styles.introLine} />
        </div>
      </section>

      <section ref={sectionRef} style={styles.journeySection}>
        <div style={styles.globeSticky}>
          <div
            style={{
              ...styles.sectionBg,
              background: isAdventureMode
                ? `radial-gradient(ellipse 100% 80% at 50% 50%, ${COLORS.orangeGlow}15 0%, transparent 60%), linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgSecondary} 50%, ${COLORS.bg} 100%)`
                : `radial-gradient(ellipse 100% 80% at 50% 50%, ${COLORS.cyanGlow}10 0%, transparent 60%), linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgSecondary} 50%, ${COLORS.bg} 100%)`,
            }}
          />
          <div style={styles.stars} />

          <div style={styles.yearDisplay}>
            <motion.div
              style={{
                ...styles.yearNumber,
                opacity: scrollProgress > 0.02 ? 0.4 : 0.15,
              }}
            >
              {currentYear}
            </motion.div>
            <motion.div
              style={styles.yearEra}
              animate={{ opacity: scrollProgress > 0.02 ? 1 : 0 }}
            >
              {currentEra}
            </motion.div>
          </div>

          <div style={styles.globeContainer}>
            <div
              style={{
                ...styles.globeGlow,
                background: isAdventureMode
                  ? `radial-gradient(circle, ${COLORS.orangeGlow} 0%, transparent 70%)`
                  : `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`,
              }}
            />
            <svg ref={svgRef} style={styles.globe} />
          </div>

          <AnimatePresence>
            {currentLocation && (
              <motion.div
                style={styles.locationDisplay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={styles.locationName}>{currentLocation.name}</div>
                <div style={styles.locationCountry}>
                  {currentLocation.country}
                </div>
                <div style={styles.locationPeriod}>
                  {currentLocation.period}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {flightData && !currentLocation && (
              <motion.div
                style={styles.travelingIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span style={styles.travelingIcon}>✈️</span>
                <span style={styles.travelingText}>Traveling...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={styles.centerDivider}>
            <div style={styles.centerDividerDot} />
          </div>
          <div style={{ ...styles.sideLabel, ...styles.sideLabelLeft }}>
            ENGINEERING
          </div>
          <div style={{ ...styles.sideLabel, ...styles.sideLabelRight }}>
            ADVENTURE
          </div>

          <div style={styles.cardsWrapper}>
            <div style={{ ...styles.cardsContainer, ...styles.cardsLeft }}>
              {engineeringCards.map((exp, idx) => {
                const globalIdx = currentLocation?.experiences.findIndex(
                  (e) => e.id === exp.id,
                );
                return (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    index={idx}
                    isVisible={visibleCards.includes(globalIdx)}
                    onClick={() => setModalExp(exp)}
                  />
                );
              })}
            </div>
            <div style={{ ...styles.cardsContainer, ...styles.cardsRight }}>
              {adventureCards.map((exp, idx) => {
                const globalIdx = currentLocation?.experiences.findIndex(
                  (e) => e.id === exp.id,
                );
                return (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    index={idx}
                    isVisible={visibleCards.includes(globalIdx)}
                    onClick={() => setModalExp(exp)}
                  />
                );
              })}
            </div>
          </div>

          <motion.div
            style={styles.scrollIndicator}
            animate={{ opacity: scrollProgress > 0.02 ? 0 : 1 }}
          >
            <span style={styles.scrollText}>Scroll to explore</span>
            <div style={styles.scrollArrow} />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {modalExp && (
          <ExperienceModal exp={modalExp} onClose={() => setModalExp(null)} />
        )}
      </AnimatePresence>

      <section style={styles.afterSection}>
        <h2 style={styles.afterTitle}>Where it all began...</h2>
      </section>
    </>
  );
}

// ============================================
// EXPERIENCE CARD
// ============================================
function ExperienceCard({ exp, index, isVisible, onClick }) {
  const isEng = exp.type === 'engineering';
  const accent = isEng ? COLORS.cyan : COLORS.orange;

  return (
    <motion.div
      style={{
        ...styles.expCard,
        borderColor: exp.featured ? COLORS.gold : COLORS.divider,
        boxShadow: exp.featured ? '0 0 20px rgba(255, 215, 0, 0.15)' : 'none',
      }}
      initial={{ opacity: 0, x: isEng ? -40 : 40 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : isEng ? -40 : 40,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ x: isEng ? 6 : -6, scale: 1.02, borderColor: accent }}
      onClick={onClick}
    >
      <div style={styles.cardHeader}>
        <span
          style={{
            ...styles.cardBadge,
            background: exp.featured
              ? 'rgba(255, 215, 0, 0.15)'
              : isEng
                ? 'rgba(0, 217, 255, 0.15)'
                : 'rgba(255, 107, 53, 0.15)',
            color: exp.featured ? COLORS.gold : accent,
            borderColor: exp.featured
              ? 'rgba(255, 215, 0, 0.3)'
              : isEng
                ? 'rgba(0, 217, 255, 0.25)'
                : 'rgba(255, 107, 53, 0.25)',
          }}
        >
          {exp.featured ? '⭐ ' : ''}
          {exp.type}
        </span>
        <span style={styles.cardIcon}>{exp.icon || (isEng ? '💻' : '🌍')}</span>
      </div>
      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{exp.title}</h3>
        {exp.subtitle && (
          <p style={{ ...styles.cardSubtitle, color: accent }}>
            {exp.subtitle}
          </p>
        )}
        <p style={styles.cardDesc}>{exp.desc}</p>
        {exp.places && (
          <div style={styles.cardPlaces}>
            {exp.places.slice(0, 3).map((p, i) => (
              <span key={i} style={styles.cardPlace}>
                {p}
              </span>
            ))}
          </div>
        )}
        <div style={styles.cardMeta}>
          <span style={styles.cardDate}>{exp.date}</span>
          <span style={{ ...styles.cardCta, color: accent }}>
            View details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// EXPERIENCE MODAL
// ============================================
function ExperienceModal({ exp, onClose }) {
  const isEng = exp.type === 'engineering';
  const accent = isEng ? COLORS.cyan : COLORS.orange;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  return (
    <motion.div
      style={styles.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button style={styles.modalClose} onClick={onClose}>
        ×
      </button>
      <div style={styles.modalScroll}>
        <motion.div
          style={styles.modalInner}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            style={{
              ...styles.modalBadge,
              background: isEng
                ? 'rgba(0, 217, 255, 0.12)'
                : 'rgba(255, 107, 53, 0.12)',
              color: accent,
            }}
          >
            {exp.featured ? '⭐ Featured • ' : ''}
            {exp.type}
          </span>
          <h1 style={styles.modalTitle}>{exp.title}</h1>
          {exp.subtitle && (
            <p style={{ ...styles.modalSubtitle, color: accent }}>
              {exp.subtitle}
            </p>
          )}
          <div style={styles.modalMeta}>
            <span>📅 {exp.date}</span>
            {exp.places && <span>📍 {exp.places[0]}</span>}
          </div>
          <div style={styles.modalHero}>
            <span style={styles.modalPlaceholder}>
              {exp.icon || (isEng ? '💻' : '🌍')}
            </span>
          </div>
          <div style={styles.modalBody}>
            <p>
              <strong>{exp.content.intro}</strong>
            </p>
            <div dangerouslySetInnerHTML={{ __html: exp.content.body }} />
          </div>
          {exp.funFact && (
            <div style={styles.funFact}>
              <span style={styles.funFactIcon}>🎉</span>
              <span style={styles.funFactText}>{exp.funFact}</span>
            </div>
          )}
          {exp.places && (
            <div style={styles.modalPlaces}>
              {exp.places.map((p, i) => (
                <span key={i} style={styles.modalPlace}>
                  📍 {p}
                </span>
              ))}
            </div>
          )}
          <div style={styles.modalTags}>
            {exp.content.tags.map((t, i) => (
              <span key={i} style={styles.modalTag}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================
// STYLES
// ============================================
const styles = {
  topProgress: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: COLORS.divider,
    zIndex: 100,
  },
  topProgressFill: {
    height: '100%',
    background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.orange} 100%)`,
    transformOrigin: 'left',
  },
  introSection: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: COLORS.bg,
    fontFamily: "'Sora', sans-serif",
  },
  introTitle: {
    fontSize: 'clamp(36px, 7vw, 72px)',
    fontWeight: 700,
    letterSpacing: '0.1em',
    marginBottom: 16,
    background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.textSecondary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  introSubtitle: {
    color: COLORS.textTertiary,
    fontSize: 16,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  introYears: {
    color: COLORS.cyan,
    fontSize: 14,
    letterSpacing: '0.2em',
    marginBottom: 60,
  },
  introScroll: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    color: COLORS.textTertiary,
    fontSize: 11,
    letterSpacing: '0.2em',
  },
  introLine: {
    width: 1,
    height: 50,
    background: `linear-gradient(180deg, ${COLORS.cyan} 0%, transparent 100%)`,
    animation: 'pulse-line 2s ease-in-out infinite',
  },
  journeySection: { position: 'relative', height: '2800vh' },
  globeSticky: {
    position: 'sticky',
    top: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  sectionBg: {
    position: 'absolute',
    inset: 0,
    transition: 'background 0.8s ease',
  },
  stars: {
    position: 'absolute',
    inset: 0,
    opacity: 0.6,
    background:
      'radial-gradient(1px 1px at 3% 12%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 12% 38%, rgba(255,255,255,0.35) 0%, transparent 100%), radial-gradient(1px 1px at 22% 7%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 32% 62%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 45% 22%, rgba(255,255,255,0.35) 0%, transparent 100%), radial-gradient(1px 1px at 58% 78%, rgba(255,255,255,0.25) 0%, transparent 100%), radial-gradient(1px 1px at 68% 15%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 78% 55%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 88% 35%, rgba(255,255,255,0.35) 0%, transparent 100%), radial-gradient(1px 1px at 95% 82%, rgba(255,255,255,0.25) 0%, transparent 100%)',
  },
  yearDisplay: {
    position: 'absolute',
    top: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 30,
    textAlign: 'center',
  },
  yearNumber: {
    fontSize: 'clamp(42px, 7vw, 72px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.03em',
    fontVariantNumeric: 'tabular-nums',
    transition: 'opacity 0.5s ease',
    lineHeight: 1,
  },
  yearEra: {
    fontSize: 10,
    color: COLORS.textTertiary,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    marginTop: 6,
  },
  globeContainer: { position: 'absolute', inset: 0, zIndex: 5 },
  globe: { width: '100%', height: '100%' },
  globeGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '40%',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(60px)',
    opacity: 0.5,
    transition: 'background 0.8s ease',
  },
  locationDisplay: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    zIndex: 25,
  },
  locationName: {
    fontSize: 'clamp(36px, 7vw, 72px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '0.02em',
    marginBottom: 6,
    textShadow: '0 4px 40px rgba(0,0,0,0.6)',
  },
  locationCountry: {
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  locationPeriod: { fontSize: 12, color: COLORS.textTertiary },
  travelingIndicator: {
    position: 'absolute',
    bottom: '12%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    zIndex: 25,
  },
  travelingIcon: {
    fontSize: 24,
    animation: 'plane-bob 1.5s ease-in-out infinite',
  },
  travelingText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  centerDivider: {
    position: 'absolute',
    top: '15%',
    bottom: '15%',
    left: '50%',
    width: 1,
    background: `linear-gradient(180deg, transparent 0%, ${COLORS.divider} 15%, ${COLORS.cyan} 30%, ${COLORS.divider} 50%, ${COLORS.orange} 70%, ${COLORS.divider} 85%, transparent 100%)`,
    zIndex: 25,
    opacity: 0.5,
  },
  centerDividerDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 8,
    height: 8,
    background: COLORS.bg,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '50%',
  },
  sideLabel: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    opacity: 0.3,
    zIndex: 24,
  },
  sideLabelLeft: {
    left: 12,
    color: COLORS.cyan,
    transform: 'translateY(-50%) rotate(180deg)',
  },
  sideLabelRight: { right: 12, color: COLORS.orange },
  cardsWrapper: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 30px',
    zIndex: 30,
    pointerEvents: 'none',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxHeight: '65vh',
    overflowY: 'auto',
    padding: 8,
    pointerEvents: 'auto',
  },
  cardsLeft: { alignItems: 'flex-start' },
  cardsRight: { alignItems: 'flex-end' },
  expCard: {
    width: 280,
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: 14,
    overflow: 'hidden',
    cursor: 'pointer',
    backdropFilter: 'blur(16px)',
  },
  cardHeader: {
    padding: '14px 16px 10px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardBadge: {
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    flexShrink: 0,
    border: '1px solid',
  },
  cardIcon: { fontSize: 20, opacity: 0.6 },
  cardBody: { padding: '0 16px 16px' },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: 4,
    lineHeight: 1.3,
  },
  cardSubtitle: { fontSize: 11, marginBottom: 8, fontWeight: 500 },
  cardDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 1.55,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardPlaces: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  cardPlace: {
    fontSize: 9,
    padding: '4px 8px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    color: COLORS.textSecondary,
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTop: `1px solid ${COLORS.divider}`,
  },
  cardDate: { fontSize: 10, color: COLORS.textTertiary },
  cardCta: { fontSize: 9, fontWeight: 600, letterSpacing: '0.1em' },
  scrollIndicator: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    zIndex: 20,
  },
  scrollText: {
    fontSize: 9,
    color: COLORS.textTertiary,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  scrollArrow: {
    width: 16,
    height: 16,
    borderRight: `2px solid ${COLORS.cyan}`,
    borderBottom: `2px solid ${COLORS.cyan}`,
    transform: 'rotate(45deg)',
    animation: 'bounce 2s ease-in-out infinite',
    opacity: 0.6,
  },
  modalBackdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10, 14, 39, 0.97)',
    zIndex: 1000,
    backdropFilter: 'blur(30px)',
  },
  modalClose: {
    position: 'fixed',
    top: 24,
    right: 24,
    width: 48,
    height: 48,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '50%',
    background: COLORS.bgSecondary,
    color: COLORS.text,
    fontSize: 24,
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    position: 'absolute',
    inset: 0,
    overflowY: 'auto',
    padding: '70px 24px',
  },
  modalInner: { maxWidth: 800, margin: '0 auto' },
  modalBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 1.2,
  },
  modalSubtitle: { fontSize: 16, marginBottom: 16 },
  modalMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: `1px solid ${COLORS.divider}`,
  },
  modalHero: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    marginBottom: 32,
    background: COLORS.bgSecondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPlaceholder: { fontSize: 64, opacity: 0.15 },
  modalBody: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 1.8,
    marginBottom: 32,
  },
  funFact: {
    background:
      'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    borderRadius: 12,
    padding: '16px 20px',
    margin: '24px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  },
  funFactIcon: { fontSize: 20 },
  funFactText: { fontSize: 14, color: COLORS.text, lineHeight: 1.5 },
  modalPlaces: { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  modalPlace: {
    padding: '10px 16px',
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: 20,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  modalTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 20,
    borderTop: `1px solid ${COLORS.divider}`,
  },
  modalTag: {
    padding: '8px 14px',
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: 20,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  afterSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    background: COLORS.bg,
  },
  afterTitle: {
    fontSize: 'clamp(24px, 4vw, 40px)',
    color: COLORS.textTertiary,
    textAlign: 'center',
  },
};
