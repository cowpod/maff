import "./App.css";
import Leaderboard from "./Leaderboard.js";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchQuestions = async ({ queryAmount, queryDiff }) => {
  const apiRes = await fetch(`http://127.0.0.1:4000/question?amount=10`);
  if (!apiRes.ok) {
    throw new Error(`Fetch not ok: ${apiRes.statusText}`);
  }
  return apiRes.json();
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
            <Tutorial/>
        </div>
        <div className="components-container align-items">
          <div className="flex align-items justify-content">
            <Leaderboard/>
            <ProblemSet />
          </div>
        </div>
      </header>
    </div>
  );
}

const Tutorial = () => {
  return <div>Welcome to our Math Challenge game! Compete against friends and players worldwide by answering math questions as quickly as possible—faster responses earn you more points. Climb the leaderboard and show off your math skills to become the ultimate champion!</div>
}

const ProblemSet = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ["search", { queryAmount: 10, queryDiff: 2 }],
    queryFn: fetchQuestions,
  });

  if (isLoading) return <p>Loading questions...</p>;
  if (error) return <p>Error fetching questions: {error.message}</p>;

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("No more questions!");
    }
  };

  return (
    <DisplayProblem
      currentQuestion={currentQuestion}
      setCurrentQuestionIndex={setCurrentQuestionIndex}
      handleNextQuestion={handleNextQuestion}
      score={score}
      setScore={setScore}
    />
  );
};

const DisplayProblem = ({ currentQuestion, setCurrentQuestionIndex, handleNextQuestion, score, setScore }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (currentQuestion.answer === parseInt(answer)) {
      alert("Correct!");
      setScore(score + 1); // Increment score if correct
      handleNextQuestion();
      setAnswer(""); // Clear input after submission
    } else {
      alert("Try Again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const skip = () => {
    alert("Skipped");
    handleNextQuestion(); // Skip to the next question
  };

  if (!currentQuestion) return <p>No questions available</p>;

  return (
    <div className="problem-container">
      <div className="number-display">{currentQuestion.firstNumber}</div>
      <div className="operator-display">
        {currentQuestion.operator} {currentQuestion.secondNumber}
      </div>
      <hr className="separator" />
      <input
        className="answer-input"
        type="text"
        value={answer}
        onKeyPress={handleKeyPress}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <button className="skip-button" onClick={skip}>
        Skip
      </button>
      <div>score {score}</div>
    </div>
  );
};

export default App;
