import React from 'react';
import { motion } from 'motion/react';
import { Snowflake } from 'lucide-react';
import { BaseParticle } from '../types';

interface ParticleLayerProps {
  effect: 'none' | 'snowflakes' | 'balloons';
  particles: BaseParticle[];
  isFadingOut: boolean;
}

// Solid professional color variants for balloons
const BALLOON_COLORS = {
  red: { light: '#f43f5e', dark: '#be123c' },
  blue: { light: '#38bdf8', dark: '#0369a1' },
  emerald: { light: '#34d399', dark: '#047857' },
  amber: { light: '#fbbf24', dark: '#b45309' },
  purple: { light: '#c084fc', dark: '#6b21a8' },
  pink: { light: '#f472b6', dark: '#be185d' },
};

export const ParticleLayer: React.FC<ParticleLayerProps> = ({
  effect,
  particles,
  isFadingOut,
}) => {
  if (effect === 'none' || particles.length === 0) return null;

  return (
    <div
      id="global-particle-canvas-overlay"
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {particles.map((particle) => {
        if (effect === 'snowflakes') {
          return (
            <motion.div
              key={particle.id}
              id={`snowflake-particle-${particle.id}`}
              className="absolute text-sky-100/90"
              style={{
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                filter: `drop-shadow(0 0 6px rgba(186, 230, 253, 0.45))`,
              }}
              initial={{ y: '-15vh', x: 0, rotate: 0 }}
              animate={{
                y: ['-10vh', '110vh'],
                x: [-particle.swayDistance, particle.swayDistance, -particle.swayDistance],
                rotate: [0, 360],
              }}
              transition={{
                y: {
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: particle.delay,
                },
                x: {
                  duration: particle.duration * 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: particle.delay,
                },
                rotate: {
                  duration: particle.duration * 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: particle.delay,
                },
              }}
            >
              <Snowflake
                id={`snowflake-icon-${particle.id}`}
                className="w-full h-full stroke-[1.2]"
              />
            </motion.div>
          );
        } else {
          // Balloons effect
          const colorName = (particle.color || 'blue') as keyof typeof BALLOON_COLORS;
          const colors = BALLOON_COLORS[colorName] || BALLOON_COLORS.blue;

          return (
            <motion.div
              key={particle.id}
              id={`balloon-particle-${particle.id}`}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size * 2}px`, // Balloons include string length
              }}
              initial={{ y: '115vh', x: 0, rotate: 0 }}
              animate={{
                y: ['110vh', '-20vh'],
                x: [-particle.swayDistance, particle.swayDistance, -particle.swayDistance],
                rotate: [-8, 8, -8],
              }}
              transition={{
                y: {
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: particle.delay,
                },
                x: {
                  duration: particle.duration * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: particle.delay,
                },
                rotate: {
                  duration: particle.duration * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: particle.delay,
                },
              }}
            >
              <svg
                id={`balloon-svg-${particle.id}`}
                width="100%"
                height="100%"
                viewBox="0 0 40 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                <defs>
                  <radialGradient
                    id={`balloon-glow-${particle.id}`}
                    cx="30%"
                    cy="30%"
                    r="70%"
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                    <stop offset="45%" stopColor={colors.light} />
                    <stop offset="100%" stopColor={colors.dark} />
                  </radialGradient>
                </defs>
                {/* Wavy subtle string */}
                <path
                  d="M20,40 C17,48 23,56 20,64 C18,68 19,74 20,80"
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  opacity="0.8"
                />
                {/* Tied knot at bottom */}
                <path
                  d="M20,38 L16,43 L24,43 Z"
                  fill={colors.dark}
                />
                {/* Balloon body */}
                <ellipse cx="20" cy="20" rx="14" ry="18" fill={`url(#balloon-glow-${particle.id})`} />
                {/* Elegant reflection shine */}
                <path
                  d="M11,12 C13,8 17,8 19,9"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
              </svg>
            </motion.div>
          );
        }
      })}
    </div>
  );
};
