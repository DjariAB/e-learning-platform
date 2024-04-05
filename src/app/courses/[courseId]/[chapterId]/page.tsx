import React from "react";

export default function LessonPage({
  params,
}: {
  params: { chapterId: string };
}) {
  return <div>this is chapter {params.chapterId} </div>;
}
