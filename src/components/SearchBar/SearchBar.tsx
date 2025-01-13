import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type SearchBarProps = {
  onSearch: (query: string, stars: number) => void;
  maxStars: number;
};

export function SearchBar({ onSearch, maxStars }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [stars, setStars] = useState(maxStars);

  const handleSearch = () => {
    console.log("searching", query, stars);
    onSearch(query, stars);
  };

  const handleSliderChange = (value: number[]) => {
    setStars(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), 100);
    setStars(value);
  };

  return (
    <div className="flex flex-col justify-start md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Repository Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[15%] bg-[#d6d6d6]">
            Filter By Stars
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="flex items-center">
              <Label className="w-[50%]">Min Stars:</Label>
              <Input
                type="number"
                value={stars}
                onChange={handleInputChange}
                max={maxStars}
              />
            </div>
            <Slider
              value={[stars]} // Bind the slider value to sliderStars state
              onValueChange={handleSliderChange} // Update state on slider change
              max={maxStars}
              step={1}
            />
          </div>
        </PopoverContent>
      </Popover>
      <Button onClick={() => handleSearch()} className="w-[15%]">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
  );
}
