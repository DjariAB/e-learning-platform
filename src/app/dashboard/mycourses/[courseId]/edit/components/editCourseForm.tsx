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
import {
  UploadDropzone,
  UploadImageDropZones,
} from "@/components/uploadButton";

import {
  type ReactNode,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editCourseInfo } from "@/actions/helpers/courseHelpers";
import { Loader2 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import InputComp, { TextAreaComp } from "./InputComp";
import {
  type chapterType,
  type lessonType,
  type toEditCourseProps,
} from "./editWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChapterAccItem,
  AddChapterForm,
  UpdateChapterForm,
  DeleteChapterForm,
} from "./chapterComps";
import {
  addChapterAction,
  updateChapterAction,
} from "@/actions/helpers/chatperHelpers";
import { updateLessonAction } from "@/actions/helpers/lessonHelpers";
import {
  AddLessonForm,
  DeleteLessonForm,
  UpdateLessonForm,
} from "./lessonComps";
import { AddQuizDialog } from "./quizDialog";

function EditCourseForm({
  course,
  setIsEditingInfo,
}: {
  course: toEditCourseProps;
  setIsEditingInfo: Dispatch<SetStateAction<boolean>>;
}) {
  const [courseInfo, setcourseInfo] = useState<toEditCourseProps>(course);
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

      <div></div>
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
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="Web development">Web dev</SelectItem>
                        <SelectItem value="Mobile development">Mobile dev</SelectItem>
                        <SelectItem value="Desktop development">desktop</SelectItem>
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

                        <SelectItem value="Beginner">beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">advanced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <TextAreaComp
                formState={formState}
                value={courseInfo.briefDescription}
                label="Brief description"
                name="Description"
                rows={3}
                onChange={(e) =>
                  setcourseInfo({
                    ...courseInfo,
                    briefDescription: e.target.value,
                  })
                }
              />
              <TextAreaComp
                formState={formState}
                value={courseInfo.mainDescription}
                label="Main description"
                name="mainDescription"
                rows={5}
                onChange={(e) =>
                  setcourseInfo({
                    ...courseInfo,
                    mainDescription: e.target.value,
                  })
                }
              />
              <TextAreaComp
                formState={formState}
                value={courseInfo.courseGoals}
                label="Course goals"
                name="courseGoals"
                rows={5}
                onChange={(e) =>
                  setcourseInfo({ ...courseInfo, courseGoals: e.target.value })
                }
              />
            </div>

            {/* </div> */}
            <div className="grow">
              <p className="font-medium">Course image</p>
              <UploadImageDropZones courseId={course.id} />
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
  courseId,
}: {
  setIsEditingInfo: Dispatch<SetStateAction<boolean>>;
  chapters: Array<chapterType>;
  lessons: Array<lessonType>;
  courseId: string;
}) {
  const [selectedItems, setSelectedItems] = useState({
    chapter: "",
    lesson: "",
  });

  const toEditLesson = lessons.find((less) => less.id === selectedItems.lesson);
  const toEditChapter = chapters.find(
    (chap) => chap.id === selectedItems.chapter,
  );

  const onselectChapter = (chapterId: string) => {
    if (selectedItems.chapter === chapterId)
      setSelectedItems({ chapter: "", lesson: "" });
    else setSelectedItems({ chapter: chapterId, lesson: "" });
  };
  const onselectLesson = (lessonId: string, chapterId: string) => {
    if (selectedItems.lesson === lessonId)
      setSelectedItems({ chapter: chapterId, lesson: "" });
    else setSelectedItems({ chapter: chapterId, lesson: lessonId });
  };
  return (
    <>
      <div className="mx-auto flex  flex-col gap-2 pt-8 lg:w-3/4">
        {" "}
        <div className="flex justify-between px-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium leading-3 ">Edit Course</h1>
            <p className="text-sm font-light text-gray-600 ">
              Customize your course and add content
            </p>
          </div>

          <Button
            className="rounded-sm px-4 py-2 font-normal"
            onClick={() => setIsEditingInfo(true)}
          >
            Edit Course Info
          </Button>
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
                      onSelectChapter={onselectChapter}
                      onSelectLesson={onselectLesson}
                      isSelectedChap={chap.id === selectedItems.chapter}
                      chapter={chap}
                      lessonsArray={lessons}
                      key={chap.id}
                    />
                  ))}
                </Accordion>
              </ScrollArea>
              <AddChapterForm
                action={addChapterAction}
                className="mt-4 h-14"
                courseId={courseId}
              />
            </div>
            <div className="flex w-1/2 flex-col self-stretch">
              <h3 className="pb-2 pl-3 font-medium">Editing space</h3>

              <Card className="flex grow  pt-4">
                <CardContent className="flex h-full w-full shrink flex-col justify-between gap-2">
                  {toEditLesson && toEditChapter ? (
                    <div key={toEditLesson.id}>
                      <UpdateLessonForm
                        action={updateLessonAction}
                        lesson={toEditLesson}
                        className="w-full"
                        courseId={courseId}
                      />
                      <div className="grow">
                        {toEditLesson.LessonContent ? (
                          <img
                            src={toEditLesson.LessonContent}
                            alt="lesson img"
                          />
                        ) : (
                          <>
                            <p className="font-medium">Lesson file</p>
                            <UploadDropzone lessonId={toEditLesson.id} />
                          </>
                        )}
                      </div>
                      <div className="flex justify-between px-4">
                        <AddQuizDialog lessonId={toEditLesson.id} />
                        <DeleteLessonForm
                          courseId={courseId}
                          id={toEditLesson.id}
                        />
                      </div>
                    </div>
                  ) : toEditChapter ? (
                    <>
                      <div
                        className="flex h-full w-full flex-col items-center gap-4 "
                        key={toEditChapter.id}
                      >
                        <UpdateChapterForm
                          action={updateChapterAction}
                          chapter={toEditChapter}
                        />

                        <AddLessonForm
                          chapterId={toEditChapter.id}
                          className="w-full"
                          courseId={courseId}
                        />
                      </div>
                      <div>
                        <DeleteChapterForm
                          className="justify-self-end"
                          courseId={courseId}
                          id={toEditChapter.id}
                          key={toEditChapter.id}
                        />
                      </div>
                    </>
                  ) : (
                    <img
                      className="m-auto  w-1/2"
                      alt="editing space "
                      src="/../../../../../../../images/editing_space.jpg"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
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
