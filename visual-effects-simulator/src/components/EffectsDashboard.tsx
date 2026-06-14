import React, { useState, useEffect, useRef } from 'react';
import { Snowflake, Sparkles, Timer, Activity, Info, ShieldCheck } from 'lucide-react';
import { BaseParticle, EffectType } from '../types';
import { ParticleLayer } from './ParticleLayer';

export const EffectsDashboard: React.FC = () => {
  const [activeEffect, setActiveEffect] = useState<EffectType>('none');
  const [particles, setParticles] = useState<BaseParticle[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sturdy clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const triggerEffect = (type: EffectType) => {
    // Clear all existing running timers first
    if (timerRef.current) clearInterval(timerRef.current);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

    const isSnow = type === 'snowflakes';
    const count = 45; // Generous number to create a rich but clean visual field
    const newParticles: BaseParticle[] = [];

    const balloonColors: ('red' | 'blue' | 'emerald' | 'amber' | 'purple' | 'pink')[] = [
      'red',
      'blue',
      'emerald',
      'amber',
      'purple',
      'pink',
    ];

    // Generate balanced random distributions for medium particles
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `${type}-${i}-${Math.random()}`,
        // Distribute left positions evenly to span the full screen nicely
        x: 2 + (i * 96) / count + (Math.random() * 4 - 2), 
        // Medium size constraints specified in guidelines
        size: isSnow ? 18 + Math.random() * 8 : 36 + Math.random() * 8, 
        delay: Math.random() * 1.8, // Smoothly staggered entry times over 1.8 seconds
        duration: isSnow ? 3.2 + Math.random() * 1.3 : 4.0 + Math.random() * 1.5, // Buoyant rise speeds vs gravity fall speeds
        swayDistance: 20 + Math.random() * 20, // 20px to 40px elegant lateral wobble
        color: !isSnow ? balloonColors[Math.floor(Math.random() * balloonColors.length)] : undefined,
        opacity: 0.5 + Math.random() * 0.4,
      });
    }

    setParticles(newParticles);
    setActiveEffect(type);
    setIsFadingOut(false);
    setTimeRemaining(5.00);

    const startTime = Date.now();
    const durationLimit = 5000; // Exactly 5 seconds simulation run

    // Fast resolution interval (16ms) for a premium fluid millisecond timer display
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (durationLimit - elapsed) / 1000);
      setTimeRemaining(remaining);
    }, 16);

    // Clean fade out starts exactly 500ms before completion
    fadeTimeoutRef.current = setTimeout(() => {
      setIsFadingOut(true);
    }, durationLimit - 500);

    // Complete cleanup and cycle reset
    resetTimeoutRef.current = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setActiveEffect('none');
      setParticles([]);
      setTimeRemaining(0);
      setIsFadingOut(false);
    }, durationLimit);
  };

  // Percent calculation for the aesthetic timer progress bar
  const progressPercent = activeEffect !== 'none' ? (timeRemaining / 5.0) * 100 : 0;

  return (
    <div id="effects-dashboard-root" className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 text-slate-100 selection:bg-slate-800">
      
      {/* Immersive Dark Background with Matte Theme Minimal Accents */}
      <div id="dashboard-graphics-backdrop" className="absolute inset-0 -z-10 bg-[#0F1113] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/3 blur-[160px] pointer-events-none" />
      </div>

      {/* Top Nav: Aurelius Interface */}
      <header id="dashboard-header" className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="font-serif text-[1.3rem] tracking-[2px] uppercase italic text-brand-accent">
            Aurelius Interface
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-white/50">
          <div className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full mr-1 shadow-[0_0_8px_#4CAF50] animate-pulse" />
          <span className="font-sans">Atmospheric Protocol Active</span>
        </div>
      </header>

      {/* Main Stage Panel */}
      <main id="dashboard-main-content" className="w-full max-w-4xl mx-auto my-auto py-8 flex flex-col items-center">
        
        {/* Bold Typography Majesty Heading */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-[52px] sm:text-[72px] md:text-[84px] leading-[0.95] font-normal tracking-tight text-white mb-4">
            Environmental<br />Simulation
          </h2>
          <p className="text-xs sm:text-[14px] uppercase tracking-[4px] text-white/50">
            Initiate localized particle dynamics
          </p>
        </div>

        {/* Centralized Control Panel Card with luxury formal details */}
        <div 
          id="main-control-card"
          className="relative overflow-hidden w-full max-w-2xl rounded-xl border border-white/10 bg-[#15181b]/40 backdrop-blur-md p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Subtle horizontal highlight band at top */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

          {/* Current Active Overlay Status Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 border border-white/5 rounded">
              <Activity className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-white/70">
                STATUS:{' '}
                {activeEffect === 'none' && <span className="text-white/40 uppercase font-bold">STANDBY</span>}
                {activeEffect === 'snowflakes' && <span className="text-brand-accent uppercase font-bold tracking-widest animate-pulse">SNOWFLAKES falling</span>}
                {activeEffect === 'balloons' && <span className="text-brand-accent uppercase font-bold tracking-widest animate-pulse">BALLOONS floating</span>}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-white/40 font-mono text-xs uppercase tracking-wider">
              <Timer className="w-3.5 h-3.5 text-brand-accent" />
              <span>5.00s Clock</span>
            </div>
          </div>

          {/* Core Controls: Dynamic Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            
            {/* Snowflakes Button */}
            <button
              id="trigger-snowflakes-button"
              type="button"
              onClick={() => triggerEffect('snowflakes')}
              disabled={activeEffect === 'snowflakes'}
              className={`group relative flex items-center justify-center gap-3 px-8 py-4.5 border text-xs tracking-[2px] uppercase transition-all duration-300 font-sans cursor-pointer ${
                activeEffect === 'snowflakes'
                  ? 'bg-[#1e2022] border-brand-accent text-brand-accent shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-transparent border-white/20 hover:border-brand-accent text-white hover:text-brand-accent'
              }`}
            >
              <Snowflake id="btn-snow-icon" className={`w-4 h-4 transition-transform duration-500 ${activeEffect === 'snowflakes' ? 'rotate-90 text-brand-accent' : 'text-white/40 group-hover:text-brand-accent'}`} />
              <span className="font-semibold text-white group-hover:text-brand-accent">Snowflakes</span>
            </button>

            {/* Balloons Button */}
            <button
              id="trigger-balloons-button"
              type="button"
              onClick={() => triggerEffect('balloons')}
              disabled={activeEffect === 'balloons'}
              className={`group relative flex items-center justify-center gap-3 px-8 py-4.5 border text-xs tracking-[2px] uppercase transition-all duration-300 font-sans cursor-pointer ${
                activeEffect === 'balloons'
                  ? 'bg-[#1e2022] border-brand-accent text-brand-accent shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-transparent border-white/20 hover:border-brand-accent text-white hover:text-brand-accent'
              }`}
            >
              <Sparkles id="btn-balloons-icon" className={`w-4 h-4 transition-transform duration-500 ${activeEffect === 'balloons' ? 'scale-110 text-brand-accent' : 'text-white/40 group-hover:text-brand-accent'}`} />
              <span className="font-semibold text-white group-hover:text-brand-accent">Balloons</span>
            </button>

          </div>

          {/* Informational Parameter Block */}
          <div className="bg-black/30 border border-white/5 rounded p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] tracking-wider text-white/40 font-mono uppercase">
              <Info className="w-3.5 h-3.5 text-brand-accent" />
              <span>Simulation Specifications Overview</span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 pt-2 text-[11px] font-mono border-t border-white/5 uppercase tracking-wider text-white/60">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">Duration</span>
                <span className="text-white">5.00 Sec</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">Spawn Rate</span>
                <span className="text-white">45 Items</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/40">Scale Mode</span>
                <span className="text-white">Medium Only</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/40">Process</span>
                <span className="text-white">Hardware GPU</span>
              </div>
            </div>
          </div>

          {/* Timeline and system progress indicators */}
          <div className="mt-8 pt-6 border-t border-white/10">
            {activeEffect !== 'none' ? (
              <div id="active-countdown-timeline" className="space-y-3">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider font-mono">
                  <span className="text-white/40">Executing Simulation...</span>
                  <span className="text-brand-accent font-semibold bg-black/50 px-2 py-0.5 rounded border border-white/5">
                    {timeRemaining.toFixed(2)}S
                  </span>
                </div>
                
                {/* Gold theme progress bar */}
                <div className="h-[3px] w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div
                    id="countdown-bar-fill"
                    className="h-full bg-brand-accent shadow-[0_0_8px_#D4AF37] transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div id="countdown-standby-state" className="flex items-center justify-center py-2 bg-black/25 rounded border border-dashed border-white/5">
                <p className="text-[10px] text-white/35 font-mono uppercase tracking-[0.16em] animate-pulse">
                  System Standby — Select Calibration Matrix Above
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer in precise response to specifications (Ref ID, Est 2024, Coordinates) */}
      <footer id="dashboard-footer" className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 mt-8 text-[11px] text-white/40 font-mono uppercase tracking-[1.5px]">
        <div>Ref. ID: 409-XP2</div>
        <div className="my-2 sm:my-0">Est. 2024 &copy; Formal Systems Inc.</div>
        <div>Lat: 40.7128 N</div>
      </footer>

      {/* Particle Overlay Animation Layer */}
      <ParticleLayer
        effect={activeEffect}
        particles={particles}
        isFadingOut={isFadingOut}
      />
      
    </div>
  );
};
