import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const QuizContainer = styled.div`
  margin: 2em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const QuizTitle = styled.h2`
  color: #333;
  font-size: 1.5em;
`;

const QuestionContainer = styled.div`
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const QuestionTitle = styled.h3`
  color: #666;
`;

const AnswerTitle = styled.h3`
  color: #666;
`;

const AvailableQuizPreviewPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/quiz')
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);
  const QuestionText = styled.p`
  white-space: pre-line;
`;
  return (
    <QuizContainer>
      <h1>Quiz Preview</h1>
      {quizzes.map((quiz, index) => (
  <div key={index}>
    <QuizTitle>{quiz.title}</QuizTitle>
    {quiz.questions.map((question, qIndex) => (
      <QuestionContainer key={qIndex}>
        <QuestionTitle>Question {qIndex + 1}</QuestionTitle>
        <QuestionText dangerouslySetInnerHTML={{ __html: question.question }} />
        <AnswerTitle>Answer {qIndex + 1}</AnswerTitle>
        <p>{question.answer}</p>
      </QuestionContainer>
          ))}
        </div>
      ))}
    </QuizContainer>
  );
};

export default AvailableQuizPreviewPage;
