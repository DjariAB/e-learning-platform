"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

export interface ActionResult {
  error: string | null;
}

export interface AuthActionResult {
  error: string | null;
  type: "userName" | "password" | null;
}

export function AuthForm({
  action,
  className,
}: {
  action: (prevState: unknown, formData: FormData) => Promise<AuthActionResult>;
  className: string;
}) {
  const [state, formAction] = useFormState(action, {
    error: null,
    type: null,
  });
  return (
    <form action={formAction} className={className}>
      <div className="space-y-1">
        <Input name="username" placeholder="Enter your user name" />
        {state.type === "userName" && (
          <p className="text-md pl-2 text-start text-red-500">{state.error}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        {state.type === "password" && (
          <p className="text-md pl-2 text-start text-red-500">{state.error}</p>
        )}
      </div>

      <Button className="w-full rounded-lg">Create Account</Button>
    </form>
  );
}

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
      <p className="text-xl text-red-500">{state.error}</p>
    </form>
  );
}
