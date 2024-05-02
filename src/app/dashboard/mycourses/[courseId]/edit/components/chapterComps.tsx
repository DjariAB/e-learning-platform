"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type chapterType, type lessonType } from "./editWrapper";
import { useFormState } from "react-dom";
import {
  addChapterAction,
  chapterActionResult,
} from "@/actions/helpers/chatperHelpers";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
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
            {chapterLessons.map((lesson) => (
              <LessonItem
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

export function LessonItem({
  lesson,
  isSelected,
  isNotSaved,
  onSelectLesson,
}: {
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
        {lesson.title}
        {isNotSaved ? (
          <div className="size-[6px] rounded-full bg-red-500"></div>
        ) : null}
      </div>
    </>
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
    error: null,
    type: null,
  });

  const { toast } = useToast();
  useEffect(() => {
    if (formState.type === "success") {
      toast({title:"Chapter added successfully",description:""});
    } else console.log("not working ", formState.error);
  }, [formState]);

  return (
    <form action={formAction} className={className}>
      <Input type="hidden" name="courseId" value={courseId} />
      <Input type="text" name="name" placeholder="Add a new chapter here" />
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
    error: null,
    type: null,
  });

  const [value, setValue] = useState(chapter.name);

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
export function AddLessonForm({
  action,
  className,
  chapterId,
  courseId,
}: {
  action: (_: unknown, formData: FormData) => Promise<chapterActionResult>;
  className?: string;
  chapterId: string;
  courseId: string;
}) {
  const [formState, formAction] = useFormState(action, {
    error: null,
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
  action: (_: unknown, formData: FormData) => Promise<chapterActionResult>;
  className?: string;
  courseId: string;
  lesson: { id: string; title: string };
}) {
  const [formState, formAction] = useFormState(action, {
    error: null,
    type: null,
  });

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
