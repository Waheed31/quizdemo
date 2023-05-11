import React, { useState } from 'react';
import questions from './questions';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [activeButton, setActiveButton] = useState(0);

  const handleAnswerButtonClick = () => {
    const isCorrect =
      questions[currentQuestion].answerOptions.find(
        (option) => option.isCorrect
      ).answerText === selectedAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextButtonClick = () => {
    const isCorrect =
      questions[currentQuestion].answerOptions.find(
        (option) => option.isCorrect
      ).answerText === selectedAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer('');

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setActiveButton(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleQuestionButtonClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setActiveButton(questionIndex);
  };

  const sidebarButtons = questions.map((question, index) => (
    <button
      key={index}
      onClick={() => handleQuestionButtonClick(index)}
      className={index === activeButton ? 'active' : ''}
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="quiz">
      <div className="sidebar">{sidebarButtons}</div>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <div key={answerOption.answerText}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={answerOption.answerText}
                    checked={selectedAnswer === answerOption.answerText}
                    onChange={handleAnswerChange}
                  />
                  {answerOption.answerText}
                </label>
              </div>
            ))}
          </div>
          <div className="next-button-section">
            <button onClick={handleNextButtonClick} disabled={!selectedAnswer}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
