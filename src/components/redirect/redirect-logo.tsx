"use client";

import { motion } from "motion/react";

export function RedirectLogo() {
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="font-extrabold tracking-tight leading-none"
        style={{
          fontSize: "52px",
          color: "#F0922A",
          textShadow: "0 0 48px rgba(240,146,42,0.45)",
        }}
      >
        Z
      </span>
      <span
        className="font-extrabold tracking-tight leading-none text-foreground"
        style={{ fontSize: "52px" }}
      >
        yraa
      </span>
    </motion.div>
  );
}
