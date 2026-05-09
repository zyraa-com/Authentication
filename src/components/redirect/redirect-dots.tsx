"use client";

import { motion } from "motion/react";

interface RedirectDotsProps {
  firstName: string;
}

const DOTS = [0, 1, 2, 3];

export function RedirectDots({ firstName }: RedirectDotsProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-3">
        {DOTS.map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-brand"
            animate={{
              scale: [0, 1.15, 1, 1, 0, 0],
              opacity: [0, 1, 1, 1, 0, 0],
            }}
            transition={{
              duration: 2,
              times: [0, 0.18, 0.28, 0.55, 0.72, 1],
              repeat: Infinity,
              delay: i * 0.14,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.p
        className="text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Welcome back, {firstName}. Taking you to your dashboard…
      </motion.p>
    </div>
  );
}
