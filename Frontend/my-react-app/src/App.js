import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchQuestions = async ({ queryAmount, queryDiff }) => {
  // if (!animal) return [];

  const apiRes = await fetch(
    `http://127.0.0.1/question?amount=10`
    // &difficulty=${queryDiff}`
  );

  if (!apiRes.ok) {
    throw new Error(`details/${queryAmount} ${queryDiff} fetch not ok`);
  }

  // const data = await apiRes.json();
  // return data; 
  console.log(apiRes.json)
  
  // return apiRes.json();
};

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
const DisplayProblem = ({firstNum="20", secondNum="20", operator="+", initialAnswer="40"}) => {

  const results = useQuery({
    queryKey: ["search", { queryAmount: 10, queryDiff: 2 }],
    queryFn: fetchQuestions,
  });
  // let questions = fetchQuestions();
  //console.log(results)

  // console.log(results)

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

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred: {error.message}</div>;
  
  
  return (
    <div className="flex flex-col"> 
      <div className="content-center">{firstNum}</div>
      <div className="content-center">{operator} {secondNum}</div>
      {/* insert line break  */}
      <hr /> 
      <input className="border-2 border-black mb-3" type="text" value={answer} onKeyPress={handleKeyPress} onChange={(e) => setAnswer(e.target.value)} />
    
      <button className="border-2 border-black content-center mb-3" onClick={handleSubmit}>Submit</button>
      <button className="border-2 border-black content-center" onClick={skip}>Skip</button>
    </div>
  )
}

export default App;
