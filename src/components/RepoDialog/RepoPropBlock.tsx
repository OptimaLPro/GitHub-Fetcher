import { Label } from "@/components/ui/label";

export function RepoPropBlock({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="grid items-center grid-cols-[30%_70%] gap-4">
      <Label>{label}</Label>
      <div>{value}</div>
    </div>
  );
}

export default RepoPropBlock;
