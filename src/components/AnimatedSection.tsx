import { ReactNode } from "react";
import { motion } from "motion/react";

export default function AnimatedSection({
  children,
  placeholderHeight = "150px"
}: {
  children: ReactNode;
  placeholderHeight?: string;
  key?: string | number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
