"use client";

import { useFormState } from "react-dom";

export function Form({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action: (prevState: unknown, formData: FormData) => Promise<ActionResult>;
  className: string;
}) {
  const [state, formAction] = useFormState(action, {
    error: null,
  });
  return (
    <form action={formAction} className={className}>
      {children}
      <p className="text-red-500">{state.error}</p>
    </form>
  );
}

export interface ActionResult {
  error: string | null;
}
