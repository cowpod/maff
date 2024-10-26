const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is your GET endpoint!');
});

class Question{
  constructor(full,num1,num2,ans,op){
    this.fullString=full;
    this.firstNumber=num1;
    this.secondNumber=num2;
    this.answer=ans;
    this.operator=op;
  }
}

function getRandomInt(max) {
  n = Math.floor(Math.random() * max);
  return n;
}

function getDivisionQuestion(multiplier=1) {
  let secondNum = getRandomInt(1000)*multiplier;
  let answer = getRandomInt(100)*multiplier;
  let firstNum = answer * secondNum;
  return new Question(
    `${firstNum} / ${secondNum} = ${answer}`,
    firstNum,
    secondNum,
    answer,
    '/'
  )
}

function getMultiplcationQuestion(multiplier=1) {
  let firstNum = getRandomInt(1000)*multiplier;
  let secondNum = getRandomInt(1000)*multiplier;
  let answer = firstNum * secondNum;
  return new Question(
    `${firstNum} * ${secondNum} = ${answer}`,
    firstNum,
    secondNum,
    answer,
    'x'
  ) 
}

function getAdditionQuestion(multiplier=1) {
  let firstNum = getRandomInt(1000)*multiplier;
  let secondNum = getRandomInt(1000)*multiplier;
  let answer = firstNum + secondNum;
  return new Question(
    `${firstNum} + ${secondNum} = ${answer}`,
    firstNum,
    secondNum,
    answer,
    '+'
  ) 
}

function getSubtractionQuestion(multiplier=1) {
  let firstNum = getRandomInt(1000)*multiplier;
  let secondNum = getRandomInt(1000)*multiplier;
  let answer = firstNum - secondNum;
  return new Question(
    `${firstNum} - ${secondNum} = ${answer}`,
    firstNum,
    secondNum,
    answer,
    '-'
  ) 
}

const questionGenerators = [getMultiplcationQuestion, getDivisionQuestion, getAdditionQuestion, getSubtractionQuestion];

function getRandomQuestion() {
  let q = questionGenerators[getRandomInt(questionGenerators.length-1)];
  console.log(q());
  return q;
}

// Define a GET endpoint
app.get('/question', (req, res) => {
  const { amount } = req.query;
  let questions = [];
  let i = 0;
  
  while (i < amount) {
    questions.push(getRandomQuestion()())
    i++;
  }
  
  res.send(questions)
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
