import React, { useRef, useEffect, useState, useCallback } from 'react';

// ============================================
// LUNAR HERO - CSS 3D Moon with Procedural Texture
// Inspired by freakyspeedster's CSS Moon technique
// Fully responsive, self-contained, no external APIs
// ============================================

// Moon topology data for procedural texture generation
const MOON_TOPOLOGY = {
  maria: [
    { lat: 8.5, lon: 31.4, radius: 18, depth: 0.18 },
    { lat: 28.0, lon: 17.5, radius: 14, depth: 0.15 },
    { lat: 32.8, lon: -15.6, radius: 22, depth: 0.20 },
    { lat: 17.0, lon: 59.1, radius: 11, depth: 0.16 },
    { lat: -7.8, lon: 51.3, radius: 16, depth: 0.14 },
    { lat: -15.2, lon: 35.5, radius: 10, depth: 0.15 },
    { lat: -21.3, lon: -16.6, radius: 15, depth: 0.12 },
    { lat: -24.4, lon: -38.6, radius: 12, depth: 0.14 },
    { lat: 56.0, lon: 1.4, radius: 20, depth: 0.10 },
    { lat: 18.4, lon: -57.4, radius: 32, depth: 0.18 },
    { lat: 13.3, lon: 3.6, radius: 6, depth: 0.11 },
    { lat: -10.0, lon: -23.1, radius: 8, depth: 0.13 },
    { lat: 27.3, lon: 147.9, radius: 14, depth: 0.14 },
    { lat: -19.4, lon: -92.8, radius: 16, depth: 0.22 },
    { lat: -38.9, lon: 93.0, radius: 13, depth: 0.09 },
    { lat: 13.3, lon: 86.1, radius: 9, depth: 0.10 },
    { lat: 1.3, lon: 87.5, radius: 11, depth: 0.11 },
    { lat: 7.5, lon: -30.9, radius: 7, depth: 0.12 },
  ],
  craters: [
    { lat: -43.3, lon: -11.2, radius: 4.3, rim: 0.09, peak: 0.045, rays: true },
    { lat: 9.6, lon: -20.1, radius: 4.7, rim: 0.08, peak: 0.04, rays: true },
    { lat: 8.1, lon: -38.0, radius: 1.6, rim: 0.055, peak: 0.025, rays: true },
    { lat: 23.7, lon: -47.4, radius: 2.0, rim: 0.065, peak: 0.03, rays: true },
    { lat: 51.6, lon: -9.3, radius: 5.1, rim: 0.045, peak: 0, rays: false },
    { lat: 50.2, lon: 17.4, radius: 4.4, rim: 0.055, peak: 0.025, rays: false },
    { lat: 44.3, lon: 16.3, radius: 3.4, rim: 0.05, peak: 0.02, rays: false },
    { lat: 29.7, lon: -4.0, radius: 4.1, rim: 0.035, peak: 0, rays: false },
    { lat: -11.4, lon: 26.4, radius: 5.0, rim: 0.065, peak: 0.035, rays: false },
    { lat: -13.2, lon: 24.0, radius: 4.9, rim: 0.055, peak: 0.025, rays: false },
    { lat: -18.1, lon: 23.4, radius: 5.0, rim: 0.045, peak: 0.02, rays: false },
    { lat: -8.9, lon: 61.1, radius: 6.6, rim: 0.075, peak: 0.04, rays: true },
    { lat: -25.3, lon: 60.4, radius: 8.8, rim: 0.065, peak: 0.035, rays: false },
    { lat: -5.2, lon: -68.6, radius: 8.6, rim: 0.035, peak: 0, rays: false },
    { lat: -58.4, lon: -14.4, radius: 11.5, rim: 0.055, peak: 0.015, rays: false },
    { lat: -9.2, lon: -1.8, radius: 7.6, rim: 0.035, peak: 0, rays: false },
    { lat: -13.4, lon: -2.8, radius: 5.9, rim: 0.045, peak: 0.02, rays: false },
    { lat: -18.2, lon: -1.9, radius: 4.8, rim: 0.055, peak: 0.03, rays: false },
    { lat: 14.5, lon: -11.3, radius: 2.9, rim: 0.065, peak: 0.03, rays: false },
    { lat: 16.1, lon: 46.8, radius: 1.4, rim: 0.065, peak: 0.025, rays: true },
    { lat: 63.5, lon: -63.0, radius: 6.5, rim: 0.065, peak: 0.035, rays: false },
    { lat: 73.4, lon: -10.1, radius: 2.6, rim: 0.065, peak: 0.03, rays: true },
    { lat: -21.2, lon: 128.9, radius: 9.5, rim: 0.075, peak: 0.04, rays: false },
    { lat: -4.4, lon: -157.4, radius: 11.0, rim: 0.065, peak: 0.03, rays: false },
    { lat: 2.6, lon: -128.7, radius: 14.0, rim: 0.055, peak: 0.025, rays: false },
    { lat: -36.1, lon: -151.8, radius: 13.5, rim: 0.045, peak: 0.02, rays: false },
    { lat: -20.2, lon: 149.2, radius: 11.5, rim: 0.05, peak: 0.025, rays: false },
    { lat: -70.6, lon: -5.8, radius: 5.7, rim: 0.075, peak: 0.04, rays: false },
    { lat: -89.9, lon: 0.0, radius: 1.1, rim: 0.055, peak: 0.025, rays: false },
    { lat: -44.4, lon: -55.1, radius: 11.0, rim: 0.045, peak: 0, rays: false },
    { lat: -50.5, lon: -6.3, radius: 8.8, rim: 0.045, peak: 0.02, rays: false },
    { lat: -49.6, lon: -21.8, radius: 7.4, rim: 0.05, peak: 0.025, rays: false },
    { lat: -11.2, lon: 4.1, radius: 6.8, rim: 0.05, peak: 0.025, rays: false },
    { lat: -5.5, lon: 4.8, radius: 7.5, rim: 0.03, peak: 0, rays: false },
    { lat: -25.5, lon: -2.0, radius: 5.9, rim: 0.045, peak: 0.02, rays: false },
    { lat: -28.0, lon: 3.3, radius: 3.5, rim: 0.055, peak: 0.025, rays: false },
    { lat: 26.7, lon: -13.1, radius: 1.7, rim: 0.05, peak: 0.025, rays: false },
    { lat: 25.8, lon: -21.0, radius: 1.5, rim: 0.045, peak: 0.02, rays: false },
    { lat: 23.3, lon: -29.2, radius: 1.4, rim: 0.045, peak: 0.02, rays: false },
    { lat: 11.9, lon: -50.8, radius: 2.1, rim: 0.04, peak: 0.015, rays: false },
    { lat: 7.0, lon: -54.9, radius: 1.5, rim: 0.045, peak: 0.02, rays: false },
    { lat: 2.2, lon: -67.6, radius: 5.8, rim: 0.035, peak: 0, rays: false },
    { lat: 52.6, lon: -43.4, radius: 2.0, rim: 0.055, peak: 0.025, rays: true },
    { lat: 61.8, lon: 50.3, radius: 1.6, rim: 0.055, peak: 0.025, rays: true },
    { lat: 27.7, lon: 55.5, radius: 6.5, rim: 0.05, peak: 0.025, rays: false },
    { lat: 34.5, lon: 56.7, radius: 4.3, rim: 0.055, peak: 0.025, rays: false },
    { lat: 39.2, lon: 59.9, radius: 6.3, rim: 0.04, peak: 0.015, rays: false },
    { lat: 46.7, lon: 44.4, radius: 4.4, rim: 0.055, peak: 0.025, rays: false },
    { lat: 46.7, lon: 39.1, radius: 3.5, rim: 0.05, peak: 0.02, rays: false },
    { lat: 53.6, lon: 56.5, radius: 6.2, rim: 0.045, peak: 0.015, rays: false },
    { lat: -45.0, lon: 40.0, radius: 9.5, rim: 0.04, peak: 0.015, rays: false },
    { lat: -42.9, lon: 42.0, radius: 3.9, rim: 0.055, peak: 0.025, rays: false },
    { lat: -32.5, lon: 54.2, radius: 3.7, rim: 0.06, peak: 0.03, rays: false },
    { lat: -36.3, lon: 60.4, radius: 6.3, rim: 0.04, peak: 0.015, rays: false },
    { lat: 21.3, lon: 46.0, radius: 3.2, rim: 0.055, peak: 0.025, rays: false },
    { lat: 14.6, lon: 54.7, radius: 1.1, rim: 0.045, peak: 0.02, rays: false },
    { lat: 18.3, lon: 53.5, radius: 0.9, rim: 0.04, peak: 0.015, rays: false },
    { lat: 30.7, lon: 1.5, radius: 1.9, rim: 0.045, peak: 0.02, rays: false },
    { lat: 27.6, lon: -34.3, radius: 0.9, rim: 0.04, peak: 0.015, rays: false },
    { lat: 29.9, lon: -34.6, radius: 1.2, rim: 0.045, peak: 0.02, rays: false },
  ],
};

