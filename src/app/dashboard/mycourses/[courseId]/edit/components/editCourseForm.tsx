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
  lessonTable,
  type courseTable,
  chapterTable,
} from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { type ReactNode, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editCourseInfo } from "@/actions/helpers";
import { Loader2, UndoIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InputComp from "./InputComp";
import { Input } from "@/components/ui/input";
type lessonType = {
  id: string;
  title: string;
  chapterId: string;
};
type chapterType = {
  id: string;
  name: string;
  courseId: string;
};
const lessons = [
  {
    id: "lesson1",
    title: "Introduction to JavaScript",
    chapterId: "chapter1",
  },
  { id: "lesson2", title: "Variables and Data Types", chapterId: "chapter1" },
  { id: "lesson3", title: "Functions and Scope", chapterId: "chapter2" },

  { id: "lesson4", title: "Arrays and Loops", chapterId: "chapter2" },
  { id: "lesson5", title: "Objects and Classes", chapterId: "chapter3" },
  { id: "lesson6", title: "Asynchronous JavaScript", chapterId: "chapter3" },

  { id: "lesson7", title: "DOM Manipulation", chapterId: "chapter4" },
  { id: "lesson8", title: "Event Handling", chapterId: "chapter4" },
  { id: "lesson9", title: "AJAX and Fetch", chapterId: "chapter5" },

  { id: "lesson10", title: "Error Handling", chapterId: "chapter5" },
  { id: "lesson11", title: "Modules and Bundlers", chapterId: "chapter6" },
  { id: "lesson12", title: "Introduction to React", chapterId: "chapter6" },
];

const chapters = [
  { id: "chapter1", name: "Basic Concepts", courseId: "WebdevCrashCourse" },
  {
    id: "chapter2",
    name: "Intermediate JavaScript",
    courseId: "WebdevCrashCourse",
  },
  {
    id: "chapter3",
    name: "Advanced JavaScript",
    courseId: "WebdevCrashCourse",
  },
  { id: "chapter4", name: "DOM Manipulation", courseId: "WebdevCrashCourse" },
  {
    id: "chapter5",
    name: "Asynchronous Programming",
    courseId: "WebdevCrashCourse",
  },
  {
    id: "chapter6",
    name: "Frontend Frameworks",
    courseId: "WebdevCrashCourse",
  },
];

type toEditCourseProps = InferSelectModel<typeof courseTable>;
// function EditCoursePage({ course }: { course: toEditCourseProps }) {
//   return ()

// }
function EditCourseForm({ course }: { course: toEditCourseProps }) {
  const [courseInfo, setcourseInfo] = useState(course);
  const [formState, formAction] = useFormState(editCourseInfo, {
    error: null,
    type: {},
  });
  return (
    <>
      {formState.type?.success && (
        <p className="text-center text-green-500">
          {" "}
          successfully changed the course info{" "}
        </p>
      )}

      <form
        action={formAction}
        className="mx-auto flex w-3/4 flex-col gap-2 pt-8"
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
            <SubmitButton className="rounded-sm bg-mainblue px-4 py-4 font-normal hover:bg-blue-900 ">
              Save
            </SubmitButton>
            <Button className="rounded-sm px-4 py-2 font-normal" disabled>
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
export function EditCourseContentForm() {
  return (
    <>
      <form action="" className="mx-auto flex flex-col  gap-2 pt-8 lg:w-3/4">
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
            <SubmitButton className="rounded-sm bg-mainblue px-4 py-4 font-normal hover:bg-blue-900 ">
              Save
            </SubmitButton>
            <Button className="rounded-sm px-4 py-2 font-normal" disabled>
              Edit Course Info
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-row  gap-4 py-4">
            <div className="w-1/2">
              <h3 className="pb-2 pl-3 font-medium">Course Content</h3>
              <Card>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {chapters.map((chap) => (
                      <ChapterAccItem
                        chapter={chap}
                        lessonsArray={lessons}
                        key={chap.id}
                      />
                    ))}
                    <Input placeholder="Add a new chapter here" />
                  </Accordion>
                </CardContent>
              </Card>
            </div>
            <div className="flex w-1/2 flex-col self-stretch">
              <h3 className="pb-2 pl-3 font-medium">Editing space</h3>

              <Card className="flex grow  pt-4">
                <CardContent className="flex h-full w-full shrink flex-col gap-2">
                  {
                    // <img
                    //   className="m-auto  w-1/2"
                    //   src="/../../../../../../../images/editing_space.jpg"
                    // />
                  }
                  <div className="w-full">
                    <InputComp
                      label="Course title"
                      value="Introduction to React"
                      name="courseTitle"
                    />
                  </div>
                  <div className="grow">
                    <p className="font-medium">Lesson file</p>
                    <UploadDropzone lessonId="" />
                  </div>
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
}: {
  children: ReactNode;
  className: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {!pending ? children : <Loader2 className="size-3 animate-spin" />}
    </Button>
  );
}

function ChapterAccItem({
  chapter,
  lessonsArray,
}: {
  chapter: chapterType;
  lessonsArray: lessonType[];
}) {
  const chapterLessons = lessonsArray.filter(
    (lesson) => lesson.chapterId === chapter.id,
  );
  return (
    <AccordionItem value={chapter.id}>
      <AccordionTrigger className="text-lg font-medium">
        {chapter.name}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-1">
          {chapterLessons.map((lesson) => (
            <button
              className="rounded-sm px-3 py-1 text-left text-base hover:bg-slate-100"
              key={lesson.id}
            >
              {lesson.title}
            </button>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
