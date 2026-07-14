import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <h1 className="text-5xl font-bold text-white">
        RefactorLens
      </h1>

      <p className="mt-4 text-lg text-gray-400">
        Analyze your code before you change it.
      </p>
    </motion.div>
  );
}