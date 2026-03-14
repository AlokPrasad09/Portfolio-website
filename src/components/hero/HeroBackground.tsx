import type { HeroContent } from '../../hooks/useHero';
import { ParticlesBackground } from './ParticlesBackground';
import { AuroraBackground } from './AuroraBackground';
import { GradientWavesBackground } from './GradientWavesBackground';
import { CyberGridBackground } from './CyberGridBackground';
import { Hero3DLayer } from './Hero3DLayer';

interface HeroBackgroundProps {
  hero: HeroContent;
}

export function HeroBackground({ hero }: HeroBackgroundProps) {
  const type = hero.background_animation_type || 'aurora';
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      {type === 'particles' && <ParticlesBackground />}
      {type === 'aurora' && <AuroraBackground />}
      {type === 'gradient_waves' && <GradientWavesBackground />}
      {type === 'cyber_grid' && <CyberGridBackground />}
      {hero.enable_3d_animation && <Hero3DLayer />}
    </div>
  );
}
