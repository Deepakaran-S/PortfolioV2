import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  Sprite,
  SpriteMaterial,
  WebGLRenderer,
} from "three";

const END_AT = 2.1;
const FINAL_AT = 1.95;
const SETTLE = 0.5;
const HOLD = 0.4;
const FLARE_TIME = 0.32;
const MAX_STREAKS = 360;
const MAX_EMBERS = 120;
const TRAIL_PER_FRAME = 3;
const BURST_STREAKS = 40;
const BURST_EMBERS = 8;
const GRAVITY = 560;
const STREAK_TAIL = 0.06;

const STROKES = [
  { at: 0.6, sweep: 0.2, from: "TL", to: "TR", flash: 0.18, shake: 8 },
  { at: 0.95, sweep: 0.22, from: "TR", to: "BL", flash: 0.5, shake: 16 },
  { at: 1.3, sweep: 0.2, from: "BL", to: "BR", flash: 0.18, shake: 8 },
];

const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 2.4);

function createStreakTexture() {
  const width = 128;
  const height = 64;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const vertical = ctx.createLinearGradient(0, 0, 0, height);
  vertical.addColorStop(0, "rgba(255,40,20,0)");
  vertical.addColorStop(0.5, "rgba(255,84,44,1)");
  vertical.addColorStop(1, "rgba(255,40,20,0)");
  ctx.fillStyle = vertical;
  ctx.fillRect(0, 0, width, height);
  const horizontal = ctx.createLinearGradient(0, 0, width, 0);
  horizontal.addColorStop(0, "rgba(0,0,0,0)");
  horizontal.addColorStop(0.06, "rgba(0,0,0,1)");
  horizontal.addColorStop(1, "rgba(0,0,0,1)");
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillStyle = horizontal;
  ctx.fillRect(0, 0, width, height);
  return new CanvasTexture(canvas);
}

function createRadialTexture(inner, outer) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(1, outer);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

function createStroke(streak, flareTexture) {
  const group = new Group();
  const plane = () => new PlaneGeometry(1, 1).translate(0.5, 0, 0);
  const glow = new Mesh(plane(), new MeshBasicMaterial({ map: streak, transparent: true, blending: AdditiveBlending, depthWrite: false }));
  const core = new Mesh(plane(), new MeshBasicMaterial({ color: 0xfff0d2, transparent: true, blending: AdditiveBlending, depthWrite: false }));
  const head = new Sprite(new SpriteMaterial({ map: flareTexture, transparent: true, blending: AdditiveBlending, depthWrite: false }));
  group.add(glow, core);
  group.visible = false;
  head.visible = false;
  return { group, glow, core, head };
}

function createStreaks() {
  const positions = new Float32Array(MAX_STREAKS * 6);
  const colors = new Float32Array(MAX_STREAKS * 6);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  const material = new LineBasicMaterial({ vertexColors: true, transparent: true, blending: AdditiveBlending, depthWrite: false });
  return {
    lines: new LineSegments(geometry, material),
    positions,
    colors,
    x: new Float32Array(MAX_STREAKS),
    y: new Float32Array(MAX_STREAKS),
    vx: new Float32Array(MAX_STREAKS),
    vy: new Float32Array(MAX_STREAKS),
    born: new Float32Array(MAX_STREAKS).fill(-10),
    life: new Float32Array(MAX_STREAKS).fill(1),
  };
}

function createEmbers(sprite, size) {
  const positions = new Float32Array(MAX_EMBERS * 3);
  const colors = new Float32Array(MAX_EMBERS * 3);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  const material = new PointsMaterial({ size, map: sprite, vertexColors: true, transparent: true, blending: AdditiveBlending, depthWrite: false, sizeAttenuation: false });
  return {
    points: new Points(geometry, material),
    positions,
    colors,
    vx: new Float32Array(MAX_EMBERS),
    vy: new Float32Array(MAX_EMBERS),
    born: new Float32Array(MAX_EMBERS).fill(-10),
    life: new Float32Array(MAX_EMBERS).fill(1),
  };
}

