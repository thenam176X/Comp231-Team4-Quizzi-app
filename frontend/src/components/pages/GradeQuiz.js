import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const GradeQuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [grade, setGrade] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/quiz/latest`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
      });
  }, []);
  const [userAnswers, setUserAnswers] = useState(null);

  const handleSubmit = (userAnswers) => {
    axios.post(`http://localhost:8080/api/user/quiz/grade`, userAnswers)
      .then((response) => {
        setGrade(response.data.grade);
        setUserAnswers(response.data.userAnswers);
      })
      .catch((error) => {
        console.error('Error grading quiz:', error);
      });
  };


  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      {grade !== null ? (
        <div>
          <h2>Your grade: {grade}</h2>
          {quiz.questions.map((question, index) => (
            <div key={index}>
              <h3>Question: {question.question}</h3>
              <p>Your answer: {userAnswers[index]}</p>
              <p>Correct answer: {question.answers[question.correctAnswerIndex]}</p>
            </div>
          ))}
          <button onClick={() => history.push('/')}>Go Home</button>
        </div>
      ) : (
        <div>
          <h2>Submitting your answers...</h2>
        </div>
      )}
    </div>
  );
};

export default GradeQuizPage;
