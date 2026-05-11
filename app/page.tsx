'use client';

import { useMemo, useState } from 'react';
import questions from '../data/questions.json';

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionProgress, setQuestionProgress] = useState(() =>
    questions.map(() => ({
      selectedOption: null,
      attempted: false,
      isCorrect: false,
    }))
  );
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentProgress = questionProgress[currentIndex];
  const selectedOption = currentProgress.selectedOption;
  const attempted = currentProgress.attempted;
  const score = useMemo(
    () => questionProgress.filter((item) => item.isCorrect).length,
    [questionProgress]
  );
  const percentage = useMemo(
    () => Math.round((score / questions.length) * 100),
    [score]
  );
  const failed = percentage <= 80;

  function handleDragStart(event, optionId) {
    event.dataTransfer.setData('text/plain', optionId);
    event.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(event) {
    event.preventDefault();

    if (attempted) return;

    const optionId = event.dataTransfer.getData('text/plain');
    const droppedChoice = currentQuestion.choices.find((choice) => choice.id === optionId);

    if (droppedChoice) {
      setQuestionProgress((prev) => {
        const next = [...prev];
        next[currentIndex] = {
          selectedOption: optionId,
          attempted: true,
          isCorrect: droppedChoice.correct,
        };
        return next;
      });
    }
  }

  function handleNext() {
    if (currentIndex + 1 === questions.length) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function handlePrevious() {
    if (currentIndex === 0) return;
    setCurrentIndex((index) => index - 1);
  }

  function handleEndQuiz() {
    setFinished(true);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setQuestionProgress(
      questions.map(() => ({
        selectedOption: null,
        attempted: false,
        isCorrect: false,
      }))
    );
    setFinished(false);
  }

  if (finished) {
    return (
      <main className="page-shell">
        <section className="summary-card">
          <h1>Quiz Completed</h1>
          <div className={`result-summary ${failed ? 'failed' : 'passed'}`}>
            <div className="score-row">
              <p>
                You answered <strong>{score}</strong> out of <strong>{questions.length}</strong> questions correctly.
              </p>
              {failed ? <span className="result-status">Failed</span> : <span className="result-status passed-status">Passed</span>}
            </div>
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${percentage}%` }} />
            </div>
            <p className="score-label">{percentage}%</p>
          </div>
          <div className="summary-list">
            {questions.map((question, index) => {
              const progress = questionProgress[index];
              const selectedChoice = question.choices.find((choice) => choice.id === progress.selectedOption);
              const correctChoice = question.choices.find((choice) => choice.correct);
              const selectedText = selectedChoice?.text || 'No answer selected';
              const correct = progress.isCorrect;
              const explanation = progress.attempted
                ? selectedChoice?.explanation || ''
                : 'No answer was selected.';

              return (
                <div key={question.id} className="summary-item">
                  <h2>{question.question}</h2>
                  <p>
                    Your answer: <strong>{selectedText}</strong> — {correct ? 'Correct' : 'Incorrect'}
                  </p>
                  {!correct ? (
                    <div className="feedback-box">
                      <p>
                        Correct answer: <strong>{correctChoice?.text}</strong>
                      </p>
                      <p>{explanation}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <button className="primary-button" onClick={handleRestart}>
            Restart Quiz
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="quiz-card">
        <header className="quiz-header">
          <div>
            <p className="progress">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <h1>{currentQuestion.question}</h1>
          </div>
          <button className="secondary-button end-quiz-button" onClick={handleEndQuiz}>
            End Quiz
          </button>
        </header>

        <div className="question-grid">
          <div className="options-column">
            <p className="draggable-note">Drag one answer onto the image circle. You can only make one attempt per question.</p>
            <div className="options-grid">
              {currentQuestion.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  draggable
                  onDragStart={(event) => handleDragStart(event, choice.id)}
                  className={`option-button ${selectedOption === choice.id ? 'selected' : ''}`}
                >
                  <span className="option-key">{choice.id.toUpperCase()}</span>
                  <span>{choice.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="image-drop-card">
            <div
              className={`image-circle ${selectedOption && !currentQuestion.choices.find(c => c.id === selectedOption)?.correct ? 'wrong' : ''}`}
              onDragOver={attempted ? undefined : handleDragOver}
              onDrop={handleDrop}
            >
              <img src={currentQuestion.image} alt={currentQuestion.imageCaption} />
              <div className="drop-hint">
                {attempted ? 'Answer locked' : 'Drop your answer here'}
              </div>
            </div>
            {selectedOption ? (
              <p className="selection-status">
                Selected answer: <strong>{selectedOption.toUpperCase()}</strong>
              </p>
            ) : null}
          </div>
        </div>

        <footer className="quiz-footer">
          <button className="secondary-button" onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          <button className="primary-button" onClick={handleNext}>
            {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </footer>
      </section>
    </main>
  );
}
