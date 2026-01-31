import { MOON_MARIA, MOON_CRATERS } from './moonTopology';
import { SimplexNoise, angularDist, smoothstep, lerp } from './simplexNoise';

// Generate moon texture as base64 data URL
export const generateMoonTexture = (width: number, height: number): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const noise = new SimplexNoise(42);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const lon = (u - 0.5) * 360;
      const lat = (0.5 - v) * 180;
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;
      const nx = Math.cos(latRad) * Math.cos(lonRad);
      const ny = Math.cos(latRad) * Math.sin(lonRad);
      const nz = Math.sin(latRad);

      let elevation = noise.fbm(nx * 2, ny * 2, nz * 2, 8, 2.1, 0.48) * 0.025;
      let r = 148;
      let g = 145;
      let b = 140;

      // Apply maria (dark regions)
      for (const m of MOON_MARIA) {
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
      for (const c of MOON_CRATERS) {
        const dist = angularDist(lat, lon, c.lat, c.lon);
        if (dist < c.radius * 2.5) {
          const floorFactor = smoothstep(c.radius * 0.9, 0, dist);
          elevation -= c.rim * 0.85 * floorFactor;
          const rimDist = Math.abs(dist - c.radius);
          const rimFactor = Math.exp((-rimDist * rimDist) / (c.radius * 0.12));
          elevation += c.rim * rimFactor;
          if (c.peak > 0 && dist < c.radius * 0.25) {
            elevation += c.peak * smoothstep(c.radius * 0.25, 0, dist) ** 2;
          }
          // Ray systems
          if (c.rays && dist > c.radius && dist < c.radius * 2.5) {
            const rayNoise = noise.noise3D(nx * 25, ny * 25, nz * 25);
            if (rayNoise > 0.15) {
              const rayFactor =
                smoothstep(c.radius * 2.5, c.radius, dist) * (rayNoise - 0.15);
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
      const colorNoise =
        noise.fbm(nx * 10, ny * 10, nz * 10, 4, 2.0, 0.5) * 15;
      r += colorNoise + elevation * 160;
      g += colorNoise + elevation * 160;
      b += colorNoise + elevation * 160;

      // Fine grain
      const grain = noise.noise3D(nx * 120, ny * 120, nz * 120) * 5;
      r += grain;
      g += grain;
      b += grain;

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
