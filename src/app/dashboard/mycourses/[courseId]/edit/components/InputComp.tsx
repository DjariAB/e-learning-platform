import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

function InputComp({
    label,
    isTextArea,
    rows,
    value,
    name,
    onChange,
  }: {
    label: string;
    isTextArea?: boolean;
    rows?: number;
    value : string;
    name: string;
    onChange?: (v: ChangeEvent<HTMLInputElement>) => void;
  }) {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
        {isTextArea ? (
          <textarea value={value}
            name={name}
            rows={rows}
            className="text-md rounded-lg border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        ) : (
          <Input onChange={onChange} value={value} name={name} type="text" />
        )}
      </div>
    );
  }
  export default InputComp;