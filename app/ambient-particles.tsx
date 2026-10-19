"use client";

import { useEffect, useRef } from "react";

type RingPosition = {
  x: number;
  y: number;
};

type MouseState = {
  tx: number;
  ty: number;
  lx: number;
  ly: number;
  speed: number;
  smoothSpeed: number;
  inside: boolean;
};

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvasRef.current;
    const renderingContext = element?.getContext("2d");
    if (!element || !renderingContext) return;
    const canvas = element;
    const context = renderingContext;

    const cfg = {
      innerRadius: 30,
      ringThickness: 745,
      segments: 26,
      rows: 10,
      particleSize: 1.1,
      waveSpeed: 0.95,
      lerpFactor: 0.09,
      ringCascade: 0.9,
      crestColor: "#dfafc3",
      troughColor: "#9679b3",
    };

    let width = document.documentElement.clientWidth || window.innerWidth;
    let height = document.documentElement.clientHeight || window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let tick = 0;
    let lastTime = performance.now();
    let frame = 0;

    let anchorX = width * 0.72;
    let anchorY = height * 0.42;

    function setSectionAnchor() {
      const aboutPhoto = document.querySelector<HTMLElement>(".about-photo");
      const aboutRect = aboutPhoto?.getBoundingClientRect();
      const aboutIsVisible = Boolean(
        aboutRect &&
        aboutRect.width > 0 &&
        aboutRect.height > 0 &&
        aboutRect.bottom > 0 &&
        aboutRect.top < height,
      );

      if (aboutIsVisible && aboutRect) {
        anchorX = aboutRect.left + aboutRect.width / 2;
        anchorY = aboutRect.top + aboutRect.height / 2;
        return;
      }

      const portrait = document.querySelector<HTMLElement>(".hero-photo-frame");
      const portraitRect = portrait?.getBoundingClientRect();
      const portraitIsVisible = Boolean(
        portraitRect &&
        portraitRect.width > 0 &&
        portraitRect.height > 0 &&
        portraitRect.bottom > 0 &&
        portraitRect.top < height,
      );

      if (portraitIsVisible && portraitRect) {
        anchorX = portraitRect.left + portraitRect.width / 2;
        anchorY = portraitRect.top + portraitRect.height / 2;
        return;
      }

      anchorX = width * 0.72;
      anchorY = height * 0.42;
    }

    setSectionAnchor();

    const mouse: MouseState = {
      tx: anchorX,
      ty: anchorY,
      lx: anchorX,
      ly: anchorY,
      speed: 0,
      smoothSpeed: 0,
      inside: false,
    };

    const rings: RingPosition[] = Array.from({ length: cfg.rows }, () => ({
      x: anchorX,
      y: anchorY,
    }));

    function hexToRgb(hex: string) {
      const value = parseInt(hex.replace("#", ""), 16);
      return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
    }

    const startColor = hexToRgb(cfg.troughColor);
    const endColor = hexToRgb(cfg.crestColor);
    const colorLut = Array.from({ length: 64 }, (_, index) => {
      const amount = index / 63;
      const eased = amount * amount * (3 - 2 * amount);
      const red = Math.round(startColor[0] + (endColor[0] - startColor[0]) * eased);
      const green = Math.round(startColor[1] + (endColor[1] - startColor[1]) * eased);
      const blue = Math.round(startColor[2] + (endColor[2] - startColor[2]) * eased);
      return "rgb(" + red + "," + green + "," + blue + ")";
    });

    function resize() {
      width = document.documentElement.clientWidth || window.innerWidth;
      height = document.documentElement.clientHeight || window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      setSectionAnchor();
    }

    function handleScroll() {
      const previousX = anchorX;
      const previousY = anchorY;
      setSectionAnchor();
      if (Math.hypot(anchorX - previousX, anchorY - previousY) > 120) {
        for (const ring of rings) {
          ring.x = anchorX;
          ring.y = anchorY;
        }
      }
      mouse.inside = false;
      mouse.speed = 0;
      mouse.tx = anchorX;
      mouse.ty = anchorY;
      mouse.lx = anchorX;
      mouse.ly = anchorY;
    }

    function moveMouse(event: MouseEvent) {
      mouse.inside = true;
      mouse.speed = Math.min(Math.hypot(event.clientX - mouse.lx, event.clientY - mouse.ly), 45);
      mouse.lx = mouse.tx = event.clientX;
      mouse.ly = mouse.ty = event.clientY;
    }

    function leaveWindow(event: MouseEvent) {
      if (!event.relatedTarget) mouse.inside = false;
    }

    function seeded(seed: number) {
      const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return value - Math.floor(value);
    }

    function loop(now: number) {
      frame = window.requestAnimationFrame(loop);
      const delta = Math.min(50, Math.max(1, now - lastTime)) / 16.6667;
      lastTime = now;
      tick += delta;

      mouse.speed *= Math.pow(0.9, delta);
      mouse.smoothSpeed += (mouse.speed - mouse.smoothSpeed) * 0.12 * delta;

      if (!mouse.inside) {
        mouse.tx = anchorX + Math.cos(tick * 0.012) * 35;
        mouse.ty = anchorY + Math.sin(tick * 0.016) * 25;
      }

      context.clearRect(0, 0, width, height);

      const breathe = Math.sin(tick * 0.022) * 10;
      const rotation = tick * 0.0018;

      for (let row = 0; row < cfg.rows; row += 1) {
        const rowPosition = row / Math.max(1, cfg.rows - 1);
        const rate = Math.max(0.004, cfg.lerpFactor * (1 - rowPosition * cfg.ringCascade));
        const step = 1 - Math.pow(1 - rate, delta);

        if (row === 0) {
          rings[0].x += (mouse.tx - rings[0].x) * step;
          rings[0].y += (mouse.ty - rings[0].y) * step;
        } else {
          const guideX = rings[row - 1].x * 0.65 + mouse.tx * 0.35;
          const guideY = rings[row - 1].y * 0.65 + mouse.ty * 0.35;
          rings[row].x += (guideX - rings[row].x) * (step * 1.45);
          rings[row].y += (guideY - rings[row].y) * (step * 1.45);
        }

        const sineEnvelope = Math.sin(rowPosition * Math.PI);
        const envelope = sineEnvelope * sineEnvelope * (3 - 2 * sineEnvelope);
        const baseRadius = cfg.innerRadius + rowPosition * cfg.ringThickness + breathe * (0.5 + rowPosition * 0.5);
        const stagger = (row % 2) * ((Math.PI * 2) / cfg.segments) * 0.5;

        for (let segment = 0; segment < cfg.segments; segment += 1) {
          const seed = row * 181 + segment * 37;
          const angle = (segment / cfg.segments) * Math.PI * 2 + stagger + (seeded(seed) - 0.5) * 0.035 + rotation * (1 - rowPosition * 0.4);
          const harmonic = Math.sin(angle * 3 + tick * 0.018) * 0.42 + Math.cos(angle * 2 - tick * 0.014) * 0.22;
          const wave = Math.sin(rowPosition * 8.5 - tick * 0.052 * cfg.waveSpeed + harmonic);
          const rawWave = (wave + 1) * 0.5;
          const wavePosition = rawWave * rawWave * (3 - 2 * rawWave);
          const radius = baseRadius + (seeded(seed + 91) - 0.5) * 10 + wave * 14 * (1 + Math.min(mouse.smoothSpeed * 0.025, 0.65));

          let particleX = rings[row].x + Math.cos(angle) * radius;
          let particleY = rings[row].y + Math.sin(angle) * radius;

          const dx = particleX - mouse.tx;
          const dy = particleY - mouse.ty;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < 15625 && distanceSquared > 1) {
            const distance = Math.sqrt(distanceSquared);
            const amount = 1 - distance / 125;
            const push = amount * amount * (3 - 2 * amount) * (10 + mouse.smoothSpeed * 0.28);
            particleX += (dx / distance) * push;
            particleY += (dy / distance) * push;
          }

          const alpha = envelope * (0.16 + wavePosition * 0.78);
          if (alpha <= 0.015) continue;

          const particleRadius = cfg.particleSize * (0.58 + wavePosition * 0.82) * (0.75 + envelope * 0.35);
          context.globalAlpha = Math.min(1, alpha);
          context.fillStyle = colorLut[Math.min(63, Math.floor(wavePosition * 63))];
          context.beginPath();

          if (wavePosition > 0.35 && particleRadius > 1.1) {
            const stretch = 1 + (wavePosition - 0.35) * 1.15;
            context.save();
            context.translate(particleX, particleY);
            context.rotate(angle);
            context.roundRect(
              -particleRadius * stretch,
              -particleRadius * 0.78,
              particleRadius * stretch * 2,
              particleRadius * 1.56,
              particleRadius * 0.78,
            );
            context.fill();
            context.restore();
          } else {
            context.arc(particleX, particleY, particleRadius, 0, Math.PI * 2);
            context.fill();
          }
        }
      }

      context.globalAlpha = 1;
    }

    resize();
    frame = window.requestAnimationFrame(loop);
    window.requestAnimationFrame(() => window.requestAnimationFrame(handleScroll));
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll, { passive: true });
    window.addEventListener("mousemove", moveMouse, { passive: true });
    window.addEventListener("mouseout", leaveWindow, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseout", leaveWindow);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-particles" aria-hidden="true" />;
}
