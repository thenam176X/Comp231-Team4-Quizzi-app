import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const QuizContainer = styled.div`
  margin: 2em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const QuizTitle = styled.h2`
  color: #333;
  font-size: 1.5em;
  cursor: pointer;
  &:hover {
    color: #007BFF;
  }
`;

const AvailableQuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/quiz')
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  const handleQuizClick = (quizId) => {
    history.push(`/quiz/${quizId}`);
  };

  return (
    <QuizContainer>
      <h1>Available Quizzes</h1>
      {quizzes.map((quiz, index) => (
        <QuizTitle key={index} onClick={() => handleQuizClick(quiz._id)}>
          {quiz.title}
        </QuizTitle>
      ))}
    </QuizContainer>
  );
};

export default AvailableQuizPage;
