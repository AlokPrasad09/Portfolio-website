import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { TbDownload, TbSunHigh } from 'react-icons/tb';
import { useCmsProjects, useCmsSkills, useCmsCertificates } from './hooks/useCmsContent';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { useHero } from './hooks/useHero';
import { useTheme } from './hooks/useTheme';
import { useLayout, type SectionId } from './hooks/useLayout';
import { Chatbot } from './components/Chatbot';
import { HeroBackground } from './components/hero/HeroBackground';

const SECTION_LABELS: Record<SectionId, string> = {
  hero: 'Hero',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  certificates: 'Certificates',
  timeline: 'Timeline',
  github: 'GitHub',
  blog: 'Blog',
  resume: 'Resume',
  contact: 'Contact',
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const glassCard =
  'backdrop-blur-xl bg-white/80 border border-slate-200/80 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.08)]';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function App() {
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { hero } = useHero();
  useTheme();
  const { orderedSections } = useLayout();
  const { projects: cmsProjects } = useCmsProjects();
  const { skills: cmsSkills } = useCmsSkills();
  const { certificates } = useCmsCertificates();
  const { repos: githubRepos, loading: reposLoading } = useGitHubRepos();

  const navSections = orderedSections.filter((id) => id !== 'hero');

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Light theme: soft gradient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/95 to-slate-100" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
          }}
        />
      </div>
      <Chatbot />

      {/* Page layout */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        {/* Navbar */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-lg font-semibold shadow-sm" style={{ color: 'var(--color-primary)' }}>
              AP
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                AI Developer
              </p>
              <p className="text-sm font-semibold text-slate-900">{hero.name}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-xl md:flex">
            {navSections.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {SECTION_LABELS[id]}
              </button>
            ))}
            <a
              href="/admin"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-3 py-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              Admin
            </a>
          </nav>

          <a
            href="/admin"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm backdrop-blur-xl transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Admin"
          >
            <TbSunHigh className="h-5 w-5" />
          </a>
        </header>

        {/* Hero + Sidebar */}
        <main className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          {orderedSections.includes('hero') && (
            <section
              id="hero"
              className={`${glassCard} relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10`}
            >
              <HeroBackground hero={hero} />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center"
              >
                <div className="flex-1 space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Available for AI projects
                  </div>
                  <div>
                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                      {hero.tagline?.includes(' and ')
                        ? (
                            <>
                              {hero.tagline.split(' and ')[0]}
                              <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
                                {' and '}
                                {hero.tagline.split(' and ')[1]}
                              </span>
                            </>
                          )
                        : hero.tagline}
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
                      {hero.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      View Projects
                    </button>
                    <a
                      href="/Alok_Prasad_Resume.pdf"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      <TbDownload className="h-4 w-4" />
                      Download Resume
                    </a>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                    >
                      Contact Me
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      <span>AI / ML</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                      <span>LLMs & Prompt Engineering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Full-stack with React</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                  className="relative mt-4 flex w-full justify-center md:mt-0 md:w-[230px]"
                >
                  <div className="relative h-52 w-52 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    {hero.profile_image ? (
                      <img
                        src={hero.profile_image}
                        alt={hero.name}
                        className="h-full w-full object-cover"
                        loading="eager"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 bg-slate-100 p-4">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-500 shadow-sm">
                          AI Developer
                        </span>
                        <p className="text-lg font-semibold text-slate-800">{hero.name}</p>
                        <p className="text-center text-xs text-slate-600">
                          Crafting intelligent experiences with code.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* Quick links / Social / GitHub stats preview */}
          <aside className="flex flex-col gap-4">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`${glassCard} px-5 py-4`}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Quick navigation
              </p>
              <div className="flex flex-wrap gap-2">
                {['Projects', 'Blog', 'Contact'].map((label) => {
                  const id = label.toLowerCase();
                  return (
                    <button
                      key={label}
                      onClick={() => scrollToSection(id)}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.25 }}
              className={`${glassCard} flex items-center justify-between px-5 py-4`}
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Connect
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Let&apos;s collaborate on AI products.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://github.com/AlokPrasad09"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-sm transition hover:bg-slate-200 hover:text-slate-900"
                  aria-label="GitHub"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alokprasad92"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-sm transition hover:bg-sky-500 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.salesforce.com/trailblazer/alokprasad"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-sm transition hover:bg-amber-400 hover:text-slate-900"
                  aria-label="Salesforce Trailblazer"
                >
                  <span className="text-[10px] font-semibold">Sf</span>
                </a>
                <a
                  href="mailto:youremail@example.com"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-sm transition hover:bg-emerald-500 hover:text-white"
                  aria-label="Email"
                >
                  <FiMail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </aside>
        </main>

        {/* Content sections – order and visibility from CMS layout */}
        <div className="mt-10 space-y-10">
          {orderedSections.includes('about') && (
          <motion.section
            id="about"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className={`${glassCard} px-6 py-6 sm:px-8 sm:py-8`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  About Me
                </h2>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  The journey into AI
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-600 sm:text-[0.95rem]">
              <p>
                My curiosity for technology naturally drew me toward artificial intelligence—
                the intersection where code starts to feel intelligent. What began as
                experimenting with small machine learning models quickly evolved into a deep
                fascination with how AI can understand language, documents, and human intent.
              </p>
              <p>
                Over time, I&apos;ve focused on building AI-powered tools that feel practical,
                fast, and genuinely helpful: assistants that read NCERT PDFs, systems that
                can search and reason over documents, and conversational agents that provide
                meaningful responses instead of canned answers.
              </p>
              <p>
                Today, my work centers on combining modern web development with AI—LLMs,
                vector search, and prompt engineering—to ship products that solve real-world
                problems for students, developers, and teams. I care about clean UX,
                explainable behavior, and building AI systems that people can trust.
              </p>
            </div>
          </motion.section>
          )}

          {orderedSections.includes('skills') && (
          <motion.section
            id="skills"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 md:grid-cols-[1.1fr_1fr]"
          >
            <div className={`${glassCard} px-6 py-6 sm:px-8 sm:py-7`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                    AI & Machine Learning
                  </h2>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                    Core AI toolkit
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(cmsSkills.length ? cmsSkills : [
                  { name: 'Python', category: 'AI / ML', level: 'Advanced' },
                  { name: 'Machine Learning', category: 'AI / ML', level: 'Advanced' },
                  { name: 'LLMs', category: 'AI / ML', level: 'Intermediate' },
                  { name: 'React', category: 'Development', level: 'Advanced' },
                ]).map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group flex items-center justify-between rounded-2xl border border-slate-700/70 bg-slate-900/60 px-4 py-3 text-sm text-slate-100"
                  >
                    <span>{skill.name}</span>
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      {skill.category} · {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className={`${glassCard} px-5 py-5`}>
                <h3 className="text-base font-semibold text-slate-50">
                  Development & Product
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  From idea to deployed, production-ready interfaces.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-100">
                  {['Web Development', 'React', 'TypeScript', 'APIs'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-900/70 px-3 py-1.5 text-sm text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${glassCard} px-5 py-5`}>
                <h3 className="text-base font-semibold text-slate-50">AI Tools</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Infrastructure for intelligent applications.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-100">
                  {['Vector Databases', 'AI Chatbots', 'Document AI', 'RAG Systems'].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-900/70 px-3 py-1.5 text-sm text-slate-200"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.section>
          )}

          {orderedSections.includes('projects') && (
          <motion.section
            id="projects"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                  Featured Projects
                </h2>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                  Selected AI work
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {cmsProjects.map((project, i) => {
                const gradient =
                  i % 3 === 0
                    ? 'linear-gradient(135deg, rgba(56,189,248,0.35), rgba(129,140,248,0.3))'
                    : i % 3 === 1
                      ? 'linear-gradient(135deg, rgba(236,72,153,0.42), rgba(248,113,113,0.35))'
                      : 'linear-gradient(135deg, rgba(129,140,248,0.4), rgba(45,212,191,0.35))';
                return (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className={`${glassCard} flex flex-col overflow-hidden`}
                  >
                    <div
                      className="relative h-36 w-full overflow-hidden"
                      style={{ backgroundImage: project.image ? `url(${project.image})` : gradient, backgroundSize: 'cover' }}
                    >
                      {!project.image && (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(15,23,42,0.2),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(15,23,42,0.35),transparent_55%)]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.3)_1px,transparent_0)] opacity-50 [background-size:18px_18px]" />
                        </>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                      <h3 className="text-base font-semibold text-slate-50">
                        {project.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-slate-300">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(project.tech_stack || []).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2 text-sm">
                        <a
                          href={project.github_link || 'https://github.com/AlokPrasad09'}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-600/80 bg-slate-950/60 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-300 hover:text-slate-50"
                        >
                          <FiGithub className="h-4 w-4" />
                          GitHub
                        </a>
                        <a
                          href={project.demo_link || '#'}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-primary-500/40 transition hover:shadow-primary-400/60"
                        >
                          Live demo
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>
          )}

          {orderedSections.includes('timeline') && (
          <motion.section
            id="timeline"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className={`${glassCard} px-6 py-6 sm:px-8 sm:py-8`}
          >
            <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
              Career Timeline
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
              How it all started
            </p>
            <ol className="mt-6 space-y-6 border-l border-slate-700/70 pl-4">
              {[
                {
                  title: 'Learning Programming',
                  subtitle:
                    'Started with core programming fundamentals and problem solving, building a strong base for later AI work.',
                },
                {
                  title: 'Exploring AI',
                  subtitle:
                    'Discovered machine learning and deep learning, experimenting with models that could classify, predict, and generate.',
                },
                {
                  title: 'Building AI Tools',
                  subtitle:
                    'Developed AI-driven tools like chatbots and document assistants, focusing on real, everyday use-cases.',
                },
                {
                  title: 'Launching Projects',
                  subtitle:
                    'Released polished AI applications, integrating modern UIs, APIs, and LLMs into production-ready experiences.',
                },
              ].map((item, idx) => (
                <li key={item.title} className="relative pl-4">
                  <span className="absolute -left-[9px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-primary-400 to-emerald-400 shadow-md shadow-primary-400/70" />
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Step {idx + 1}
                  </div>
                  <div className="text-sm font-semibold text-slate-100">
                    {item.title}
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{item.subtitle}</p>
                </li>
              ))}
            </ol>
          </motion.section>
          )}

          {/* Certificates */}
          {orderedSections.includes('certificates') && certificates.length > 0 && (
            <motion.section
              id="certificates"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className={`${glassCard} px-6 py-6 sm:px-8 sm:py-8`}
            >
              <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                Certificates
              </h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-400">
                Credentials & learning
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                  <motion.div
                    key={cert.title}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4"
                  >
                    {cert.image && (
                      <img src={cert.image} alt="" className="mb-3 h-20 w-full rounded-lg object-contain bg-slate-800/50" />
                    )}
                    <div className="text-base font-semibold text-slate-50">{cert.title}</div>
                    <div className="text-sm text-slate-400">{cert.issuer}</div>
                    <div className="text-xs text-slate-500">{cert.year}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {orderedSections.includes('github') && (
          <motion.section
            id="github"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 md:grid-cols-[1.1fr_1fr]"
          >
            <div className={`${glassCard} px-6 py-6 sm:px-8 sm:py-8`}>
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                GitHub Activity
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                Live stats & contributions
              </p>
              <p className="mt-3 text-sm text-slate-300">
                Live stats and repositories from GitHub.
              </p>
              {!reposLoading && githubRepos.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-medium text-slate-400">Repositories</p>
                  {githubRepos.slice(0, 5).map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm transition hover:border-primary-500/50"
                    >
                      <div className="font-semibold text-slate-100">{repo.name}</div>
                      {repo.description && (
                        <div className="mt-1 text-xs text-slate-400 line-clamp-2">{repo.description}</div>
                      )}
                      <div className="mt-2 flex gap-3 text-xs text-slate-500">
                        <span>★ {repo.stargazers_count}</span>
                        {repo.language && <span>{repo.language}</span>}
                      </div>
                    </a>
                  ))}
                </div>
              )}
              <div className="mt-4 space-y-4 text-sm">
                <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=AlokPrasad09&show_icons=true&theme=tokyonight&hide_border=true"
                    alt="GitHub stats"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70">
                  <img
                    src="https://github-readme-streak-stats.herokuapp.com/?user=AlokPrasad09&theme=tokyonight&hide_border=true"
                    alt="GitHub contribution streak"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70">
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=AlokPrasad09&layout=compact&theme=tokyonight&hide_border=true"
                    alt="Top languages"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div
              id="techstack"
              className={`${glassCard} flex flex-col px-6 py-6 sm:px-7 sm:py-8`}
            >
              <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                Tech Stack
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                Tools behind the work
              </p>
              <div className="mt-5 grid flex-1 grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                {[
                  'Python',
                  'TypeScript',
                  'React',
                  'Vite',
                  'Tailwind CSS',
                  'Framer Motion',
                  'Node.js',
                  'REST APIs',
                  'Vector DBs',
                ].map((tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ y: -3 }}
                    className="flex items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-center text-[11px] font-medium text-slate-100"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
          )}

          {orderedSections.includes('blog') && (
          <motion.section
            id="blog"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className={`${glassCard} px-6 py-6 sm:px-8 sm:py-8`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                  Articles & Notes
                </h2>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                  AI, ML & engineering
                </p>
              </div>
              <p className="max-w-md text-xs text-slate-300">
                A space for writing about artificial intelligence, machine learning,
                AI tooling, and practical programming tutorials.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Designing document-aware AI assistants',
                  tag: 'Document AI',
                },
                {
                  title: 'Building practical RAG systems for real users',
                  tag: 'RAG',
                },
                {
                  title: 'From prompt to product: shipping AI features',
                  tag: 'Product',
                },
              ].map((post) => (
                <article
                  key={post.title}
                  className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 transition hover:border-primary-400/80 hover:bg-slate-900"
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                      {post.tag}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold text-slate-100 group-hover:text-primary-200">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Draft space for future articles. Wire it up to a CMS or markdown posts
                    later.
                  </p>
                </article>
              ))}
            </div>
          </motion.section>
          )}

          {(orderedSections.includes('resume') || orderedSections.includes('contact')) && (
          <motion.section
            id="resume"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 md:grid-cols-[1.1fr_1fr]"
          >
            <div className={`${glassCard} px-6 py-6 sm:px-8 sm:py-8`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                    Resume
                  </h2>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                    Experience at a glance
                  </p>
                </div>
                <a
                  href="/Alok_Prasad_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-950/70 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-primary-400/80 hover:text-primary-200"
                >
                  <TbDownload className="h-4 w-4" />
                  <span>Download PDF</span>
                </a>
              </div>
              <div className="mt-5 rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4 text-xs text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Snapshot
                </p>
                <ul className="mt-3 space-y-2 text-[13px]">
                  <li>• AI developer with a focus on LLM-powered applications.</li>
                  <li>• Experience building chatbots, document assistants, and AI tools.</li>
                  <li>• Strong foundation in Python, React, and modern web stacks.</li>
                  <li>• Passionate about shipping polished, user-centric experiences.</li>
                </ul>
              </div>
            </div>

            <div
              id="contact"
              className={`${glassCard} flex flex-col px-6 py-6 sm:px-7 sm:py-8`}
            >
              <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                Contact
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                Let&apos;s work together
              </p>
              <form
                className="mt-4 space-y-3 text-sm"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value;
                  const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value;
                  const message = (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value;
                  if (!name || !email || !message) return;
                  setContactStatus('sending');
                  try {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name, email, message }),
                    });
                    if (res.ok) {
                      setContactStatus('sent');
                      form.reset();
                    } else setContactStatus('error');
                  } catch {
                    setContactStatus('error');
                  }
                }}
              >
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none ring-primary-500/40 placeholder:text-slate-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none ring-primary-500/40 placeholder:text-slate-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me a bit about your project or idea."
                    required
                    className="w-full resize-none rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none ring-primary-500/40 placeholder:text-slate-500 focus:ring-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === 'sending'}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 via-indigo-500 to-accent-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-primary-400/60 disabled:opacity-70"
                >
                  {contactStatus === 'sending' ? 'Sending…' : contactStatus === 'sent' ? 'Sent!' : contactStatus === 'error' ? 'Try again' : 'Send Message'}
                </button>
              </form>
              <p className="mt-3 text-xs text-slate-500">
                Submissions are sent to the serverless API. Add Resend or SendGrid in <code className="rounded bg-slate-800 px-1">api/contact.ts</code> to receive emails.
              </p>
            </div>
          </motion.section>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800/60 pt-4 text-[11px] text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Alok Prasad. All rights reserved.</p>
          <p className="text-[10px]">
            Built with React, Tailwind CSS, and Framer Motion.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