// Simplex noise for procedural generation
class SimplexNoise {
  constructor(seed = 1) {
    this.p = new Uint8Array(512);
    const random = this.seededRandom(seed);
    for (let i = 0; i < 256; i++) this.p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    for (let i = 0; i < 512; i++) this.p[i] = this.p[i & 255];
  }
  
  seededRandom(seed) {
    return () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  }
  
  grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
  
  dot(g, x, y, z) { return g[0]*x + g[1]*y + g[2]*z; }
  
  noise3D(x, y, z) {
    const F3 = 1/3, G3 = 1/6;
    let s = (x + y + z) * F3;
    let i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
    let t = (i + j + k) * G3;
    let X0 = i - t, Y0 = j - t, Z0 = k - t;
    let x0 = x - X0, y0 = y - Y0, z0 = z - Z0;
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    let x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    let x2 = x0 - i2 + 2*G3, y2 = y0 - j2 + 2*G3, z2 = z0 - k2 + 2*G3;
    let x3 = x0 - 1 + 3*G3, y3 = y0 - 1 + 3*G3, z3 = z0 - 1 + 3*G3;
    let ii = i & 255, jj = j & 255, kk = k & 255;
    let gi0 = this.p[ii + this.p[jj + this.p[kk]]] % 12;
    let gi1 = this.p[ii + i1 + this.p[jj + j1 + this.p[kk + k1]]] % 12;
    let gi2 = this.p[ii + i2 + this.p[jj + j2 + this.p[kk + k2]]] % 12;
    let gi3 = this.p[ii + 1 + this.p[jj + 1 + this.p[kk + 1]]] % 12;
    let n0, n1, n2, n3;
    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    n0 = t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0));
    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    n1 = t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1));
    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    n2 = t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2));
    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    n3 = t3 < 0 ? 0 : (t3 *= t3, t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3));
    return 32 * (n0 + n1 + n2 + n3);
  }
  
  fbm(x, y, z, octaves = 6, lacunarity = 2, gain = 0.5) {
    let total = 0, frequency = 1, amplitude = 1, maxValue = 0;
    for (let i = 0; i < octaves; i++) {
      total += this.noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }
    return total / maxValue;
  }
}

