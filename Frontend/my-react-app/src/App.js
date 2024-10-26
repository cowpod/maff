import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  

  return (
    <div className="App">
      <header className="App-header">

        <DisplayProblem />
      </header>
    </div>
  );
}

// math problem display component
const DisplayProblem = ({firstNum="10", secondNum="20", operator="+", initialAnswer="30"}) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    // Compare the inputted answer with the initial answer
    if (answer === initialAnswer) {
      alert("Correct!");
    } else {
      alert("you fucking suck");
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is Enter
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const skip = () => {
    alert("skipped you fucking loser")
  }
  
  
  return (
    <div> 
      <div className="flex content-center">{firstNum}</div>
      <div className="flex content-center">{operator} {secondNum}</div>
      {/* insert line break  */}
      <hr /> 
      <input className="border-2" type="text" value={answer} onKeyPress={handleKeyPress} onChange={(e) => setAnswer(e.target.value)} />
    
      <button className="flex content-center" onClick={handleSubmit}>Submit</button>
      <button className="flex content-center" onClick={skip}>Skip</button>
    </div>
  )
}

// /question?amount=12&difficulty=<1-3>
export default App;
