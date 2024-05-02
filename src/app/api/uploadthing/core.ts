import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import {
  chapterTable,
  courseTable,
  fileTable,
  lessonTable,
  userTable,
} from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f(["image", "text/markdown", "text"])
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      // If you throw, the user will not be able to upload
      const { user } = await validateRequest();
      const lessonId = req.headers.get("lessonId");
      if (!user) throw new UploadThingError("no user");
      if (!lessonId) throw new UploadThingError("no lesson");
      const lesson = await db
        .select()
        .from(lessonTable)
        .where(eq(lessonTable.id, lessonId));

      if (!lesson[0]?.id) throw new UploadThingError("there is no lesson ");

      const isOwner = await db
        .select()
        .from(lessonTable)
        .leftJoin(chapterTable, eq(lessonTable.chapterId, chapterTable.id))
        .leftJoin(courseTable, eq(chapterTable.courseId, courseTable.id))
        .leftJoin(userTable, eq(courseTable.educatorId, userTable.id))
        .where(and(eq(lessonTable.id, lessonId), eq(userTable.id, user.id)));

      if (!isOwner[0]) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, lessonId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      const id = generateId(7);

      await db.insert(fileTable).values({
        id,
        userId: metadata.userId,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
        name: file.name,
      });

      await db
        .update(lessonTable)
        .set({
          ImageUrl: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
        })
        .where(eq(lessonTable.id, metadata.lessonId));

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
