import {  editCourseActionResult, editInputType } from "@/actions/helpers";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";

function InputComp({
  label,
  isTextArea,
  rows,
  value,
  name,
  onChange,

  formState,
}: {
  label: string;
  isTextArea?: boolean;
  rows?: number;
  value: string;
  name: editInputType;
  onChange?: ((v: ChangeEvent<HTMLInputElement>) => voi);
  formState: editCourseActionResult;
}) {
  const error = formState.error ? formState.error[name] : "";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          value={value}
          name={name}
          rows={rows}
          className={cn(
            "text-md rounded-lg border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-400",
          )}
          onChange={onChange}
        ></textarea>
      ) : (
        <Input onChange={onChange} value={value} name={name} type="text" />
      )}
      {formState && formState.type
        ? [name] && (
            <p className="text-md pl-2 text-start text-red-500">{error}</p>
          )
        : null}
    </div>
  );
}
export default InputComp;