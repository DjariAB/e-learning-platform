import Quiz from "./components/quiz";
const quizData: {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correct: number;
}[] = [
  {
    question: "What is the capital of France?",
    choice1: "Paris",
    choice2: "London",
    choice3: "Berlin",
    choice4: "Rome",
    correct: 1,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choice1: "William Shakespeare",
    choice2: "Jane Austen",
    choice3: "Charles Dickens",
    choice4: "Leo Tolstoy",
    correct: 1,
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    choice1: "Earth",
    choice2: "Mars",
    choice3: "Venus",
    choice4: "Jupiter",
    correct: 2,
  },
  {
    question: "What is the chemical symbol for water?",
    choice1: "O2",
    choice2: "CO2",
    choice3: "H2O",
    choice4: "H2SO4",
    correct: 3,
  },
  {
    question: "Who painted the Mona Lisa?",
    choice1: "Pablo Picasso",
    choice2: "Leonardo da Vinci",
    choice3: "Vincent van Gogh",
    choice4: "Michelangelo",
    correct: 2,
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
