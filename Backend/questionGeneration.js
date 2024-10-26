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
  let secondNum = getRandomInt(100*multiplier);
  let answer = getRandomInt(10*multiplier);
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
  let firstNum = getRandomInt(100*multiplier);
  let secondNum = getRandomInt(100*multiplier);
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
  let firstNum = getRandomInt(100*multiplier);
  let secondNum = getRandomInt(100*multiplier);
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
  let firstNum = getRandomInt(100*multiplier);
  let secondNum = getRandomInt(100*multiplier);
  let answer = firstNum - secondNum;
  return new Question(
    `${firstNum} - ${secondNum} = ${answer}`,
    firstNum,
    secondNum,
    answer,
    '-'
  ) 
}

function getRandomQuestion() {
  // returns function
  let questionGenerators = [getMultiplcationQuestion, getDivisionQuestion, getAdditionQuestion, getSubtractionQuestion];
  let q = questionGenerators[getRandomInt(questionGenerators.length-1)];
  // console.log(q());
  return q;
}

module.exports = getRandomQuestion;