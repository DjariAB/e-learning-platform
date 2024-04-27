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
import { type courseTable } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import InputComp from "./InputComp";
import { ReactNode, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editCourseInfo } from "@/actions/helpers";
import { Loader2 } from "lucide-react";
type toEditCourseProps = InferSelectModel<typeof courseTable>;
function EditCourseForm({ course }: { course: toEditCourseProps }) {
  const [courseInfo, setcourseInfo] = useState(course);
  const [formState, formAction] = useFormState(editCourseInfo, {
    error: null,
    type: null,
  });
  return (
    <>
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
