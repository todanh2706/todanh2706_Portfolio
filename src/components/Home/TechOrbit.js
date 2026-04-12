import React, { useState, useRef, useCallback, useEffect } from "react";

import ReactIcon from "../../Assets/TechIcons/React.svg";
import CplusplusIcon from "../../Assets/TechIcons/C++.svg";
import DockerIcon from "../../Assets/TechIcons/Docker.svg";
import FirebaseIcon from "../../Assets/TechIcons/Firebase.svg";
import JavaIcon from "../../Assets/TechIcons/Java.svg";
import PostmanIcon from "../../Assets/TechIcons/Postman.svg";
import SQLIcon from "../../Assets/TechIcons/SQL.svg";
import TailwindIcon from "../../Assets/TechIcons/Tailwind.svg";
import TypescriptIcon from "../../Assets/TechIcons/Typescript.svg";
import SpringbootIcon from "../../Assets/TechIcons/Springboot.svg";
import GithubIcon from "../../Assets/TechIcons/Git.svg";
import RedisIcon from "../../Assets/TechIcons/Redis.svg";

// ─── Define your tech stack here ─────────────────────────────
const TECH_ITEMS = [
  { icon: ReactIcon, name: "React" },
  { icon: CplusplusIcon, name: "C++" },
  { icon: DockerIcon, name: "Docker" },
  { icon: FirebaseIcon, name: "Firebase" },
  { icon: JavaIcon, name: "Java" },
  { icon: PostmanIcon, name: "Postman" },
  { icon: SQLIcon, name: "SQL" },
  { icon: TailwindIcon, name: "Tailwind" },
  { icon: TypescriptIcon, name: "Typescript" },
  { icon: SpringbootIcon, name: "Springboot" },
  { icon: GithubIcon, name: "Github" },
  { icon: RedisIcon, name: "Redis" },
];

const BUBBLE_SIZE = 380;
const ICON_RADIUS = 32; // collision radius per icon (half of visual size)
const MIN_DIST = ICON_RADIUS * 2 + 8; // minimum center-to-center distance
const BOUNDARY_PADDING = ICON_RADIUS + 6; // keep icons inside the bubble

// Pre-compute orbit configs
const ICON_CONFIGS = TECH_ITEMS.map((_, i) => {
  const count = TECH_ITEMS.length;
  const angle = (i / count) * Math.PI * 2;
  // Alternate between two rings to spread icons out
  const ring = i % 2 === 0 ? 0.24 : 0.38;
  return {
    baseAngle: angle,
    orbitRadius: ring, // fraction of half-bubble
    speed: 0.12 + (i % 3) * 0.06,
    floatAmp: 3 + (i % 3) * 2,
    floatSpeed: 1.5 + (i % 3) * 0.5,
    floatDelay: (i * 0.8) % 4,
    size: 36 + (i % 3) * 4,
  };
});

// Initialize starting positions evenly spaced
function initPositions() {
  const center = BUBBLE_SIZE / 2;
  return ICON_CONFIGS.map((cfg) => {
    const r = cfg.orbitRadius * (BUBBLE_SIZE / 2);
    return {
      x: center + Math.cos(cfg.baseAngle) * r,
      y: center + Math.sin(cfg.baseAngle) * r,
    };
  });
}

