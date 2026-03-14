import { motion } from 'framer-motion';

export function GradientWavesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(120deg, transparent 0%, rgba(59, 130, 246, 0.08) 25%, transparent 50%),
            linear-gradient(240deg, transparent 0%, rgba(139, 92, 246, 0.08) 25%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[80%] w-[80%] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[60%] w-[60%] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
