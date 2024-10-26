
import "./App.css";
import Leaderboard from "./Leaderboard.js";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

let volume = 1;

const fetchQuestions = async ({ queryAmount, queryDiff }) => {
  const apiRes = await fetch(`http://127.0.0.1:4000/question?amount=2000`);
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
        Volume:
        <input type="range" id="volumeSlider" min="0" max="100" value="100" step="1" onclick="volume = this.value/100;"></input>
      </header>
    </div>
  );
}

const Tutorial = () => {
  return <div>Welcome to our Math Challenge game! Compete against friends and players worldwide by answering math stions as quickly as possible. Climb the leaderboard and show off your math skills to become the ultimate champion!</div>
}

const playBeep = (volume=1) => {
  var audio = new Audio("data:audio/mpeg;base64,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wZ0G7jqlt/OcDIKX+/1NblSX+VKfQfP8xuJJGk7////rf////+PgXTv///1JThJJQainmySAB6imUyuVbVttUo7T4Csa821OuF88f62+CZHFnGf///mQgYIEO0SMF2NVy9NxYTdlqJ8AuS4zr//SJoTUJ+CaKKTcZvosrUPo8W/MUv0f033E9E/QpN6P///v/////WRR2mwUAYUABjabRu1vrOLKAF0kIdHjnEx/iNWo7jGn1////mApxNTJQQOU1Het/NoUFTMQs6Vja///THaGIl/0fojl8mjd/Jo8W+ZfpNpCajsz7////6kn/////WRRgDz//LD1KSTDjKOciSAKxdLx5S31uYqKIWj/+5JECgAC8V5M6g9rdFyr6Vo9rW6KtHcr5DEJQRkSpLRklSigvVc4QpmyPe9H3zHR1/in9P/8VNCMJOzYUDyVjfwHP0ZgiZt/3/+9EBnDKbegdUrckhgntHaQ9vX/X/9A/////+r/////mJ3/9ItRcoVRogAcmV9N8z0pvES8QQsKoMGXEymPQyWm6E4HQLqgpv/CZJAtYXQSwoF8e6SB56zABEoW+qgZjJAZovGr0Gl5/OjFKL3JwnaX9v7/X8y1f/////////49WAzMzEYYMZLq6CUANIqbDX7lisBIdraAEPwShTRc9WZ2vAqBc4NQ9GrUNaw0Czcrte0g1NEoiU8NFjx4NFh54FSwlOlgaCp0S3hqo8SLOh3/63f7P/KgKJxxhgGSnAFMCnIogwU5JoqBIDAuBIiNLETyFmiImtYiDTSlb8ziIFYSFv/QPC38zyxEOuPeVGHQ77r/1u/+kq49//6g4gjoVQSUMYQUSAP8PwRcZIyh2kCI2OwkZICZmaZxgnsNY8DmSCWX0idhtz3VTJSqErTSB//1X7TTTVVV//uSZB2P8xwRJ4HvYcItQlWBACM4AAABpAAAACAAADSAAAAEVf/+qCE000VVVVU0002//+qqqqummmmr///qqqppppoqqqqppppoqqATkEjIyIxBlBA5KwUEDBBwkFhYWFhUVFfiqhYWFhcVFRUVFv/Ff/xUVFRYWFpMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==");  
  audio.volume = volume;
  audio.play();
}

const playBoop = (volume=1) => {
  var audio = new Audio("data:audio/mpeg;base64,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")
  audio.volume = volume;
  audio.play();
}

const ProblemSet = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");

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
      name={name}
      setName={setName}
    />
  );
};


const submitScore = (playerName, score) => {
  console.log(playerName, score);
  fetch("http://127.0.0.1/submitScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ playerName, score })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
};


const DisplayProblem = ({ currentQuestion, setCurrentQuestionIndex, handleNextQuestion, score, setScore, name, setName }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (currentQuestion.answer === parseInt(answer)) {
      // alert("Correct!");
      setScore(score + 1); // Increment score if correct
      handleNextQuestion();
      playBoop(volume);
    } else {
      // alert("Try Again.");
      playBeep(volume);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const skip = () => {
    handleNextQuestion(); // Skip to the next question
    playBoop(volume);
  };

  if (!currentQuestion) return <p>No questions available</p>;

  return (
    <div> 
    <div className="problem-container">
      <div className="upper-half">
        <div className="operator-display">{currentQuestion.operator}</div>
        <div className="values-display">
          <div className="first-number">{currentQuestion.firstNumber}</div>
          <div className="second-number">{currentQuestion.secondNumber}</div>
        </div> 
      </div>
      <hr className="separator" />
      <input
        className="answer-input"
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <button className="skip-button" onClick={skip}>
        Skip
      </button>
    </div>
      <div className="score-display">
          <div>Current Score: {score}</div>
          <div>
            Name: 
            <input
              className="answer-input"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-button" onClick={() => submitScore(name, score)}>Submit Score</button>
          </div>
        </div>
    </div>
  );
};


export default App;
