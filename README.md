# Maff Documentation

## Overview

This math game application is built as part of a hackathon project. It prompts users with dynamically generated math equations, tracks scores, and maintains a leaderboard. The application uses Node.js, Express, WebSocket, and SQLite for managing game logic and data persistence.

## Game Mechanics

The math questions cover four basic operations:
- Addition: Generates a question in the form a + b.
- Subtraction: Generates a question in the form a - b.
- Multiplication: Generates a question in the form a * b.
- Division: Generates a question in the form a / b.
- Questions are generated with a difficulty multiplier, which scales the range of random numbers.

# Client Requirements

- Tailwind CSS
- React.JS

# Client features

- Math equation and prompt
- Scoreboard (total amount correct)
- Sounds

## Server Requirements
- Node
- NPM

## Server Node dependencies
- express 
- cors
- ws
- sqlite3

## Server setup

Clone the repository.
```
git clone git@github.com:cowpod/maff.git
cd maff/Backend
```

Install dependencies.
```
npm install
```

Start the server.
```
node index.js
```

The server runs on http://localhost:4000 by default.

## Server Structure

- index.js: Main server setup and endpoint handling.
- questionGeneration.js: Contains logic for generating math questions.
- database.js: Handles SQLite operations for storing and retrieving leaderboard data.
- leaderboard.js: Contains methods for leaderboard retrieval and score submission.

## Server API Endpoints

1. Root Endpoint
    URL: `/`\
    Method: GET\
    Description: Returns a default message to verify server connection.\
    Response: "Quack you"
2. Get Math Questions
    URL: `/question`\
    Method: GET\
    Description: Generates a specified number of math questions based on difficulty.\
    Query Parameters:\
    amount: Number of questions to generate.\
    difficulty: (optional) Difficulty level multiplier.\
    Example Request: GET /question?amount=5&difficulty=2\
    Response: JSON array of generated question objects.
3. Get Leaderboard
    URL: `/leaderboard`\
    Method: GET\
    Description: Retrieves the top scores from the leaderboard.\
    Response: JSON array of top players with names and scores.
4. Submit Score
    URL: `/submitscore`\
    Method: POST\
    Description: Saves a new player score to the leaderboard.\
    Request Body:
    ``
    {
    "name": "PlayerName",
    "score": 100
    }
    ``
    Response: Status message confirming score submission.

## Server Question Example

Each question is generated as an object with the following structure:
```
{
  "fullString": "50 + 25 = ?",
  "firstNumber": 50,
  "secondNumber": 25,
  "answer": 75,
  "operator": "+"
}
```

## Server Database Schema

The SQLite database (db.sqlite) is used for persistent leaderboard scores.

### Server Leaderboard Table
Table Name: leaderboard\
Schema:
```
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
score INTEGER NOT NULL
```

# Group Members

- Alexandra B
- Chris H
- Henry G
- Sebastien P
