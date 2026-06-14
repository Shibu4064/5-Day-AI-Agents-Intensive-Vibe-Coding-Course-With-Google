export type EffectType = 'none' | 'snowflakes' | 'balloons';

export interface BaseParticle {
  id: string;
  x: number; // 0 to 100 percentage
  size: number; // px size
  delay: number; // seconds
  duration: number; // seconds
  swayDistance: number; // px or %
  rotationSpeed?: number; // deg/s
  color?: string; // gradient identifier for balloons
  opacity: number;
}
