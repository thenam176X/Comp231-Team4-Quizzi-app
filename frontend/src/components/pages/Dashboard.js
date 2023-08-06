import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const TakeQuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const history = useHistory();
  const { id } = useParams(); // assuming you're using react-router and the quiz ID is in the URL

  useEffect(() => {
   axios.get(`http://localhost:8080/api/user/quiz/latest`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
      });
  });

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null); // reset selected answer for the next question
    } else {
      // If there are no more questions, go to the grading page
      history.push(`/grading/`);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const question = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h1>{quiz.title}</h1>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{question.question}</p>
      {question.answers.map((answer, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`answer-${index}`}
            name="answer"
            value={index}
            checked={selectedAnswerIndex === index}
            onChange={() => setSelectedAnswerIndex(index)}
          />
          <label htmlFor={`answer-${index}`}>{answer}</label>
        </div>
      ))}
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default TakeQuizPage;
