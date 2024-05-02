import { useToast } from "@/components/ui/use-toast";
import { lessonType } from "./editWrapper";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteLessonAction, lessonActionResult } from "@/actions/helpers/lessonHelpers";
import { SubmitButton } from "@/lib/Form";

export function LessonItem({
    i,
    lesson,
    isSelected,
    isNotSaved,
    onSelectLesson,
  }: {
    i: number;
    lesson: lessonType;
    isSelected: boolean;
    isNotSaved?: boolean;
    onSelectLesson: (lessonId: string, chapterId: string) => void;
  }) {
    return (
      <>
        <div
          className={`flex items-center justify-between rounded-sm px-3 py-1 text-left text-base transition duration-300 ease-in ${!isSelected ? "hover:bg-slate-200 hover:text-mainblue" : ""} cursor-pointer ${isSelected ? " bg-[#eef3fa] font-medium text-blue-800" : ""}`}
          key={lesson.id}
          onClick={() => onSelectLesson(lesson.id, lesson.chapterId)}
        >
          {i + 1}. {lesson.title}
          {isNotSaved ? (
            <div className="size-[6px] rounded-full bg-red-500"></div>
          ) : null}
        </div>
      </>
    );
  }
  export function AddLessonForm({
    action,
    className,
    chapterId,
    courseId,
  }: {
    action: (_: unknown, formData: FormData) => Promise<lessonActionResult>;
    className?: string;
    chapterId: string;
    courseId: string;
  }) {
    const { toast } = useToast();
    const [formState, formAction] = useFormState(action, {
      error: "",
      type: null,
    });
    const [inputLesson, setinputLesson] = useState("");
    useEffect(() => {
      if (formState.type === "success") {
        toast({
          title: formState.error,
          description: "Lessone Title : " + inputLesson,
          action: <CheckCircleIcon className="size-7 text-green-500" />,
        });
        ("");
      } else console.log("not working", formState.error);
    }, [formState]);
    useEffect(() => {
      if (formState.type === "success") {
        console.log("works just fine ");
      } else console.log("not working ", formState.error);
    }, [formState]);
  
    return (
      <form
        action={formAction}
        className={cn(
          "flex flex-col items-center justify-center gap-3",
          className,
        )}
      >
        <Input type="hidden" name="chapterId" value={chapterId} />
        <Input type="hidden" name="courseId" value={courseId} />
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            New Lesson
          </label>
          <Input
            type="text"
            name="title"
            placeholder="Enter new lesson title here"
            value={inputLesson}
            onSubmit={() => setinputLesson("")}
            onChange={(e) => setinputLesson(e.target.value)}
          />
        </div>
  
        <Button
          type="submit"
          className="w-1/2 rounded-md bg-mainblue px-6 text-white hover:bg-[#072e69c9]"
        >
          Add a new lesson
        </Button>
      </form>
    );
  }
  export function UpdateLessonForm({
    action,
    className,
    courseId,
    lesson,
  }: {
    action: (_: unknown, formData: FormData) => Promise<lessonActionResult>;
    className?: string;
    courseId: string;
    lesson: { id: string; title: string };
  }) {
    const [formState, formAction] = useFormState(action, {
      error: "",
      type: null,
    });
    const { toast } = useToast();
    useEffect(() => {
      if (formState.type === "success") {
        toast({
          title: formState.error,
          description: "New Title : " + value,
          action: <CheckCircleIcon className="size-7 text-green-500" />,
        });
        ("");
      } else console.log("not working", formState.error);
    }, [formState]);
    useEffect(() => {
      if (formState.type === "success") {
        console.log("works just fine ");
      } else console.log("not working ", formState.error);
    }, [formState]);
  
    const [value, setValue] = useState(lesson.title);
  
    return (
      <form action={formAction} className={cn("flex flex-col gap-2", className)}>
        <Input type="hidden" name="id" value={lesson.id} />
        <Input type="hidden" name="courseId" value={courseId} />
        <label htmlFor="title" className="font-medium">
          lesson title
        </label>
        <Input
          type="text"
          name="title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    );
  }
  export function DeleteLessonForm({
    className,
    courseId,
    id,
  }: {
    id: string;
    className?: string;
    courseId: string;
  }) {
    const [formState, formAction] = useFormState(deleteLessonAction, {
      error: "",
      type: null,
    });
  
    useEffect(() => {
      if (formState.type === "success") {
        console.log("works just fine ");
      } else console.log("not working ", formState.error);
    }, [formState]);
  
    return (
      <form
        action={formAction}
        className={cn(
          "flex flex-col items-center justify-center gap-3",
          className,
        )}
      >
        <Input type="hidden" name="courseId" value={courseId} />
        <Input type="hidden" name="id" value={id} />
  
        <SubmitButton  className="w-1/2 rounded-md text-red-500 px-6 border-red-500 hover:text-white hover:bg-red-500"  variant="outline">
          Delete lesson
        </SubmitButton>
      </form>
    );
  }
  