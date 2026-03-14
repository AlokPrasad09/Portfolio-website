import { motion } from 'framer-motion';

const shapes = [
  { size: 80, x: '10%', y: '20%', duration: 12 },
  { size: 60, x: '75%', y: '30%', duration: 15 },
  { size: 100, x: '50%', y: '70%', duration: 18 },
  { size: 50, x: '85%', y: '75%', duration: 10 },
  { size: 70, x: '20%', y: '60%', duration: 14 },
];

export function Hero3DLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl border border-primary/20 bg-primary/5"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateX: [0, 15, 0],
            rotateY: [0, 25, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
