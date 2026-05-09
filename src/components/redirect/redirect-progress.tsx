"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";

export function RedirectProgress() {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    animate(progress, 0.88, { duration: 2.4, ease: [0.4, 0, 0.2, 1] });
  }, [progress]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 h-0.5 bg-linear-to-r from-brand/50 via-brand to-brand/50"
      style={{ width }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    />
  );
}