// Helper functions
const angularDist = (lat1, lon1, lat2, lon2) => {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 180 / Math.PI;
};

const smoothstep = (edge0, edge1, x) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const lerp = (a, b, t) => a + (b - a) * t;

// Generate moon texture as base64 data URL
const generateMoonTexture = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const noise = new SimplexNoise(42);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width, v = y / height;
      const lon = (u - 0.5) * 360, lat = (0.5 - v) * 180;
      const latRad = lat * Math.PI / 180, lonRad = lon * Math.PI / 180;
      const nx = Math.cos(latRad) * Math.cos(lonRad);
      const ny = Math.cos(latRad) * Math.sin(lonRad);
      const nz = Math.sin(latRad);

      let elevation = noise.fbm(nx * 2, ny * 2, nz * 2, 8, 2.1, 0.48) * 0.025;
      let r = 148, g = 145, b = 140;

      // Apply maria (dark regions)
      for (const m of MOON_TOPOLOGY.maria) {
        const dist = angularDist(lat, lon, m.lat, m.lon);
        if (dist < m.radius * 1.5) {
          const factor = smoothstep(m.radius * 1.5, m.radius * 0.3, dist);
          elevation -= m.depth * factor;
          r = lerp(r, 75, factor);
          g = lerp(g, 73, factor);
          b = lerp(b, 78, factor);
        }
      }

      // Apply craters
      for (const c of MOON_TOPOLOGY.craters) {
        const dist = angularDist(lat, lon, c.lat, c.lon);
        if (dist < c.radius * 2.5) {
          const floorFactor = smoothstep(c.radius * 0.9, 0, dist);
          elevation -= c.rim * 0.85 * floorFactor;
          const rimDist = Math.abs(dist - c.radius);
          const rimFactor = Math.exp(-rimDist * rimDist / (c.radius * 0.12));
          elevation += c.rim * rimFactor;
          if (c.peak > 0 && dist < c.radius * 0.25) {
            elevation += c.peak * smoothstep(c.radius * 0.25, 0, dist) ** 2;
          }
          // Ray systems
          if (c.rays && dist > c.radius && dist < c.radius * 2.5) {
            const rayNoise = noise.noise3D(nx * 25, ny * 25, nz * 25);
            if (rayNoise > 0.15) {
              const rayFactor = smoothstep(c.radius * 2.5, c.radius, dist) * (rayNoise - 0.15);
              r = lerp(r, 190, rayFactor * 0.6);
              g = lerp(g, 187, rayFactor * 0.6);
              b = lerp(b, 182, rayFactor * 0.6);
            }
          }
        }
      }

      // Micro detail
      const micro = noise.fbm(nx * 60, ny * 60, nz * 60, 4, 2.0, 0.5);
      if (micro > 0.25) elevation -= (micro - 0.25) * 0.012;

      // Color variation
      const colorNoise = noise.fbm(nx * 10, ny * 10, nz * 10, 4, 2.0, 0.5) * 15;
      r += colorNoise + elevation * 160;
      g += colorNoise + elevation * 160;
      b += colorNoise + elevation * 160;

      // Fine grain
      const grain = noise.noise3D(nx * 120, ny * 120, nz * 120) * 5;
      r += grain; g += grain; b += grain;

      const idx = (y * width + x) * 4;
      data[idx] = Math.max(0, Math.min(255, r));
      data[idx + 1] = Math.max(0, Math.min(255, g));
      data[idx + 2] = Math.max(0, Math.min(255, b));
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.92);
};

