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

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});
export function AddCourseDialog() {
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
        <form action={test} className="grid gap-3 py-1">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="Title" className="">
              Course Title
            </label>

            <Input id="Title" name="Title" className="col-span-3" />
          </div>
          <div className="flex gap-4">
            <Select name="category">
              <SelectTrigger className="w-[180px]">
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
            <Select name="level">
              <SelectTrigger className="w-[180px]">
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
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Description"> Description</label>
            <textarea
              name="Description"
              id="Description"
              rows={5}
              className="text-md rounded-lg border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <DialogFooter>
            <Button className="rounded-xl" type="submit">
              Create Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

async function test(formdata: FormData) {
  "use server";

  const category = formdata.get("category")?.toString();
  const title = formdata.get("Title")?.toString();
  const level = formdata.get("level")?.toString();
  const desc = formdata.get("Description")?.toString();

  console.log(
    `this is your Title ${title} your category ${category} and this is your level ${level} and this is the desc ${desc}`,
  );
}
