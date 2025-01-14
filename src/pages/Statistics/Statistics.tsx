import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LanguageChart } from "@/components/Charts/LanguagesChart";
import { StarsByLang } from "@/components/Charts/StarsByLangChart";
import ToolipAlert from "./ToolipAlert";

export default function Statistics() {
  const [selectedChart, setSelectedChart] = useState<string>("");

  const handleChartChange = (value: string) => {
    setSelectedChart(value);
  };

  return (
    <>
      <main className="container p-4 mx-auto">
        <div className="flex justify-center mb-8">
          <Select onValueChange={handleChartChange}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a Chart" />
            </SelectTrigger>
            <ToolipAlert />
            <SelectContent>
              <SelectItem value="language">Language Chart</SelectItem>
              <SelectItem value="stars">Stars by Language Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {!selectedChart && (
          <div className="flex justify-center">
            <Label className="mt-48 text-5xl text-gray-300">
              Please select a chart to display.
            </Label>
          </div>
        )}
        <div className="mx-auto w-[80%]">
          {selectedChart === "language" && (
            <LanguageChart enabled={selectedChart === "language"} />
          )}
          {selectedChart === "stars" && (
            <StarsByLang enabled={selectedChart === "stars"} />
          )}
        </div>
      </main>
    </>
  );
}
