import { useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ToolipReset from "./ToolipReset";

type SearchBarProps = {
  onSearch: (query: string, stars: number, order: string) => void;
  maxStars: number;
  query: string;
  stars: number;
  order: string;
};

export function SearchBar({
  onSearch,
  maxStars,
  query,
  stars,
  order,
}: SearchBarProps) {
  const [starsValue, setStarsValue] = useState<number>(stars);
  const [queryValue, setQueryValue] = useState<string>(query);
  const [orderValue, setOrderValue] = useState<string>("desc");

  const handleSearch = () => {
    onSearch(queryValue, starsValue, orderValue);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value);
  };

  const handleSliderChange = (value: number[]) => {
    setStarsValue(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxStars);
    setStarsValue(value);
  };

  const handleSortChange = (value: string) => {
    setOrderValue(value);
  };

  const ResetFilters = () => {
    setQueryValue("");
    setStarsValue(0);
    setOrderValue("desc");
    onSearch("", 0, "desc");
  };

  return (
    <div className="flex flex-col justify-start md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Repository Name"
          value={queryValue}
          onChange={(e) => handleQueryChange(e)}
        />
      </div>
      <ToolipReset ResetFilters={ResetFilters} />
      <Select value={orderValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[15%] flex flex-row">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc" className="flex items-center">
            <div className="flex flex-row items-center">
              <ArrowDownWideNarrow className="mr-2" />
              <div>Descending</div>
            </div>
          </SelectItem>
          <SelectItem value="asc" className="flex items-center">
            <div className="flex flex-row items-center">
              <ArrowUpWideNarrow className="mr-2" />
              <div>Ascending</div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[15%] bg-[#d6d6d6]">
            <Filter />
            Filter By Stars
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="flex items-center">
              <Label className="w-[50%]">Minimum Stars:</Label>
              <Input
                type="number"
                value={starsValue}
                onChange={handleInputChange}
                max={maxStars}
              />
            </div>
            <Slider
              value={[starsValue]}
              onValueChange={handleSliderChange}
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
