import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './threebg.css';

/**
 * Interactive 3D particle field for the hero section.
 * - Additive-blended particles in brand purple / cyan
 * - Wireframe icosahedron accent, slow rotation
 * - Mouse parallax on camera
 * - DPR capped at 2, resizes with container, full cleanup on unmount
 * - Renders a single static frame when prefers-reduced-motion is set
 */
export const ThreeBG = () => {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      Math.max(mount.clientWidth, 1) / Math.max(mount.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ---- Particle field ----
    const COUNT = 2400;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const baseY = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    const purple = new THREE.Color('#8b7cf6');
    const cyan = new THREE.Color('#22d3ee');
    const tmp = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 13;
      const z = (Math.random() - 0.5) * 7;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      baseY[i] = y;
      phase[i] = Math.random() * Math.PI * 2;
      tmp.copy(Math.random() > 0.45 ? purple : cyan);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ---- Wireframe accent shapes ----
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 1),
      new THREE.MeshBasicMaterial({
        color: 0x8b7cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.32,
      })
    );
    ico.position.set(5.2, 0.8, -2.5);
    scene.add(ico);

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.02, 12, 90),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.4,
      })
    );
    torus.position.set(-5.4, -1.4, -3);
    torus.rotation.x = Math.PI / 2.6;
    scene.add(torus);

    // ---- Interaction ----
    const onMouse = (e) => {
      const r = mount.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Pause when tab hidden
    let running = true;
    const onVis = () => {
      running = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVis);

    let raf = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      const { x: mx, y: my } = mouseRef.current;

      // gentle wave across the field
      const arr = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] = baseY[i] + Math.sin(t * 0.7 + phase[i] + arr[i * 3] * 0.5) * 0.28;
      }
      geo.attributes.position.needsUpdate = true;

      points.rotation.y = t * 0.025 + mx * 0.22;
      points.rotation.x = my * 0.12;

      ico.rotation.x = t * 0.16;
      ico.rotation.y = t * 0.22;
      ico.position.y = 0.8 + Math.sin(t * 0.6) * 0.35;

      torus.rotation.z = t * 0.12;

      camera.position.x += (mx * 0.7 - camera.position.x) * 0.045;
      camera.position.y += (my * 0.45 - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (running) renderFrame();
    };

    if (reduced) {
      renderFrame();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      geo.dispose();
      mat.dispose();
      ico.geometry.dispose();
      ico.material.dispose();
      torus.geometry.dispose();
      torus.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="threebg" aria-hidden="true" />;
};
