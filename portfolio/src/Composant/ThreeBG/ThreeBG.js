import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './threebg.css';

/**
 * Interactive 3D particle field — particles are magnetically attracted
 * to the cursor / finger. A soft glow orb follows the pointer.
 * When idle, a virtual pointer drifts on its own so the scene stays alive.
 */
export const ThreeBG = () => {
  const mountRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const glow = glowRef.current;
    if (!mount) return;
    const hero = mount.parentElement;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();

    // ---------- particles ----------
    const COUNT = 700;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const purple = new THREE.Color('#9d8fff');
    const cyan = new THREE.Color('#38e1ff');
    const tmpC = new THREE.Color();

    const spreadX = 13;
    const spreadY = 7.5;
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * spreadX * 2;
      const y = (Math.random() - 0.5) * spreadY * 2;
      const z = (Math.random() - 0.5) * 5;
      base[i * 3] = x; base[i * 3 + 1] = y; base[i * 3 + 2] = z;
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      tmpC.copy(Math.random() > 0.4 ? purple : cyan);
      col[i * 3] = tmpC.r; col[i * 3 + 1] = tmpC.g; col[i * 3 + 2] = tmpC.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ---------- pointer state ----------
    // ndc: -1..1 relative to hero; world: three.js units
    const pointer = { nx: 0, ny: 0, wx: 0, wy: 0, active: false, lastMove: 0 };
    const glowXY = { x: 0, y: 0, tx: 0, ty: 0 };

    const worldH = 2 * 8 * Math.tan(THREE.MathUtils.degToRad(30)); // ~9.24 at z=0

    const setFromClient = (cx, cy) => {
      const r = hero.getBoundingClientRect();
      if (!r.width || !r.height) return;
      pointer.nx = ((cx - r.left) / r.width - 0.5) * 2;
      pointer.ny = -((cy - r.top) / r.height - 0.5) * 2;
      const vW = worldH * camera.aspect;
      pointer.wx = pointer.nx * vW * 0.5;
      pointer.wy = pointer.ny * worldH * 0.5;
      pointer.active = true;
      pointer.lastMove = performance.now();
      glowXY.tx = (pointer.nx * 0.5 + 0.5) * r.width;
      glowXY.ty = (-pointer.ny * 0.5 + 0.5) * r.height;
    };

    const onMouse = (e) => setFromClient(e.clientX, e.clientY);
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) setFromClient(t.clientX, t.clientY);
    };
    const onLeave = () => { pointer.active = false; };

    hero.addEventListener('mousemove', onMouse, { passive: true });
    hero.addEventListener('touchstart', onTouch, { passive: true });
    hero.addEventListener('touchmove', onTouch, { passive: true });
    hero.addEventListener('mouseleave', onLeave);
    hero.addEventListener('touchend', onLeave);
    window.addEventListener('resize', resize);

    let running = true;
    const onVis = () => { running = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    // ---------- animation ----------
    let raf = 0;
    const clock = new THREE.Clock();
    const RADIUS = 4.2;   // magnetic radius (world units)
    const PULL = 0.55;    // how strongly particles chase the pointer

    const renderFrame = (t) => {
      // idle drift: virtual pointer wanders when user is away
      if (!pointer.active || performance.now() - pointer.lastMove > 3000) {
        pointer.nx = Math.sin(t * 0.32) * 0.65;
        pointer.ny = Math.cos(t * 0.24) * 0.55;
        const vW = worldH * camera.aspect;
        pointer.wx = pointer.nx * vW * 0.5;
        pointer.wy = pointer.ny * worldH * 0.5;
        const r = hero.getBoundingClientRect();
        if (r.width) {
          glowXY.tx = (pointer.nx * 0.5 + 0.5) * r.width;
          glowXY.ty = (-pointer.ny * 0.5 + 0.5) * r.height;
        }
      }

      const arr = geo.attributes.position.array;
      const px = pointer.wx, py = pointer.wy;

      for (let i = 0; i < COUNT; i++) {
        const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
        // gentle ambient float
        const fx = Math.sin(t * 0.5 + by * 0.8) * 0.15;
        const fy = Math.cos(t * 0.4 + bx * 0.7) * 0.15;

        // magnetic pull toward pointer
        const dx = px - bx, dy = py - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tx = bx + fx, ty = by + fy;
        if (dist < RADIUS) {
          const f = (1 - dist / RADIUS) * PULL;
          tx += dx * f;
          ty += dy * f;
        }

        const k = 0.07;
        arr[i * 3] += (tx - arr[i * 3]) * k;
        arr[i * 3 + 1] += (ty - arr[i * 3 + 1]) * k;
        arr[i * 3 + 2] += (bz - arr[i * 3 + 2]) * k;
      }
      geo.attributes.position.needsUpdate = true;

      points.rotation.y = pointer.nx * 0.08;
      points.rotation.x = -pointer.ny * 0.05;

      // glow orb follows
      glowXY.x += (glowXY.tx - glowXY.x) * 0.12;
      glowXY.y += (glowXY.ty - glowXY.y) * 0.12;
      if (glow) {
        glow.style.transform = `translate(${glowXY.x}px, ${glowXY.y}px) translate(-50%, -50%)`;
      }

      renderer.render(scene, camera);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (running && !reduced) renderFrame(clock.getElapsedTime());
    };

    if (reduced) {
      renderFrame(0);
    } else {
      // init glow position to center
      const r = hero.getBoundingClientRect();
      glowXY.x = glowXY.tx = r.width / 2;
      glowXY.y = glowXY.ty = r.height / 2;
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener('mousemove', onMouse);
      hero.removeEventListener('touchstart', onTouch);
      hero.removeEventListener('touchmove', onTouch);
      hero.removeEventListener('mouseleave', onLeave);
      hero.removeEventListener('touchend', onLeave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={mountRef} className="threebg" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  );
};
