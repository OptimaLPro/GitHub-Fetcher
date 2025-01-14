import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "./button";

type ErrorLimitProps = {
  refetch: () => void;
};

export default function ErrorLimit({ refetch }: ErrorLimitProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-24 space-y-10">
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
      <Button onClick={() => refetch()}>Refresh</Button>
    </div>
  );
}
