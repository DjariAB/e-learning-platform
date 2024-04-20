import { UploadDropzone } from "@/components/uploadButton";
import { db } from "@/server/db";
import { fileTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function CoursePage({
  params,
}: {
  params: { lessonId: string };
}) {
  const files = await db
    .select()
    .from(fileTable)
    .where(eq(fileTable.lessonId, params.lessonId));
  return (
    <div>
      {files.map((file) => (
        <div key={file.id}> {file.name} </div>
      ))}
      <UploadDropzone lessonId={params.lessonId} />
    </div>
  );
}
