import { db } from "@/server/db";
import Quiz from "./components/quiz";
import {
  enrolledCoursesTable,
  lessonTable,
  questionTable,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
const quizData: {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  correct: string;
}[] = [
  {
    question: "What is the purpose of the useState hook in React?",
    choice1: "It is used to fetch data from an API",
    choice2: "London",
    choice3: "Berlin",
    correct: "It is used to add state to functional components",
  },
];
function shuffle(array: quizType) {
  return array.sort(() => Math.random() - 0.5);
}
export type quizType = typeof quizData;
async function Page({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const courses = await db
    .select()
    .from(enrolledCoursesTable)
    .where(eq(enrolledCoursesTable.courseId, params.courseId));

  const lessons = await db
    .select({ lessonIndex: lessonTable.index })
    .from(lessonTable)
    .where(eq(lessonTable.id, params.lessonId));

  const questions = await db
    .select({
      question: questionTable.question,
      choice1: questionTable.choice1,
      choice2: questionTable.choice2,
      choice3: questionTable.choice3,
      correct: questionTable.correctAnswer,
    })
    .from(questionTable)
    .where(eq(questionTable.lessonId, params.lessonId));

  const lesson = lessons[0];
  const course = courses[0];
  if (!courses || !course || !lesson)
    return <p>you will need to enroll this course first</p>;
  return (
    <div>
      <Quiz
        quizData={questions.length ? shuffle(questions) : shuffle(quizData)}
        currentCourse={course}
        lessonIndex={lesson.lessonIndex}
        lessonId={params.lessonId}
      />
    </div>
  );
}

export default Page;
