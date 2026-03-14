import { useState, useEffect } from 'react';

export const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'certificates', 'timeline', 'github', 'blog', 'resume', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

const defaultOrder: SectionId[] = ['hero', 'about', 'skills', 'projects', 'certificates', 'timeline', 'github', 'blog', 'resume', 'contact'];

export function useLayout() {
  const [order, setOrder] = useState<SectionId[]>(defaultOrder);
  const [enabled, setEnabled] = useState<Record<SectionId, boolean>>(
    Object.fromEntries(SECTION_IDS.map((id) => [id, true])) as Record<SectionId, boolean>
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/layout.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data.sections_order) && data.sections_order.length > 0) {
          const ids = data.sections_order.map((s: { id?: string }) => s.id).filter(Boolean);
          if (ids.length) setOrder(ids);
        }
        if (data.sections_enabled && typeof data.sections_enabled === 'object') {
          setEnabled((prev) => ({ ...prev, ...data.sections_enabled }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const orderedSections = order.filter((id) => enabled[id] ?? true);
  return { orderedSections, enabled, loading };
}
