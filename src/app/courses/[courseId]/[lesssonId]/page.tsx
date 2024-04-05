import React from "react";

export default function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  return <div>this is the lesson {params.lessonId} </div>;
}
