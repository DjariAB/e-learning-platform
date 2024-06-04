import { db } from "@/server/db";
import Quiz from "./components/quiz";
import { enrolledCoursesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
const quizData: {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  correct: string;
}[] = [
  // {
  //   question: "Who painted the Mona Lisa?",
  //   choice1: "Pablo Picasso",
  //   choice2: "Michelangelo",
  //   choice3: "Vincent van Gogh",
  //   correct: "Leonardo da Vinci",
  // },
  // {
  //   question: "Who wrote 'Romeo and Juliet'?",
  //   choice1: "Leo Tolstoy",
  //   choice2: "Jane Austen",
  //   choice3: "Charles Dickens",
  //   correct: "William Shakespeare",
  // },
  // {
  //   question: "Which planet is known as the 'Red Planet'?",
  //   choice1: "Earth",
  //   choice2: "Jupiter",
  //   choice3: "Venus",
  //   correct: "Mars",
  // },
  // {
  //   question: "What is the chemical symbol for water?",
  //   choice1: "O2",
  //   choice2: "CO2",
  //   choice3: "H2SO4",
  //   correct: "HZO",
  // },
  {
    question: "What is the purpose of the useState hook in React?",
    choice1: "It is used to fetch data from an API",
    choice2: "London",
    choice3: "Berlin",
    correct: "It is used to add state to functional components",
  },
];
export type quizType = typeof quizData;
async function Page({ params }: { params: { courseId: string } }) {
  const courses = await db
    .select()
    .from(enrolledCoursesTable)
    .where(eq(enrolledCoursesTable.courseId, params.courseId));

  const course = courses[0];
  if (!courses || !course)
    return <p>you will need to enroll this course first</p>;
  return (
    <div>
      <Quiz quizData={quizData} currentCourse={course} />
    </div>
  );
}

export default Page;
