import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { TbDownload, TbMoonStars, TbSunHigh } from 'react-icons/tb';

type Theme = 'light' | 'dark';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'github', label: 'GitHub' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'blog', label: 'Blog' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const glassCard =
  'backdrop-blur-xl bg-slate-900/40 border border-slate-700/60 shadow-glass rounded-3xl';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = stored ?? (prefersDark ? 'dark' : 'light');
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      window.localStorage.setItem('theme', next);
      return next;
    });
  };

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImage(url);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 3D-style animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-glow opacity-70" />
        <motion.div
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-gradient-hero blur-3xl"
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-gradient-to-tr from-accent-500/40 via-primary-500/20 to-sky-400/40 blur-3xl"
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -10, 0], rotate: [0, -12, 12, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1e293b_1px,transparent_0)] opacity-40 [background-size:24px_24px]"
          animate={{ backgroundPosition: ['0px 0px', '24px 24px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Page layout */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        {/* Navbar */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/70 text-lg font-semibold text-primary-400 shadow-lg shadow-primary-500/40">
              AP
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                AI Developer
              </p>
              <p className="text-sm font-semibold text-slate-100">Alok Prasad</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 shadow-lg shadow-slate-900/50 backdrop-blur-xl md:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="rounded-full px-3 py-1 transition-colors hover:bg-slate-800/70 hover:text-slate-50"
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900/60 text-slate-200 shadow-lg shadow-slate-900/60 backdrop-blur-xl transition hover:border-primary-500/80 hover:text-primary-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence initial={false} mode="wait">
                {theme === 'dark' ? (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, y: 6, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -6, rotate: 10 }}
                    transition={{ duration: 0.18 }}
                  >
                    <TbSunHigh className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, y: 6, rotate: 10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -6, rotate: -10 }}
                    transition={{ duration: 0.18 }}
                  >
                    <TbMoonStars className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </header>

        {/* Hero + Sidebar */}
        <main className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          {/* Hero */}
          <section
            id="hero"
            className={`${glassCard} relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10`}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available for AI projects
                </div>
                <div>
                  <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                    Building AI tools and
                    <span className="bg-gradient-to-r from-primary-400 via-sky-300 to-accent-400 bg-clip-text text-transparent">
                      {' '}
                      intelligent applications
                    </span>
                  </h1>
                  <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
                    I&apos;m Alok, an AI developer focused on turning ideas into intelligent
                    products—from chatbots and document AI to full-stack AI applications.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 via-indigo-500 to-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-primary-400/50"
                  >
                    <span>View Projects</span>
                  </button>
                  <a
                    href="/Alok_Prasad_Resume.pdf"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/60 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-md shadow-slate-900/60 transition hover:border-primary-400/80 hover:text-primary-200"
                  >
                    <TbDownload className="h-4 w-4" />
                    <span>Download Resume</span>
                  </a>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 underline-offset-4 hover:text-primary-200 hover:underline"
                  >
                    Contact Me
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>AI / ML</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    <span>LLMs & Prompt Engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Full-stack with React</span>
                  </div>
                </div>

                <div className="mt-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-slate-400 hover:text-slate-200">
                    <span className="rounded-full border border-slate-600/70 bg-slate-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em]">
                      Upload profile photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                className="relative mt-4 flex w-full justify-center md:mt-0 md:w-[230px]"
              >
                <div className="relative h-52 w-52 overflow-hidden rounded-[32px] border border-slate-600/70 bg-slate-900/70 shadow-2xl shadow-slate-900/70">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(94,234,212,0.3),transparent_55%),radial-gradient(circle_at_80%_0,rgba(129,140,248,0.5),transparent_55%)]" />
                  <div className="relative flex h-full flex-col items-center justify-center gap-2">
                    {profileImage && (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-24 w-24 rounded-3xl object-cover border border-slate-700 shadow-lg"
                      />
                    )}
                    <span className="rounded-full bg-slate-900/80 px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-300/90">
                      AI Developer
                    </span>
                    <p className="mt-1 text-lg font-semibold text-slate-50">Alok Prasad</p>
                    <p className="text-xs text-slate-300/80">
                      Crafting intelligent experiences with code.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Quick links / Social / GitHub stats preview */}
          <aside className="flex flex-col gap-4">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`${glassCard} px-5 py-4`}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                Quick navigation
              </p>
              <div className="flex flex-wrap gap-2">
                {['Projects', 'Blog', 'Contact'].map((label) => {
                  const id = label.toLowerCase();
                  return (
                    <button
                      key={label}
                      onClick={() => scrollToSection(id)}
                      className="rounded-full bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-primary-600/70 hover:text-slate-50"
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
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                  Connect
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Let&apos;s collaborate on AI products.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://github.com/AlokPrasad09"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/70 text-slate-300 shadow-lg shadow-slate-900/70 transition hover:bg-slate-100 hover:text-slate-950"
                  aria-label="GitHub"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alokprasad92"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/70 text-slate-300 shadow-lg shadow-slate-900/70 transition hover:bg-sky-500 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.salesforce.com/trailblazer/alokprasad"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/70 text-slate-300 shadow-lg shadow-slate-900/70 transition hover:bg-amber-400 hover:text-slate-900"
                  aria-label="Salesforce Trailblazer"
                >
                  <span className="text-[10px] font-semibold">Sf</span>
                </a>
                <a
                  href="mailto:youremail@example.com"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/70 text-slate-300 shadow-lg shadow-slate-900/70 transition hover:bg-emerald-500 hover:text-white"
                  aria-label="Email"
                >
                  <FiMail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </aside>
        </main>

        {/* Content sections */}
        <div className="mt-10 space-y-10">
          {/* About */}
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
                <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                  About Me
                </h2>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                  The journey into AI
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-200 sm:text-[0.95rem]">
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

          {/* Skills */}
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
                {['Python', 'Machine Learning', 'LLMs', 'Prompt Engineering'].map(
                  (skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group flex items-center justify-between rounded-2xl border border-slate-700/70 bg-slate-900/60 px-4 py-3 text-sm text-slate-100"
                    >
                      <span>{skill}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        AI / ML
                      </span>
                    </motion.div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className={`${glassCard} px-5 py-5`}>
                <h3 className="text-sm font-semibold text-slate-50">
                  Development & Product
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  From idea to deployed, production-ready interfaces.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-100">
                  {['Web Development', 'React', 'TypeScript', 'APIs'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${glassCard} px-5 py-5`}>
                <h3 className="text-sm font-semibold text-slate-50">AI Tools</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Infrastructure for intelligent applications.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-100">
                  {['Vector Databases', 'AI Chatbots', 'Document AI', 'RAG Systems'].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Projects */}
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
              {[
                {
                  title: 'NCERT AI Assistant',
                  description:
                    'An AI-powered assistant that understands NCERT PDFs and helps students learn faster with instant explanations, summaries, and Q&A.',
                  tech: ['Python', 'LLMs', 'Vector DB', 'React'],
                  image:
                    'linear-gradient(135deg, rgba(56,189,248,0.35), rgba(129,140,248,0.3))',
                },
                {
                  title: 'PDF AI Tool',
                  description:
                    'A document AI system that ingests PDFs, builds semantic understanding, and answers complex questions grounded in the content.',
                  tech: ['Document AI', 'RAG', 'Node.js', 'TypeScript'],
                  image:
                    'linear-gradient(135deg, rgba(236,72,153,0.42), rgba(248,113,113,0.35))',
                },
                {
                  title: 'AI Chatbot',
                  description:
                    'A mini ChatGPT-style chatbot experience with conversational memory and custom system behavior tailored to specific use-cases.',
                  tech: ['Chat UI', 'LLM', 'React', 'Framer Motion'],
                  image:
                    'linear-gradient(135deg, rgba(129,140,248,0.4), rgba(45,212,191,0.35))',
                },
              ].map((project) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`${glassCard} flex flex-col overflow-hidden`}
                >
                  <div
                    className="relative h-32 w-full overflow-hidden"
                    style={{
                      backgroundImage: project.image,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(15,23,42,0.2),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(15,23,42,0.35),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.3)_1px,transparent_0)] opacity-50 [background-size:18px_18px]" />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs text-slate-300">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2 text-xs">
                      <a
                        href={
                          project.title === 'NCERT AI Assistant'
                            ? 'https://github.com/AlokPrasad09/ncert_ai_tutor'
                            : 'https://github.com/AlokPrasad09'
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-600/80 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-slate-300 hover:text-slate-50"
                      >
                        <FiGithub className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                      <a
                        href="#"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-primary-500/40 transition hover:shadow-primary-400/60"
                      >
                        Live demo
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Career timeline */}
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

          {/* GitHub stats + Tech stack */}
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
              <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                GitHub Activity
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                Live stats & contributions
              </p>
              <p className="mt-3 text-xs text-slate-300">
                These stats are powered by GitHub APIs and updated automatically. Replace the
                username to point to your actual profile.
              </p>
              <div className="mt-4 space-y-4 text-xs">
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

          {/* Blog */}
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

          {/* Resume + Contact */}
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
              <form className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 outline-none ring-primary-500/40 placeholder:text-slate-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 outline-none ring-primary-500/40 placeholder:text-slate-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me a bit about your project or idea."
                    className="w-full resize-none rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 outline-none ring-primary-500/40 placeholder:text-slate-500 focus:ring-2"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 via-indigo-500 to-accent-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-primary-400/60"
                >
                  Send Message
                </button>
              </form>
              <p className="mt-3 text-[11px] text-slate-500">
                This form is currently UI-only. Hook it up to your preferred email or form
                backend service.
              </p>
            </div>
          </motion.section>
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
