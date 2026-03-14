import { motion } from 'framer-motion';

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-[50%] opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, var(--color-primary), transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, var(--color-secondary), transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 50%, rgba(59, 130, 246, 0.2), transparent 60%)
          `,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
