import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

function EditCoursePage() {
  return (
    <>
      <div className="mx-auto flex w-3/4 flex-col gap-2 pt-8">
        {" "}
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium leading-3 ">Edit Course</h1>
            <p className="text-sm font-light text-gray-600">
              Customize your course and add content
            </p>
          </div>
          <div className="space-x-1">
            <Button className="bg-mainblue rounded-sm px-4 py-2 font-normal hover:bg-blue-900">
              Save
            </Button>
            <Button className="rounded-sm px-4 py-2 font-normal" disabled>
              Edit Content
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="flex gap-4 py-4">
            <div className="flex w-2/3 flex-col gap-2">
              <InputComp label="Course title" name="title" />
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="category" className="font-medium">
                    Category
                  </label>
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
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="font-medium">
                    Level
                  </label>
                  <Select name="level">
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
                label="Brief description"
                name="brief_des"
                isTextArea
                rows={3}
              />
              <InputComp
                label="Main description"
                name="main_des"
                isTextArea
                rows={5}
              />
              <InputComp
                label="Course goals"
                name="goals"
                isTextArea
                rows={5}
              />
            </div>
            <div className="grow">
              <p className="font-medium">Course image</p>
              <UploadDropzone lessonId="" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export default EditCoursePage;

function InputComp({
  label,
  isTextArea,
  rows,
  name,
}: {
  label: string;
  isTextArea?: boolean;
  rows?: number;
  name: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          rows={rows}
          className="text-md rounded-lg border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        ></textarea>
      ) : (
        <Input name={name} type="text" />
      )}
    </div>
  );
}
function getCourseInfo() {
    return null;
}