function TechOrbit() {
  const bubbleRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [positions, setPositions] = useState(initPositions);
  const posRef = useRef(initPositions());
  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const center = BUBBLE_SIZE / 2;
    const maxR = BUBBLE_SIZE / 2 - BOUNDARY_PADDING;

    const tick = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const t = (ts - startTimeRef.current) / 1000;
      const prev = posRef.current;
      const next = prev.map((pos, i) => ({ ...pos }));

      // Step 1: Compute target position from orbit
      for (let i = 0; i < next.length; i++) {
        const cfg = ICON_CONFIGS[i];
        const angle = cfg.baseAngle + t * cfg.speed;
        const r = cfg.orbitRadius * (BUBBLE_SIZE / 2);
        const floatY =
          Math.sin(t * cfg.floatSpeed + cfg.floatDelay) * cfg.floatAmp;

        const targetX = center + Math.cos(angle) * r;
        const targetY = center + Math.sin(angle) * r + floatY;

        // Soft spring toward target (don't snap, allow repulsion to override)
        next[i].x += (targetX - next[i].x) * 0.04;
        next[i].y += (targetY - next[i].y) * 0.04;
      }

      // Step 2: Repulsion — push apart overlapping icons
      for (let i = 0; i < next.length; i++) {
        for (let j = i + 1; j < next.length; j++) {
          const dx = next[j].x - next[i].x;
          const dy = next[j].y - next[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MIN_DIST && dist > 0.1) {
            const overlap = MIN_DIST - dist;
            const pushX = (dx / dist) * overlap * 0.5;
            const pushY = (dy / dist) * overlap * 0.5;
            next[i].x -= pushX;
            next[i].y -= pushY;
            next[j].x += pushX;
            next[j].y += pushY;
          }
        }
      }

      // Step 3: Contain inside bubble boundary
      for (let i = 0; i < next.length; i++) {
        const dx = next[i].x - center;
        const dy = next[i].y - center;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxR) {
          next[i].x = center + (dx / dist) * maxR;
          next[i].y = center + (dy / dist) * maxR;
        }
      }

      posRef.current = next;
      setPositions(next.map((p) => ({ ...p })));
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Mouse → 3D tilt
  const handleMouseMove = useCallback((e) => {
    if (!bubbleRef.current) return;
    const rect = bubbleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientX - cx) / (rect.width / 2)) * 18;
    const y = (-(e.clientY - cy) / (rect.height / 2)) * 18;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHoveredIndex(null);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: "40px",
      }}
    >
      <div
        ref={bubbleRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tech-bubble"
        style={{
          position: "relative",
          width: `${BUBBLE_SIZE}px`,
          height: `${BUBBLE_SIZE}px`,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.08) 0%, rgba(212,160,23,0.04) 40%, rgba(0,0,0,0.15) 100%)",
          border: "1.5px solid rgba(212, 160, 23, 0.18)",
          boxShadow: `
            inset 0 0 60px rgba(212, 160, 23, 0.06),
            inset 0 -20px 40px rgba(0, 0, 0, 0.15),
            0 0 80px rgba(212, 160, 23, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.3)
          `,
          backdropFilter: "blur(6px)",
          overflow: "hidden",
          cursor: "grab",
          transition: "transform 0.15s ease-out",
          transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Specular highlight — top-left shine */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "15%",
            width: "35%",
            height: "25%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />

        {/* Bottom reflection */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "25%",
            width: "50%",
            height: "12%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(212,160,23,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />

        {/* Floating icons */}
        {TECH_ITEMS.map((item, index) => {
          const cfg = ICON_CONFIGS[index];
          const pos = positions[index];
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="tech-bubble-icon"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "absolute",
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : 1}) translateZ(${isHovered ? 40 : 0}px)`,
                transition:
                  "transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s, background 0.3s",
                width: `${cfg.size + 24}px`,
                height: `${cfg.size + 24}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: isHovered
                  ? "rgba(212, 160, 23, 0.18)"
                  : "rgba(255, 255, 255, 0.04)",
                border: isHovered
                  ? "1px solid rgba(212, 160, 23, 0.5)"
                  : "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: isHovered
                  ? "0 0 20px rgba(212, 160, 23, 0.35), 0 0 40px rgba(212, 160, 23, 0.1)"
                  : "none",
                cursor: "pointer",
                zIndex: isHovered ? 30 : 10,
              }}
            >
              <img
                src={item.icon}
                alt={item.name}
                style={{
                  width: `${cfg.size}px`,
                  height: `${cfg.size}px`,
                  objectFit: "contain",
                  filter: isHovered
                    ? "drop-shadow(0 0 8px rgba(240,192,64,0.6)) brightness(1.2)"
                    : "brightness(0.85)",
                  transition: "filter 0.3s",
                  pointerEvents: "none",
                }}
              />
            </div>
          );
        })}

        {/* Tooltip for hovered icon */}
        {hoveredIndex !== null && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "4px 14px",
              borderRadius: "20px",
              background: "rgba(0, 0, 0, 0.7)",
              border: "1px solid rgba(212, 160, 23, 0.4)",
              color: "#f0c040",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              zIndex: 40,
              pointerEvents: "none",
              backdropFilter: "blur(8px)",
            }}
          >
            {TECH_ITEMS[hoveredIndex].name}
          </div>
        )}
      </div>
    </div>
  );
}

export default TechOrbit;
