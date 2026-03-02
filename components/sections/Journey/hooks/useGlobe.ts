'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { FlightData } from '../types';
import { MARKER_LOCATIONS } from '../data';
import { generateArcPoints } from './useJourneyScroll';
import { useTheme } from '@/theme/ThemeProvider';

// ============================================
// HOOK: useGlobe
// ============================================

export interface UseGlobeReturn {
  svgRef: React.RefObject<SVGSVGElement | null>;
  updateGlobe: (
    scale: number,
    rotation: [number, number],
    flightData: FlightData | null,
  ) => void;
}

export function useGlobe(): UseGlobeReturn {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const baseScaleRef = useRef<number>(0);
  const { colors } = useTheme();

  // Store colors in a ref for use in updateGlobe callback
  const colorsRef = useRef(colors);
  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  // Initialize D3 Globe
  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const baseScale = Math.min(width, height) / (isMobile ? 3.6 : 2.4);
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

    // Ocean
    globe
      .append('circle')
      .attr('class', 'ocean')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())
      .style('fill', colors.globeOcean);

    // Graticule
    globe
      .append('path')
      .attr('class', 'graticule')
      .datum(d3.geoGraticule().step([15, 15]))
      .attr('d', path)
      .style('fill', 'none')
      .style('stroke', colors.globeGraticule)
      .style('stroke-width', 0.5);

    // Groups for layering
    const countriesGroup = globe.append('g').attr('class', 'countries');
    globe.append('g').attr('class', 'flights');
    const markersGroup = globe.append('g').attr('class', 'markers');

    // Load world map and India map
    Promise.all([
      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
      d3
        .json(
          'https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@8d907bc/topojson/india.json',
        )
        .catch(() => null),
    ]).then(([world, indiaData]: [unknown, unknown]) => {
      const worldData = world as Topology<{ countries: GeometryCollection }>;

      // Get world countries excluding India if we have India data
      const worldFeatures = (
        topojson.feature(
          worldData,
          worldData.objects.countries,
        ) as GeoJSON.FeatureCollection
      ).features.filter((f) =>
        indiaData ? f.id !== '356' && f.id !== 356 : true,
      );

      // Get India with correct boundaries
      let indiaFeatures: GeoJSON.Feature[] = [];
      if (indiaData) {
        const indiaTopojson = indiaData as Topology<
          Record<string, GeometryCollection>
        >;
        const objectKey = Object.keys(indiaTopojson.objects)[0];
        if (objectKey) {
          const mergedIndia = topojson.merge(
            indiaTopojson,
            // @ts-expect-error: geometries exist
            indiaTopojson.objects[objectKey].geometries,
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

      const allFeatures = [...worldFeatures, ...indiaFeatures];

      countriesGroup
        .selectAll('path')
        .data(allFeatures)
        .enter()
        .append('path')
        .attr('d', path as unknown as string)
        .style('fill', colorsRef.current.globeLand)
        .style('stroke', colorsRef.current.globeLandStroke)
        .style('stroke-width', 0.5);

      // Add markers
      MARKER_LOCATIONS.forEach((loc) => {
        const g = markersGroup.append('g').attr('data-id', loc.id);
        const color =
          loc.type === 'adventure'
            ? colorsRef.current.orange
            : colorsRef.current.cyan;

        // Glow
        g.append('circle')
          .attr('class', 'marker-glow')
          .attr('data-type', loc.type)
          .attr('r', 16)
          .style('fill', color)
          .style('opacity', 0.12)
          .style('filter', 'blur(5px)');

        // Pulse ring
        g.append('circle')
          .attr('class', 'pulse')
          .attr('data-type', loc.type)
          .attr('r', 6)
          .style('fill', 'none')
          .style('stroke', color)
          .style('stroke-width', 1.5)
          .style('opacity', 0);

        // Core dot
        g.append('circle')
          .attr('class', 'marker-core')
          .attr('data-type', loc.type)
          .attr('r', 4)
          .style('fill', color)
          .style('stroke', '#fff')
          .style('stroke-width', 1.5);
      });

      // Pulse animation
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

    // Handle resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      baseScaleRef.current = Math.min(w, h) / (w < 768 ? 3.6 : 2.4);
      svg.attr('width', w).attr('height', h);
      if (projectionRef.current) {
        projectionRef.current.translate([w / 2, h / 2]);
      }
      globe
        .select('.ocean')
        .attr('cx', w / 2)
        .attr('cy', h / 2);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Update ocean color
    svg.select('.ocean').style('fill', colors.globeOcean);

    // Update graticule color
    svg.select('.graticule').style('stroke', colors.globeGraticule);

    // Update land colors
    svg
      .selectAll('.countries path')
      .style('fill', colors.globeLand)
      .style('stroke', colors.globeLandStroke);

    // Update marker colors
    svg.selectAll('.marker-glow').each(function () {
      const el = d3.select(this);
      const type = el.attr('data-type');
      el.style('fill', type === 'adventure' ? colors.orange : colors.cyan);
    });

    svg.selectAll('.pulse').each(function () {
      const el = d3.select(this);
      const type = el.attr('data-type');
      el.style('stroke', type === 'adventure' ? colors.orange : colors.cyan);
    });

    svg.selectAll('.marker-core').each(function () {
      const el = d3.select(this);
      const type = el.attr('data-type');
      el.style('fill', type === 'adventure' ? colors.orange : colors.cyan);
    });
  }, [colors]);

  // Update globe rotation and scale
  const updateGlobe = useCallback(
    (
      scale: number,
      rotation: [number, number],
      flightData: FlightData | null,
    ) => {
      if (!projectionRef.current || !svgRef.current) return;

      const currentColors = colorsRef.current;
      const projection = projectionRef.current;
      projection.scale(baseScaleRef.current * scale);
      projection.rotate([rotation[0], rotation[1]]);

      const path = d3.geoPath().projection(projection);
      const svg = d3.select(svgRef.current);

      // Update countries
      svg.selectAll('.countries path').attr('d', path as unknown as string);

      // Update ocean size
      svg.select('.ocean').attr('r', projection.scale());

      // Update markers
      const rot = projection.rotate();
      MARKER_LOCATIONS.forEach((loc) => {
        const coords = projection(loc.coords);
        const visible =
          d3.geoDistance(loc.coords, [-rot[0], -rot[1]]) < Math.PI / 2;
        svg
          .select(`[data-id="${loc.id}"]`)
          .attr(
            'transform',
            coords ? `translate(${coords[0]},${coords[1]})` : '',
          )
          .style('opacity', visible ? 1 : 0);
      });

      // Update flight path
      const flightGroup = svg.select('.flights');
      flightGroup.selectAll('*').remove();

      if (
        flightData &&
        flightData.from &&
        flightData.to &&
        flightData.progress > 0
      ) {
        const arcPoints = generateArcPoints(flightData.from, flightData.to, 60);
        const visiblePoints = arcPoints.filter(
          (p) => d3.geoDistance(p, [-rot[0], -rot[1]]) < Math.PI / 2,
        );

        if (visiblePoints.length >= 2) {
          const lineGen = d3
            .line<[number, number]>()
            .x((d) => projection(d)?.[0] ?? 0)
            .y((d) => projection(d)?.[1] ?? 0)
            .curve(d3.curveCatmullRom);

          const pointsToShow = Math.floor(
            visiblePoints.length * Math.min(flightData.progress, 1),
          );
          const trailPoints = visiblePoints.slice(0, pointsToShow);

          if (trailPoints.length >= 2) {
            // Trail segments - thicker and more prominent
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
                  .style('stroke', currentColors.globeFlightPath)
                  .style('stroke-width', 4 - i * 0.5)
                  .style('opacity', 0.2 + (i / 6) * 0.6)
                  .style('stroke-linecap', 'round');
              }
            }

            // Calculate plane rotation angle
            const currentPos = trailPoints[trailPoints.length - 1];
            const prevPos = trailPoints[Math.max(0, trailPoints.length - 3)];
            const proj = projection(currentPos);
            const prevProj = projection(prevPos);

            if (proj && prevProj) {
              // Calculate angle for plane direction
              const dx = proj[0] - prevProj[0];
              const dy = proj[1] - prevProj[1];
              const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

              // Glow behind plane
              flightGroup
                .append('circle')
                .attr('cx', proj[0])
                .attr('cy', proj[1])
                .attr('r', 14)
                .style('fill', currentColors.globeFlightGlow)
                .style('filter', 'blur(6px)');

              // Plane icon (small airplane shape)
              const planeScale = 0.8;
              flightGroup
                .append('path')
                .attr('d', 'M12 2L8 8L2 10L8 12L12 22L16 12L22 10L16 8L12 2Z')
                .attr(
                  'transform',
                  `translate(${proj[0]}, ${proj[1]}) rotate(${angle}) scale(${planeScale}) translate(-12, -12)`,
                )
                .style('fill', '#fff')
                .style('stroke', currentColors.cyan)
                .style('stroke-width', 1.5)
                .style('filter', 'drop-shadow(0 0 3px rgba(0,217,255,0.5))');
            }

            // Cloud/contrail behind plane
            for (let c = 1; c <= 5; c++) {
              const idx = Math.max(0, trailPoints.length - 1 - c * 3);
              if (trailPoints[idx]) {
                const cp = projection(trailPoints[idx]);
                if (cp) {
                  flightGroup
                    .append('circle')
                    .attr('cx', cp[0])
                    .attr('cy', cp[1])
                    .attr('r', 5 - c * 0.8)
                    .style('fill', 'rgba(255,255,255,' + (0.5 - c * 0.08) + ')')
                    .style('filter', 'blur(3px)');
                }
              }
            }
          }
        }
      }
    },
    [],
  );

  return { svgRef, updateGlobe };
}

export default useGlobe;
