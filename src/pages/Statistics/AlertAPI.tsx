import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function AlertAPI() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default" className="ml-3" >Instructions</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-lg">
            The API is limited and each chart contains a lot of data, so you may
            want to wait before changing charts.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
