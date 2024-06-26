"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type chapterType, type lessonType } from "./editWrapper";
import { useFormState } from "react-dom";
import {
  type chapterActionResult,
  deleteChapterAction,
} from "@/actions/helpers/chatperHelpers";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { LessonItem } from "./lessonComps";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { SubmitButton } from "@/lib/Form";
import { Trash2Icon } from "lucide-react";
export function ChapterAccItem({
  chapter,
  lessonsArray,
  onSelectChapter,
  onSelectLesson,
  selectedItems,
  isSelectedChap,
}: {
  chapter: chapterType;
  lessonsArray: Array<lessonType>;
  onSelectChapter: (chapterId: string) => void;
  onSelectLesson: (lessonId: string, chapterId: string) => void;

  selectedItems: { chapter: string; lesson: string };

  isSelectedChap: boolean;
}) {
  const chapterLessons = lessonsArray.filter(
    (lesson) => lesson.chapterId === chapter.id,
  );
  return (
    <AccordionItem value={chapter.id}>
      <AccordionTrigger
        className={`text-lg font-medium ${isSelectedChap && "font-medium text-blue-800"}`}
        onClick={() => {
          onSelectChapter(chapter.id);
        }}
      >
        {chapter.name}
      </AccordionTrigger>
      <AccordionContent>
        {chapterLessons[0] ? (
          <div className="flex flex-col gap-1">
            {chapterLessons.map((lesson, i) => (
              <LessonItem
                i={i}
                key={lesson.id}
                lesson={lesson}
                isSelected={selectedItems.lesson === lesson.id}
                onSelectLesson={onSelectLesson}
              />
            ))}
          </div>
        ) : (
          <p className="p-2 text-gray-500">No lessons yet, add new lessons</p>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
export function AddChapterForm({
  action,
  className,
  courseId,
}: {
  action: (_: unknown, formData: FormData) => Promise<chapterActionResult>;
  className: string;
  courseId: string;
}) {
  const [formState, formAction] = useFormState(action, {
    error: "",
    type: null,
  });
  const [inputChapter, setInputChapter] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    if (formState.type === "success") {
      toast({ title: "Chapter added successfully", description: "" });
    } else console.log("not working ", formState.error);
  }, [formState, toast]);

  return (
    <form action={formAction} className={className}>
      <Input type="hidden" name="courseId" value={courseId} />
      <Input
        type="text"
        value={inputChapter}
        name="name"
        placeholder="Add a new chapter here"
        onChange={(e) => setInputChapter(e.target.value)}
      />
    </form>
  );
}
export function UpdateChapterForm({
  action,
  className,
  chapter,
}: {
  action: (_: unknown, formData: FormData) => Promise<chapterActionResult>;
  className?: string;

  chapter: { id: string; name: string; courseId: string };
}) {
  const [formState, formAction] = useFormState(action, {
    error: "",
    type: null,
  });
  const { toast } = useToast();

  const [value, setValue] = useState(chapter.name);

  useEffect(() => {
    if (formState.type === "success") {
      toast({
        title: formState.error,
        description: "New Name : " + value,
        action: <CheckCircleIcon className="size-7 text-green-500" />,
      });
      ("");
    } else console.log("not working", formState.error);
  }, [formState, toast, value]);
  useEffect(() => {
    if (formState.type === "success") {
      console.log("works just fine ");
    } else console.log("not working ", formState.error);
  }, [formState]);

  return (
    <form
      action={formAction}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <Input type="hidden" name="id" value={chapter.id} />
      <Input type="hidden" name="courseId" value={chapter.courseId} />
      <label htmlFor="name">Chapter name</label>
      <Input
        type="text"
        name="name"
        value={value}
        placeholder="Add a new chapter here"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export function DeleteChapterForm({
  className,
  courseId,
  id,
}: {
  id: string;
  className?: string;
  courseId: string;
}) {
  const [formState, formAction] = useFormState(deleteChapterAction, {
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

      <SubmitButton
        className="w-1/2 space-x-3 rounded-md border-red-500 px-6 text-red-500 hover:bg-red-500 hover:text-white"
        variant="outline"
      >
        <p>Delete Chapter</p>
        {<Trash2Icon className="size-4  hover:text-white" />}
      </SubmitButton>
    </form>
  );
}
