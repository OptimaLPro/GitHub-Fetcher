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
  query: string;
  stars: number;
};

export function SearchBar({ onSearch, maxStars, query, stars }: SearchBarProps) {
  const [starsValue, setStarsValue] = useState<number>(stars);
  const [queryValue, setQueryValue] = useState<string>(query);
  

  const handleSearch = () => {
    console.log("searching", query, stars);
    onSearch(queryValue, starsValue);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value);
  };

  const handleSliderChange = (value: number[]) => {
    setStarsValue(value[0]); // Update stars in parent component
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxStars);
    setStarsValue(value); // Update stars in parent component
  };

  return (
    <div className="flex flex-col justify-start md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Repository Name"
          value={queryValue}
          onChange={(e) => handleQueryChange(e)} // Update query in parent component
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
                value={starsValue}
                onChange={handleInputChange}
                max={maxStars}
              />
            </div>
            <Slider
              value={[starsValue]} // Bind the slider value to stars prop
              onValueChange={handleSliderChange} // Update stars in parent component
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
