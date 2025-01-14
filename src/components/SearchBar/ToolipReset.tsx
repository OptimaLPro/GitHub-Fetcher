import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function ToolipReset({
  ResetFilters,
}: {
  ResetFilters: () => void;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            className="ml-3 transition-colors hover:bg-red-500"
            onClick={ResetFilters}
          >
            <RefreshCcw className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset Search Filters</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
