import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX } from 'react-icons/fi';

const ANSWERS: Record<string, string> = {
  projects:
    'This developer has built AI-focused projects including: NCERT AI Assistant (PDFs + LLMs), a PDF AI Tool for document Q&A, and an AI Chatbot with conversational memory. Check the Projects section for details and GitHub links.',
  skills:
    'Skills include Python, Machine Learning, LLMs, Prompt Engineering, React, TypeScript, and tools like Vector Databases, AI Chatbots, Document AI, and RAG systems. See the Skills section for the full list.',
  technologies:
    'Technologies used: Python, TypeScript, React, Node.js, Tailwind CSS, Framer Motion, LLMs, Vector DBs, RAG, and various AI/ML frameworks.',
  default:
    "I can answer questions about this developer's projects, skills, and technologies. Try asking: 'What projects has this developer built?', 'What are his skills?', or 'What technologies does he use?'",
};

function getAnswer(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('project')) return ANSWERS.projects;
  if (lower.includes('skill')) return ANSWERS.skills;
  if (lower.includes('technolog')) return ANSWERS.technologies;
  return ANSWERS.default;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm the portfolio assistant. Ask me about this developer's projects, skills, or technologies." },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    const reply = getAnswer(text);
    setMessages((m) => [...m, { role: 'bot', text: reply }]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[380px] w-[340px] flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 shadow-2xl shadow-slate-950/50 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3">
              <span className="text-sm font-semibold text-slate-100">Portfolio assistant</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                aria-label="Close"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary-500/80 text-white'
                        : 'bg-slate-800/80 text-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700/60 p-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 rounded-xl border border-slate-600/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-primary-500/50"
                />
                <button
                  type="button"
                  onClick={send}
                  className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/40 hover:shadow-primary-400/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Open chatbot"
      >
        <FiMessageCircle className="h-6 w-6" />
      </motion.button>
    </>
  );
}
