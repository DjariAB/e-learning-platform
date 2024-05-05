"use server";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { chapterTable, courseTable, lessonTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

export async function Seed() {
  const courses = [
    {
      title: "Duke Fighting Fundelmentals",
      level: "beginner",
      imageUrl:
        "https://legendary-digital-network-assets.s3.amazonaws.com/wp-content/uploads/2024/02/29104928/Dune-Part-Two-Paul-Atreides.jpg",
    },
    {
      title: "Fremen Survival Skills",
      level: "beginner",
      imageUrl:
        "https://static.qobuz.com/images/covers/9a/8k/mrvlalpv78k9a_600.jpg",
    },
    {
      title: "Bene Gesserit Rituals",
      level: "beginner",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/PYx2QFLAW6XH4IBidJELZVyY880=/0x0:2880x1181/1200x800/filters:focal(1363x174:1823x634)/cdn.vox-cdn.com/uploads/chorus_image/image/70029000/Screen_Shot_2021_10_21_at_7.25.53_PM.0.png",
    },
  ];

  const { user } = await validateRequest();

  if (!user || !user.isMentor) return;

  for (const course of courses) {
    const id = generateId(7);
    await db.insert(courseTable).values({
      id,
      educatorId: user.id,
      imageUrl: course.imageUrl,
      level: course.level,
      title: course.title,
      category: "Web dev",
      briefDescription: "",
      mainDescription: "",
      courseGoals: "",
    });
  }

  const dbCourses = await db
    .select()
    .from(courseTable)
    .where(eq(courseTable.educatorId, user.id));

  for (const course of dbCourses) {
    const firstid = generateId(7);
    await db
      .insert(chapterTable)
      .values({ courseId: course.id, name: "chapter one", id: firstid });
    await generateLessons(firstid);
    const secondid = generateId(7);
    await db
      .insert(chapterTable)
      .values({ courseId: course.id, name: "chapter two", id: secondid });
    await generateLessons(secondid);
    const thirdid = generateId(7);
    await db
      .insert(chapterTable)
      .values({ courseId: course.id, name: "chapter three", id: thirdid });
    await generateLessons(thirdid);
  }

  revalidatePath("/courses");
}

async function generateLessons(id: string) {
  const firstlesson = generateId(7);
  await db
    .insert(lessonTable)
    .values({ id: firstlesson, chapterId: id, title: "Martial Arts" });
  const secondlesson = generateId(7);
  await db.insert(lessonTable).values({
    id: secondlesson,
    chapterId: id,
    title: "Dune Swordsmanship",
  });
}