// Moon phases
const MOON_PHASES = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];

// Main Component
export default function LunarHero() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [moonTexture, setMoonTexture] = useState('');
  const [lightAngle, setLightAngle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [stars, setStars] = useState([]);
  
  const animationRef = useRef(null);
  const dragRef = useRef({ startX: 0, startRotation: 0 });

  // Generate texture on mount
  useEffect(() => {
    setLoadProgress(20);
    
    // Generate stars
    const generatedStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      animationDelay: Math.random() * 3,
    }));
    setStars(generatedStars);
    
    setLoadProgress(40);
    
    // Generate moon texture (run in next tick to show loading)
    setTimeout(() => {
      setLoadProgress(60);
      const texture = generateMoonTexture(1024, 512);
      setLoadProgress(90);
      setMoonTexture(texture);
      setLoadProgress(100);
      
      setTimeout(() => setIsLoading(false), 300);
    }, 100);
  }, []);

  // Light cycle animation (10 seconds)
  useEffect(() => {
    if (isLoading) return;
    
    let lastTime = performance.now();
    const lightCycleTime = 10000;

    const animate = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      setLightAngle(prev => {
        let newAngle = prev + (delta / lightCycleTime) * Math.PI * 2;
        if (newAngle >= Math.PI * 2) newAngle -= Math.PI * 2;
        return newAngle;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isLoading]);

  // Update phase based on light angle
  useEffect(() => {
    setCurrentPhase(Math.floor((lightAngle / (Math.PI * 2)) * 8) % 8);
  }, [lightAngle]);

  // Drag handlers
  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragRef.current = { startX: clientX, startRotation: rotation };
  }, [rotation]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = (clientX - dragRef.current.startX) * 0.3;
    setRotation(dragRef.current.startRotation + delta);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Calculate dynamic shadow based on light angle (CSS 3D illusion technique)
  const getShadowStyle = () => {
    const intensity = Math.abs(Math.cos(lightAngle));
    const shadowX = Math.cos(lightAngle) * 25;
    const shadowY = Math.sin(lightAngle * 0.5) * 15;
    const shineX = -Math.cos(lightAngle) * 12;
    const shineY = Math.sin(lightAngle) * 8;
    
    return {
      boxShadow: `
        inset ${shineX}px ${shineY}px 8px -3px rgba(255, 255, 255, ${0.15 + intensity * 0.25}),
        inset ${shadowX}px ${-shadowY}px 60px 50px rgba(0, 0, 0, ${0.7 + (1 - intensity) * 0.25}),
        0 0 40px rgba(200, 200, 220, ${0.15 + intensity * 0.15}),
        0 0 80px rgba(180, 180, 200, ${0.08 + intensity * 0.08})
      `,
    };
  };

  // Calculate compass indicator position
  const compassX = 32 + Math.cos(lightAngle - Math.PI / 2) * 24;
  const compassY = 32 + Math.sin(lightAngle - Math.PI / 2) * 24;

  return (
    <div className="lunar-hero">
      {/* Starfield Background */}
      <div className="stars-container">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="gradient-overlay gradient-vertical" />
      <div className="gradient-overlay gradient-horizontal" />

      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-moon" />
          <p className="loading-text">Generating Lunar Surface</p>
          <div className="loading-bar">
            <div className="loading-progress" style={{ width: `${loadProgress}%` }} />
          </div>
        </div>
      )}

      {/* Moon Container */}
      <div 
        className={`moon-container ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* The Moon */}
        <div
          className="moon"
          style={{
            backgroundImage: moonTexture ? `url(${moonTexture})` : 'none',
            backgroundPosition: `${50 + rotation}% 0%`,
            ...getShadowStyle(),
          }}
        >
          {/* Inner highlight for extra depth */}
          <div 
            className="moon-highlight"
            style={{
              background: `radial-gradient(ellipse at ${30 + Math.cos(lightAngle) * 20}% ${40 + Math.sin(lightAngle) * 10}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
            }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1 className="logo-title">Lunar</h1>
          <p className="logo-subtitle">Observatory</p>
        </div>
        <div className="header-right">
          <p className="phase-label">Phase</p>
          <p className="phase-name">{MOON_PHASES[currentPhase]}</p>
        </div>
      </header>

      {/* Light Compass */}
      <div className="compass-container">
        <div className="compass">
          <div className="compass-center" />
          <div
            className="compass-indicator"
            style={{ left: compassX, top: compassY }}
          />
          <span className="compass-label n">N</span>
          <span className="compass-label s">S</span>
          <span className="compass-label e">E</span>
          <span className="compass-label w">W</span>
        </div>
        <p className="compass-title">Solar Azimuth</p>
        <p className="compass-value">{Math.round((lightAngle * 180 / Math.PI) % 360)}°</p>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <div className="stat">
          <p className="stat-label">Craters</p>
          <p className="stat-value">{MOON_TOPOLOGY.craters.length}</p>
        </div>
        <div className="stat">
          <p className="stat-label">Maria</p>
          <p className="stat-value">{MOON_TOPOLOGY.maria.length}</p>
        </div>
        <div className="stat">
          <p className="stat-label">Light Cycle</p>
          <p className="stat-value">10s</p>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="timeline">
        {MOON_PHASES.map((_, i) => (
          <div
            key={i}
            className={`timeline-dot ${i === currentPhase ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Hint */}
      <p className={`hint ${isDragging ? 'hidden' : ''}`}>Drag to rotate</p>

      <style>{`
        .lunar-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #020208;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: white;
        }

        /* Stars */
        .stars-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Gradients */
        .gradient-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .gradient-vertical {
          background: linear-gradient(to top, #020208, transparent 30%, transparent 70%, rgba(2,2,8,0.5));
        }

        .gradient-horizontal {
          background: linear-gradient(to right, rgba(2,2,8,0.3), transparent 20%, transparent 80%, rgba(2,2,8,0.3));
        }

        /* Loading */
        .loading-screen {
          position: absolute;
          inset: 0;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #020208;
        }

        .loading-moon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4a4a5a 0%, #3a3a4a 50%, #2a2a3a 100%);
          animation: pulse 1.5s ease-in-out infinite;
          box-shadow: inset -12px -6px 25px rgba(0,0,0,0.8), 0 0 40px rgba(150,150,180,0.2);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        .loading-text {
          margin-top: 24px;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        .loading-bar {
          width: 160px;
          height: 1px;
          margin-top: 16px;
          background: rgba(255,255,255,0.1);
          border-radius: 1px;
          overflow: hidden;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, rgba(96,165,250,0.8), rgba(168,85,247,0.8));
          transition: width 0.2s;
        }

        /* Moon Container */
        .moon-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
        }

        .moon-container.dragging {
          cursor: grabbing;
        }

        /* The Moon - Responsive sizing */
        .moon {
          position: relative;
          width: min(70vw, 70vh, 400px);
          height: min(70vw, 70vh, 400px);
          border-radius: 50%;
          background-size: 200% 100%;
          transition: box-shadow 0.2s;
        }

        .moon-highlight {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
        }

        /* Header */
        .header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          pointer-events: none;
        }

        @media (min-width: 640px) {
          .header { padding: 24px; }
        }

        @media (min-width: 1024px) {
          .header { padding: 32px; }
        }

        .header-left, .header-right {
          display: flex;
          flex-direction: column;
        }

        .header-right {
          text-align: right;
        }

        .logo-title {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          margin: 0;
        }

        .logo-subtitle {
          font-size: 8px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin: 2px 0 0 0;
        }

        @media (min-width: 640px) {
          .logo-title { font-size: 11px; }
          .logo-subtitle { font-size: 9px; }
        }

        .phase-label {
          font-size: 7px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }

        .phase-name {
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.85);
          margin: 2px 0 0 0;
        }

        @media (min-width: 640px) {
          .phase-label { font-size: 8px; }
          .phase-name { font-size: 16px; }
        }

        /* Compass */
        .compass-container {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 10;
          pointer-events: none;
        }

        @media (min-width: 640px) {
          .compass-container { bottom: 24px; left: 24px; }
        }

        @media (min-width: 1024px) {
          .compass-container { bottom: 32px; left: 32px; }
        }

        .compass {
          width: 64px;
          height: 64px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          position: relative;
        }

        @media (min-width: 640px) {
          .compass { width: 72px; height: 72px; }
        }

        .compass-center {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .compass-indicator {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #fbbf24;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.075s;
          box-shadow: 0 0 10px #fbbf24, 0 0 20px rgba(251,191,36,0.4);
        }

        .compass-label {
          position: absolute;
          font-size: 6px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
        }

        @media (min-width: 640px) {
          .compass-label { font-size: 7px; }
        }

        .compass-label.n { top: -12px; left: 50%; transform: translateX(-50%); }
        .compass-label.s { bottom: -12px; left: 50%; transform: translateX(-50%); }
        .compass-label.e { right: -10px; top: 50%; transform: translateY(-50%); }
        .compass-label.w { left: -10px; top: 50%; transform: translateY(-50%); }

        @media (min-width: 640px) {
          .compass-label.n { top: -14px; }
          .compass-label.s { bottom: -14px; }
          .compass-label.e { right: -12px; }
          .compass-label.w { left: -12px; }
        }

        .compass-title {
          font-size: 7px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin: 10px 0 0 0;
          text-align: center;
        }

        .compass-value {
          font-size: 10px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          color: rgba(255,255,255,0.6);
          margin: 2px 0 0 0;
          text-align: center;
        }

        @media (min-width: 640px) {
          .compass-title { font-size: 8px; margin-top: 12px; }
          .compass-value { font-size: 12px; }
        }

        /* Stats */
        .stats-container {
          position: absolute;
          bottom: 16px;
          right: 16px;
          z-index: 10;
          text-align: right;
          pointer-events: none;
          display: none;
        }

        @media (min-width: 640px) {
          .stats-container {
            display: block;
            bottom: 24px;
            right: 24px;
          }
        }

        @media (min-width: 1024px) {
          .stats-container { bottom: 32px; right: 32px; }
        }

        .stat {
          margin-bottom: 12px;
        }

        @media (min-width: 640px) {
          .stat { margin-bottom: 16px; }
        }

        .stat-label {
          font-size: 6px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin: 0;
        }

        .stat-value {
          font-size: 10px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          color: rgba(255,255,255,0.7);
          margin: 2px 0 0 0;
        }

        @media (min-width: 640px) {
          .stat-label { font-size: 7px; }
          .stat-value { font-size: 12px; }
        }

        /* Timeline */
        .timeline {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 6px;
          pointer-events: none;
        }

        @media (min-width: 640px) {
          .timeline { bottom: 24px; gap: 8px; }
        }

        @media (min-width: 1024px) {
          .timeline { bottom: 32px; }
        }

        .timeline-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: all 0.3s;
        }

        @media (min-width: 640px) {
          .timeline-dot { width: 6px; height: 6px; }
        }

        .timeline-dot.active {
          background: #60a5fa;
          transform: scale(1.25);
          box-shadow: 0 0 6px rgba(96,165,250,0.6);
        }

        /* Hint */
        .hint {
          position: absolute;
          bottom: 48px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          transition: opacity 0.5s;
          pointer-events: none;
        }

        @media (min-width: 640px) {
          .hint { bottom: 64px; font-size: 9px; }
        }

        .hint.hidden {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
