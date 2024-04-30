"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { UploadDropzone } from "@/components/uploadButton";

import {
  type ReactNode,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type MouseEventHandler,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editCourseInfo } from "@/actions/helpers";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InputComp from "./InputComp";
import { Input } from "@/components/ui/input";
import {
  type chapterType,
  type lessonType,
  type toEditCourseProps,
} from "./editWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";

function EditCourseForm({
  course,
  setIsEditingInfo,
}: {
  course: toEditCourseProps;
  setIsEditingInfo: Dispatch<SetStateAction<boolean>>;
}) {
  const [courseInfo, setcourseInfo] = useState(course);
  const [changed, setChanged] = useState(false);

  const [formState, formAction] = useFormState(editCourseInfo, {
    error: null,
    type: {},
  });

  useEffect(() => {
    if (formState.type?.success) {
      setChanged(false);
    }
  }, [formState.type?.success]);

  return (
    <>
      {formState.type?.success && (
        <p
          className="text-center text-green-500"
          onLoad={() => {
            setChanged(false);
          }}
        >
          {" "}
          successfully changed the course info{" "}
        </p>
      )}

      <form
        onChange={() => setChanged(true)}
        action={formAction}
        className="mx-auto flex w-3/4 flex-col gap-2  pt-8"
      >
        {" "}
        <input
          type="hidden"
          name="courseId"
          value={courseInfo.id}
          onChange={() => {
            return;
          }}
        />
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium leading-3 ">Edit Course</h1>
            <p className="text-sm font-light text-gray-600">
              Customize your course and add content
            </p>
          </div>
          <div className="space-x-1">
            <SubmitButton
              className="rounded-sm bg-mainblue px-4 py-4 font-normal hover:bg-blue-900 "
              disabled={changed}
            >
              Save
            </SubmitButton>
            <Button
              className="rounded-sm px-4 py-2 font-normal"
              disabled={changed}
              onClick={() => setIsEditingInfo(false)}
            >
              Edit Content
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="flex gap-4 py-4">
            {/* <div > */}
            <div className="flex w-2/3 flex-col gap-2">
              <InputComp
                value={courseInfo.title}
                label="Course title"
                name="title"
                onChange={(e) =>
                  setcourseInfo({ ...courseInfo, title: e.target.value })
                }
                formState={formState}
              />

              <div className="flex gap-3">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="category" className="font-medium">
                    Category
                  </label>
                  <Select
                    name="category"
                    value={courseInfo.category}
                    onValueChange={(e) =>
                      setcourseInfo({ ...courseInfo, category: e })
                    }
                  >
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
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="font-medium">
                    Level
                  </label>
                  <Select
                    name="level"
                    value={courseInfo.level}
                    onValueChange={(e) =>
                      setcourseInfo({ ...courseInfo, level: e })
                    }
                  >
                    <SelectTrigger className=" w-full sm:w-[180px]">
                      <SelectValue placeholder="Select a Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Levels</SelectLabel>

                        <SelectItem value="beginner">beginner</SelectItem>
                        <SelectItem value="intermediate">
                          intermediate
                        </SelectItem>
                        <SelectItem value="advanced">advanced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <InputComp
                formState={formState}
                value={courseInfo.briefDescription}
                label="Brief description"
                name="Description"
                isTextArea
                rows={3}
                onChange={(e) =>
                  setcourseInfo({
                    ...courseInfo,
                    briefDescription: e.target.value,
                  })
                }
              />
              <InputComp
                formState={formState}
                value={courseInfo.mainDescription}
                label="Main description"
                name="mainDescription"
                isTextArea
                rows={5}
                onChange={(e) =>
                  setcourseInfo({
                    ...courseInfo,
                    mainDescription: e.target.value,
                  })
                }
              />
              <InputComp
                formState={formState}
                value={courseInfo.courseGoals}
                label="Course goals"
                name="courseGoals"
                isTextArea
                rows={5}
                onChange={(e) =>
                  setcourseInfo({ ...courseInfo, courseGoals: e.target.value })
                }
              />
            </div>

            {/* </div> */}
            <div className="grow">
              <p className="font-medium">Course image</p>
              <UploadDropzone lessonId="" />
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
export default EditCourseForm;
export function EditCourseContentForm({
  setIsEditingInfo,
  chapters,
  lessons,
}: {
  setIsEditingInfo: Dispatch<SetStateAction<boolean>>;
  chapters: Array<chapterType>;
  lessons: Array<lessonType>;
}) {
  const [formState, formAction] = useFormState(editCourseInfo, {
    error: null,
    type: {},
  });
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (formState.type?.success) {
      setChanged(false);
    }
  }, [formState.type?.success]);

  const [selectedItems, setSelectedItems] = useState({
    chapter: "",
    lesson: "",
  });

  const toEditLesson = lessons.find((less) => less.id === selectedItems.lesson);
  return (
    <>
      <form
        action=""
        className="mx-auto flex  flex-col gap-2 pt-8 lg:w-3/4"
        onChange={() => setChanged(true)}
      >
        {" "}
        {/* <input
          type="hidden"
          name="courseId"
          value={courseInfo.id}
          onChange={() => {
            return;
          }}
        /> */}
        <div className="flex justify-between px-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium leading-3 ">Edit Course</h1>
            <p className="text-sm font-light text-gray-600 ">
              Customize your course and add content
            </p>
          </div>
          <div className="space-x-1">
            <SubmitButton
              className="rounded-sm bg-mainblue px-4 py-4 font-normal hover:bg-blue-900 "
              disabled={changed}
            >
              Save
            </SubmitButton>
            <Button
              className="rounded-sm px-4 py-2 font-normal"
              disabled={changed}
              onClick={() => setIsEditingInfo(true)}
            >
              Edit Course Info
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-row  gap-4 py-4">
            <div className="w-1/2">
              <h3 className="pb-2 pl-3 font-medium">Course Content</h3>
              <ScrollArea className="h-[430px] rounded-lg border px-4">
                <Accordion type="single" collapsible>
                  {chapters.map((chap) => (
                    <ChapterAccItem
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      isSelectedChap={chap.id === selectedItems.chapter}
                      chapter={chap}
                      lessonsArray={lessons}
                      key={chap.id}
                    />
                  ))}
                </Accordion>
              </ScrollArea>
              <Input
                className="mt-4 h-14"
                placeholder="Add a new chapter here"
              />
            </div>
            <div className="flex w-1/2 flex-col self-stretch">
              <h3 className="pb-2 pl-3 font-medium">Editing space</h3>

              <Card className="flex grow  pt-4">
                <CardContent className="flex h-full w-full shrink flex-col gap-2">
                  {toEditLesson ? (
                    <>
                      <div className="w-full">
                        <InputComp
                          label="Course title"
                          value={toEditLesson.title}
                          name="courseTitle"
                        />
                      </div>
                      <div className="grow">
                        <p className="font-medium">Lesson file</p>
                        <UploadDropzone lessonId="" />
                      </div>
                    </>
                  ) : (
                    <img
                      className="m-auto  w-1/2"
                      src="/../../../../../../../images/editing_space.jpg"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}

function SubmitButton({
  className,
  children,
  disabled,
}: {
  children: ReactNode;
  className: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || !disabled} className={className}>
      {!pending ? children : <Loader2 className="size-3 animate-spin" />}
    </Button>
  );
}

function ChapterAccItem({
  chapter,
  lessonsArray,
  setSelectedItems,
  selectedItems,
  isSelectedChap,
}: {
  chapter: chapterType;
  lessonsArray: Array<lessonType>;
  setSelectedItems: Dispatch<
    SetStateAction<{ chapter: string; lesson: string }>
  >;
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
          selectedItems.chapter === chapter.id
            ? setSelectedItems({ chapter: "", lesson: "" })
            : setSelectedItems({ chapter: chapter.id, lesson: "" });
        }}
      >
        {chapter.name}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-1">
          {chapterLessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isSelected={selectedItems.lesson === lesson.id}
              onClick={() => {
                setSelectedItems({
                  chapter: lesson.chapterId,
                  lesson: lesson.id,
                });
              }}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
export function LessonItem({
  lesson,
  isSelected,
  isNotSaved,
  onClick,
}: {
  lesson: lessonType;
  isSelected: boolean;
  isNotSaved?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <>
      <div
        className={`flex items-center justify-between rounded-sm px-3 py-1 text-left text-base ${!isSelected ? "hover:bg-slate-200 hover:text-mainblue" : ""} cursor-pointer ${isSelected ? " bg-[#eef3fa] font-medium text-blue-800" : ""}`}
        key={lesson.id}
        onClick={onClick}
      >
        {lesson.title}
        {isNotSaved ? (
          <div className="size-[6px] rounded-full bg-red-500"></div>
        ) : null}
      </div>
    </>
  );
}
