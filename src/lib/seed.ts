"use server";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { chapterTable, courseTable, lessonTable } from "@/server/db/schema";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

const courses = [
  {
    title: "REACT course: complete mastery",
    level: "Beginner",
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
    category: "Web development",
    briefDescription:
      "Welcome to REACT course: complete mastery! This course will give you an introduction to the 80% of React concepts that you will use on a daily basis.",
    mainDescription:
      "Learn to build dynamic and interactive user interfaces with React, a popular JavaScript library for front-end web development. This course will guide you through the fundamentals of React, including components, JSX, state, props, and hooks. You'll gain the skills to create modern web applications and enhance your front-end development abilities.",
    courseGoals: "",
  },
  {
    title: "drizzle course: complete mastery",
    level: "Beginner",
    imageUrl: "https://pbs.twimg.com/media/F7V2rLQWUAAgaLh.jpg",
    category: "Web development",
    briefDescription: "",
    mainDescription: "",
    courseGoals:
      " Gain a solid understanding of React's core concepts, including components, JSX, state, props, and hooks. Master the art of creating modular and reusable components, promoting efficient and maintainable code",
  },
  {
    title: "The Typescript crash course",
    level: "Beginner",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zH78gT3m8RMp54k_ER9PUV5F4i38jTSA4A&s",
    category: "Mobile development",
    briefDescription:
      "Uncover the power of TypeScript, a superset of JavaScript that adds optional static typing. This course will equip you to write cleaner, more maintainable, and error-resistant code.",
    mainDescription:
      "Dive into the world of TypeScript and unlock a new level of development efficiency. TypeScript extends JavaScript with optional static typing, allowing you to define the data types of variables, functions, and other elements in your code. This proactive approach helps catch errors early in the development process, leading to more reliable and robust applications.",
    courseGoals:
      " Solidify Typing Fundamentals: Gain a comprehensive understanding of types in TypeScript, including primitive types, custom types, and type aliases. Master Interfaces: Learn how to effectively define interfaces to enforce object structures and promote consistent data usage.",
  },
  {
    title: "Next js course: from zero to hero",
    level: "Beginner",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI05b9H1lM5Vj-WzbXl5uLkS5zzyca1MEwZROSldHqXw&s",
    category: "Web development",
    briefDescription:
      "Empower yourself to build fast, user-friendly, and SEO-optimized web applications with Next.js, a powerful React framework.",
    mainDescription:
      "Unleash the potential of Next.js in this comprehensive course designed to equip you with the skills to build exceptional web applications. Next.js is a React framework that streamlines the development process by offering a collection of features specifically tailored for building high-performance web experiences.",
    courseGoals: "",
  },
  {
    title: "Data structures and algorithms",
    level: "Beginner",
    imageUrl:
      "https://msatechnosoft.in/blog/wp-content/uploads/2018/09/DSA-MSA-Technosoft.png",
    category: "Web development",
    briefDescription: "",
    mainDescription: "",
    courseGoals: "",
  },
];
export async function Seed() {
  const { user } = await validateRequest();

  if (!user || !user.isMentor) return;

  const ids: Array<string> = [];

  for (const course of courses) {
    const id = generateId(7);
    ids.push(id);
    await db.insert(courseTable).values({
      id,
      educatorId: user.id,
      imageUrl: course.imageUrl,
      level: course.level,
      title: course.title,
      category: course.category,
      briefDescription: course.briefDescription,
      mainDescription: course.mainDescription,
      lessonsNum: 3,
      courseGoals: course.courseGoals,
    });
  }

  for (const id of ids) {
    const firstid = generateId(7);
    const secondid = generateId(7);
    const thirdid = generateId(7);

    await insertchapterReact(id, firstid, secondid, thirdid);

    await generateLessons(firstid);
    await generateLessons(secondid);
    await generateLessons(thirdid);
  }

  revalidatePath("/courses");
}

async function generateLessons(id: string) {
  const firstlesson = generateId(7);
  const secondlesson = generateId(7);
  const thirdlesson = generateId(7);
  await db.insert(lessonTable).values([
    { id: firstlesson, chapterId: id, title: "Your first component" },
    {
      id: secondlesson,
      chapterId: id,
      title: "State: A component memory",
    },
    {
      id: thirdlesson,
      chapterId: id,
      title: "Choosing the state structure",
    },
  ]);
}

async function insertchapterReact(
  courseId: string,
  id: string,
  secondid: string,
  thirdid: string,
) {
  await db.insert(chapterTable).values([
    { courseId, name: "Describing the UI", id },
    { courseId, name: "Adding interactivity", id: secondid },
    { courseId, name: "Managing state", id: thirdid },
  ]);
}