export function createSlashIntro({ canvas, flashEl, onComplete }) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 10;

  const streakTexture = createStreakTexture();
  const flareTexture = createRadialTexture("rgba(255,240,200,1)", "rgba(255,70,25,0)");
  const emberTexture = createRadialTexture("rgba(255,255,255,1)", "rgba(255,255,255,0)");

  const strokes = STROKES.map(() => createStroke(streakTexture, flareTexture));
  strokes.forEach((s) => scene.add(s.group, s.head));

  const streaks = createStreaks();
  scene.add(streaks.lines);
  const embers = createEmbers(emberTexture, 7 * pixelRatio);
  scene.add(embers.points);

  const geometry = STROKES.map(() => ({ from: [0, 0], angle: 0, length: 1, impact: [0, 0] }));
  const view = { thickness: 4 };

  const layout = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    view.thickness = clamp(Math.min(w, h) * 0.0085, 3, 9);
    renderer.setSize(w, h, false);
    camera.left = -w / 2;
    camera.right = w / 2;
    camera.top = h / 2;
    camera.bottom = -h / 2;
    camera.updateProjectionMatrix();

    const over = w * 0.04;
    const top = h / 2 - h * 0.08;
    const corners = {
      TL: [-w / 2 - over, top],
      TR: [w / 2 + over, top],
      BL: [-w / 2 - over, -top],
      BR: [w / 2 + over, -top],
    };
    STROKES.forEach((spec, i) => {
      const from = corners[spec.from];
      const to = corners[spec.to];
      const limit = w / 2 - Math.max(48, w * 0.05);
      const toX = clamp(to[0], -limit, limit);
      const fraction = (toX - from[0]) / (to[0] - from[0]);
      geometry[i] = {
        from,
        angle: Math.atan2(to[1] - from[1], to[0] - from[0]),
        length: Math.hypot(to[0] - from[0], to[1] - from[1]),
        impact: [from[0] + (to[0] - from[0]) * fraction, from[1] + (to[1] - from[1]) * fraction],
      };
    });
  };
  layout();
  window.addEventListener("resize", layout);

  let flash = 0;
  let shake = 0;
  let boost = 0;
  let streakCursor = 0;
  let emberCursor = 0;
  let completed = false;
  const fired = new Set();

  const emitStreaks = (x, y, time, count, angle, spread, speed) => {
    for (let i = 0; i < count; i += 1) {
      const slot = streakCursor % MAX_STREAKS;
      streakCursor += 1;
      const direction = angle + (Math.random() - 0.5) * spread;
      const velocity = speed * (0.35 + Math.random() * 0.65);
      streaks.x[slot] = x + (Math.random() - 0.5) * view.thickness;
      streaks.y[slot] = y + (Math.random() - 0.5) * view.thickness;
      streaks.vx[slot] = Math.cos(direction) * velocity;
      streaks.vy[slot] = Math.sin(direction) * velocity;
      streaks.born[slot] = time;
      streaks.life[slot] = 0.3 + Math.random() * 0.45;
    }
  };

  const emitEmbers = (x, y, time, count) => {
    for (let i = 0; i < count; i += 1) {
      const slot = emberCursor % MAX_EMBERS;
      emberCursor += 1;
      embers.positions[slot * 3] = x;
      embers.positions[slot * 3 + 1] = y;
      embers.positions[slot * 3 + 2] = 1;
      embers.vx[slot] = (Math.random() - 0.5) * 160;
      embers.vy[slot] = Math.random() * 140;
      embers.born[slot] = time;
      embers.life[slot] = 0.9 + Math.random() * 0.8;
    }
  };

  const updateStreaks = (time, dt) => {
    const drag = Math.exp(-dt * 1.6);
    for (let i = 0; i < MAX_STREAKS; i += 1) {
      const age = (time - streaks.born[i]) / streaks.life[i];
      const alive = age >= 0 && age <= 1;
      const fade = alive ? 1 - age : 0;
      if (alive) {
        streaks.vy[i] -= GRAVITY * dt;
        streaks.vx[i] *= drag;
        streaks.vy[i] *= drag;
        streaks.x[i] += streaks.vx[i] * dt;
        streaks.y[i] += streaks.vy[i] * dt;
      }
      const o = i * 6;
      streaks.positions[o] = streaks.x[i];
      streaks.positions[o + 1] = streaks.y[i];
      streaks.positions[o + 2] = 1;
      streaks.positions[o + 3] = streaks.x[i] - streaks.vx[i] * STREAK_TAIL;
      streaks.positions[o + 4] = streaks.y[i] - streaks.vy[i] * STREAK_TAIL;
      streaks.positions[o + 5] = 1;
      streaks.colors[o] = fade;
      streaks.colors[o + 1] = 0.66 * fade;
      streaks.colors[o + 2] = 0.22 * fade;
      streaks.colors[o + 3] = 0.45 * fade;
      streaks.colors[o + 4] = 0.12 * fade;
      streaks.colors[o + 5] = 0.04 * fade;
    }
    streaks.lines.geometry.attributes.position.needsUpdate = true;
    streaks.lines.geometry.attributes.color.needsUpdate = true;
  };

  const updateEmbers = (time, dt) => {
    for (let i = 0; i < MAX_EMBERS; i += 1) {
      const age = (time - embers.born[i]) / embers.life[i];
      const fade = age < 0 || age > 1 ? 0 : 1 - age;
      if (fade > 0) {
        embers.positions[i * 3] += embers.vx[i] * dt;
        embers.positions[i * 3 + 1] += embers.vy[i] * dt;
        embers.vy[i] -= 90 * dt;
      }
      embers.colors[i * 3] = fade;
      embers.colors[i * 3 + 1] = 0.5 * fade;
      embers.colors[i * 3 + 2] = 0.15 * fade;
    }
    embers.points.geometry.attributes.position.needsUpdate = true;
    embers.points.geometry.attributes.color.needsUpdate = true;
  };

  const start = performance.now();
  let last = start;
  let raf = 0;

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const t = (now - start) / 1000;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    STROKES.forEach((spec, i) => {
      const local = t - spec.at;
      const { group, glow, core, head } = strokes[i];
      const g = geometry[i];
      if (local < 0) return;

      if (!fired.has(i)) {
        fired.add(i);
        flash = Math.max(flash, spec.flash);
        shake = spec.shake;
      }

      const p = clamp(local / spec.sweep);
      const travelled = g.length * easeOut(p);
      const headX = g.from[0] + Math.cos(g.angle) * travelled;
      const headY = g.from[1] + Math.sin(g.angle) * travelled;

      group.visible = true;
      group.position.set(g.from[0], g.from[1], 0);
      group.rotation.z = g.angle;
      group.scale.x = Math.max(travelled, 0.001);
      core.scale.y = view.thickness;
      glow.scale.y = view.thickness * 11;

      const settle = clamp((local - spec.sweep) / SETTLE);
      const fade = Math.max(1 - (1 - HOLD) * settle, boost);
      core.material.opacity = fade;
      glow.material.opacity = 0.75 * fade;

      const after = local - spec.sweep;
      head.visible = p < 1 || after < FLARE_TIME;
      head.position.set(p < 1 ? headX : g.impact[0], p < 1 ? headY : g.impact[1], 2);
      const flare = p < 1 ? 1 : 1 + (after / FLARE_TIME) * 2.4;
      const headSize = view.thickness * 24 * flare;
      head.scale.set(headSize, headSize, 1);
      head.material.opacity = p < 1 ? 1 : 1 - clamp(after / FLARE_TIME);

      if (p < 1) emitStreaks(headX, headY, t, TRAIL_PER_FRAME, g.angle + Math.PI, 1.1, 520);
      if (p >= 1 && !fired.has(`end${i}`)) {
        fired.add(`end${i}`);
        emitStreaks(g.impact[0], g.impact[1], t, BURST_STREAKS, g.angle + Math.PI * 0.5 * (i === 1 ? -1 : 1), Math.PI * 1.6, 1100);
        emitEmbers(g.impact[0], g.impact[1], t, BURST_EMBERS);
        flash = Math.max(flash, spec.flash * 0.8);
      }
    });

    if (!fired.has("final") && t >= FINAL_AT) {
      fired.add("final");
      flash = 0.9;
      shake = 26;
      boost = 1;
    }

    updateStreaks(t, dt);
    updateEmbers(t, dt);

    flash *= Math.exp(-dt * 11);
    shake *= Math.exp(-dt * 9);
    boost *= Math.exp(-dt * 5);
    if (flashEl) flashEl.style.opacity = String(flash);

    camera.position.set((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake, 10);
    renderer.render(scene, camera);

    if (!completed && t >= END_AT) {
      completed = true;
      onComplete?.();
    }
  };
  raf = requestAnimationFrame(frame);

  const dispose = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", layout);
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) object.material.dispose();
    });
    streakTexture.dispose();
    flareTexture.dispose();
    emberTexture.dispose();
    renderer.dispose();
  };

  return { dispose };
}
