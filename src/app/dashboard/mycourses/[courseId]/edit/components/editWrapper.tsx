"use client";
import {
  type lessonTable,
  type courseTable,
  type chapterTable,
} from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { useState } from "react";
import EditCourseForm, { EditCourseContentForm } from "./editCourseForm";
export type lessonType = InferSelectModel<typeof lessonTable>;
export type chapterType = InferSelectModel<typeof chapterTable>;
export default function EditWrapper({
  course,
  courseChapters,
  courseLessons,
}: {
  course: toEditCourseProps;
  courseLessons: Array<lessonType>;
  courseChapters: Array<chapterType>;
}) {
  const [isEditingInfo, setIsEditingInfo] = useState(true);

  return (
    <>
      {isEditingInfo ? (
        <EditCourseForm course={course} setIsEditingInfo={setIsEditingInfo} />
      ) : (
        <EditCourseContentForm
          setIsEditingInfo={setIsEditingInfo}
          lessons={courseLessons}
          chapters={courseChapters}
        />
      )}
    </>
  );
}
export type toEditCourseProps = InferSelectModel<typeof courseTable>;
