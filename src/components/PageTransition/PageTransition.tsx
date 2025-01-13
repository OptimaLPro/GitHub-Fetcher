import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const PageTransition = ({ children }: PropsWithChildren) => {
 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.995 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.995 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
