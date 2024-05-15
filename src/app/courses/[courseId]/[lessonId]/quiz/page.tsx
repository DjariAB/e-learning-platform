import Quiz from "./components/quiz";
const quizData: {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  correct: string;
}[] = [
  {
    question: "What is the capital of France?",
    choice1: "Rome",
    choice2: "London",
    choice3: "Berlin",
    correct: "Paris",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choice1: "Leo Tolstoy",
    choice2: "Jane Austen",
    choice3: "Charles Dickens",
    correct: "William Shakespeare",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    choice1: "Earth",
    choice2: "Jupiter",
    choice3: "Venus",
    correct: "Mars",
  },
  {
    question: "What is the chemical symbol for water?",
    choice1: "O2",
    choice2: "CO2",
    choice3: "H2SO4",
    correct: "HZO",
  },
  {
    question: "Who painted the Mona Lisa?",
    choice1: "Pablo Picasso",
    choice2: "Michelangelo",
    choice3: "Vincent van Gogh",
    correct: "Leonardo da Vinci",
  },
];
export type quizType = typeof quizData;
async function Page() {
  return (
    <div>
      <Quiz quizData={quizData} />
    </div>
  );
}

export default Page;
