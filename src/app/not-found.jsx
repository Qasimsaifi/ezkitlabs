"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4"
    >
      {/* Fun Illustration or Emoji */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-6xl mb-6"
      >
        🤖
      </motion.div>

      {/* 404 Message */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold mb-4 text-center"
      >
        404 - Page Not Found
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-lg text-center mb-8"
      >
        Oops! The page you're looking for doesn't exist. Let's get you back on
        track.
      </motion.p>

      {/* Call-to-Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        Go Back Home
      </motion.button>
    </motion.div>
  );
};

export default NotFoundPage;
