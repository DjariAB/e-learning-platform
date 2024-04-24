"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Anek_Latin } from "next/font/google";
import { useFormState } from "react-dom";
import { addCourse } from "@/actions/helpers";
import { SubmitButton } from "@/lib/Form";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});
export function AddCourseDialog() {
  const [state, formAction] = useFormState(addCourse, {
    error: null,
    type: null,
  });
  return (
    <Dialog>
      <DialogTrigger className={anekLatin.className} asChild>
        <div className="flex items-center gap-3 rounded-2xl bg-black p-3 text-xl font-normal text-white transition duration-300 ease-in hover:bg-gray-800 ">
          <PlusCircleIcon className="size-7  stroke-[1.5px] text-white" />
          <button>New Course</button>
        </div>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${anekLatin.className}`}>
        <DialogHeader>
          <DialogTitle>Create a New Course</DialogTitle>
          <DialogDescription>
            Fill your course info in here. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-3 py-1">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="title" className="">
              Course Title
            </label>

            <Input id="title" name="title" className="col-span-3" />
            {state && state.type === "title" && (
              <p className="text-md pl-2 text-start text-red-500">
                {state.error}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <div className="grow">
              <Select name="category">
                <SelectTrigger className="  w-full sm:w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Web dev">Web dev</SelectItem>
                    <SelectItem value="Mobile dev">Mobile dev</SelectItem>
                    <SelectItem value="desktop">desktop</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state && state.type === "category" && (
                <p className="text-md pl-2 text-start text-red-500">
                  {state.error}
                </p>
              )}
            </div>
            <div className="grow">
              <Select name="level">
                <SelectTrigger className=" w-full sm:w-[180px]">
                  <SelectValue placeholder="Select a Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>

                    <SelectItem value="beginner">beginner</SelectItem>
                    <SelectItem value="intermediate">intermediate</SelectItem>
                    <SelectItem value="advanced">advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state && state.type === "level" && (
                <p className="text-md pl-2 text-start text-red-500">
                  {state.error}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Description"> Description</label>
            <textarea
              name="Description"
              id="Description"
              rows={5}
              className="text-md rounded-lg border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {state && state.type === "failed" && (
              <p className="text-md pl-2 text-start text-red-500">
                {state.error}
              </p>
            )}
          </div>
          <DialogFooter>
            <SubmitButton className="rounded-xl text-xl">
              Create Now
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
