import { useState, useEffect } from 'react';

export interface CmsProject {
  title: string;
  description: string;
  tech_stack: string[];
  github_link?: string;
  demo_link?: string;
  image?: string;
}

export interface CmsSkill {
  name: string;
  category: string;
  level: string;
}

export interface CmsCertificate {
  title: string;
  issuer: string;
  year: number;
  image?: string;
}

const defaultProjects: CmsProject[] = [
  {
    title: 'NCERT AI Assistant',
    description: 'An AI-powered assistant that understands NCERT PDFs and helps students learn faster.',
    tech_stack: ['Python', 'LLMs', 'Vector DB', 'React'],
    github_link: 'https://github.com/AlokPrasad09/ncert_ai_tutor',
    demo_link: '',
    image: '',
  },
  {
    title: 'PDF AI Tool',
    description: 'Document AI system that ingests PDFs and answers questions grounded in content.',
    tech_stack: ['Document AI', 'RAG', 'Node.js', 'TypeScript'],
    github_link: 'https://github.com/AlokPrasad09',
    demo_link: '',
    image: '',
  },
  {
    title: 'AI Chatbot',
    description: 'ChatGPT-style chatbot with conversational memory and custom behavior.',
    tech_stack: ['Chat UI', 'LLM', 'React', 'Framer Motion'],
    github_link: 'https://github.com/AlokPrasad09',
    demo_link: '',
    image: '',
  },
];

export function useCmsProjects() {
  const [projects, setProjects] = useState<CmsProject[]>(defaultProjects);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/content/projects.json')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data?.projects)) setProjects(data.projects);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { projects, loading };
}

export function useCmsSkills() {
  const [skills, setSkills] = useState<CmsSkill[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/content/skills.json')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data?.skills)) setSkills(data.skills);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { skills, loading };
}

export function useCmsCertificates() {
  const [certificates, setCertificates] = useState<CmsCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/content/certificates.json')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data?.certificates)) setCertificates(data.certificates);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { certificates, loading };
}
