import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";

export default function ErrorLimit() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="error-circle"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[60px] h-[60px] font-bold bg-red-600 rounded-full error-icon flex items-center justify-center">
          <span className="text-3xl text-white">!</span>
        </div>
      </motion.div>
      <p className="text-center">
        <Label>We are sorry, but GitHub has a limit.</Label>
        <br />
        Please try again in a few seconds.
      </p>
    </div>
  );
}
