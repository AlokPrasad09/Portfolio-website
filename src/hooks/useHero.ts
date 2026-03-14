import { useState, useEffect } from 'react';

export interface HeroContent {
  name: string;
  tagline: string;
  subtitle: string;
  profile_image: string;
  background_animation_type: 'particles' | 'aurora' | 'gradient_waves' | 'cyber_grid';
  enable_3d_animation: boolean;
}

const defaultHero: HeroContent = {
  name: 'Alok Prasad',
  tagline: 'Building AI tools and intelligent applications',
  subtitle: "I'm an AI developer focused on turning ideas into intelligent products—from chatbots and document AI to full-stack AI applications.",
  profile_image: '',
  background_animation_type: 'aurora',
  enable_3d_animation: false,
};

export function useHero() {
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/content/hero.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setHero({ ...defaultHero, ...data }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { hero, loading };
}
