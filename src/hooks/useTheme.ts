import { useState, useEffect } from 'react';

export type ThemePreset = 'modern_light' | 'glass' | 'soft_gradient' | 'minimal';

export interface ThemeContent {
  preset: ThemePreset;
  primary_color: string;
  secondary_color: string;
  background_style: string;
  font_family: string;
  font_scale: string;
  button_style: string;
  card_style: string;
}

const defaultTheme: ThemeContent = {
  preset: 'modern_light',
  primary_color: '#3B82F6',
  secondary_color: '#8B5CF6',
  background_style: 'soft_gradient',
  font_family: 'system-ui',
  font_scale: '1',
  button_style: 'rounded',
  card_style: 'glass',
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemeContent>(defaultTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/theme.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setTheme({ ...defaultTheme, ...data }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary_color);
    root.style.setProperty('--color-secondary', theme.secondary_color);
    root.style.setProperty('--font-family', theme.font_family);
    root.style.setProperty('--font-scale', theme.font_scale);
  }, [theme, loading]);

  return { theme, loading };
}
