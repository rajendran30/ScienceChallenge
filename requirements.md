# Biology Quiz Application Requirements

## Overview
Create a Next.js web application that quizzes users with 10 biology questions. The application must load all question data from a JSON file and should not use a database.

## Core Functionality
- Display a quiz with 10 biology questions.
- Each question must include four multiple-choice answers.
- Only one answer may be correct.
- Question data and answer choices should be stored in `data/questions.json`.
- Each question must include an image displayed in a circular drop target.
- The image should render clearly and should not include text labels inside the circle.

## Answer Interaction
- Users should select answers by dragging one of the answer options and dropping it onto the image circle.
- Clicking answer options must not count as an answer.
- The student gets only one attempt to drop an answer for each question.
- If a wrong answer is dropped, the circle should immediately change to a red tint indicating an incorrect attempt.
- Once an answer is dropped, the student cannot change it for that question.
- The application should allow navigation to the next and previous questions even when no answer has been dropped.

## Scoring and Feedback
- Do not show answer results or explanations immediately after each question.
- Show the results only at the end of the quiz.
- At the end of the quiz, display the total score and a summary of each question.
- For incorrect answers, show the correct answer and a detailed explanation in the final summary.

## User Interface
- Use a clean, modern layout with the quiz question displayed clearly.
- Show a prominent circular image drop target next to the answer options.
- Display a `Previous` button and a `Next` button on each question screen.
- The `Previous` button should be disabled on the first question.
- The `Next` button should allow the user to continue even if no answer has been dropped.
- Include drag instructions near the answer options.

## Implementation Notes
- Built using Next.js and React.
- Use client-side state to manage current question, answered state, attempts, and quiz progress.
- Load quiz data from a static JSON file rather than a database.
- Keep visuals consistent and ensure the application remains usable on desktop screens.
