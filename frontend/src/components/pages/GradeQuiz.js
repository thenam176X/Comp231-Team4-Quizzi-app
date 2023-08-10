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

const AnswerText = styled.p`
  color: ${props => props.isCorrect ? 'green' : 'black'};
`;
const ScoreContainer = styled.div`
  margin-top: 1em;
  font-size: 1.5em;
  font-weight: bold;
`;
const GradeQuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/quiz/latest')
      .then((response) => {
        setQuizzes([response.data]); // Wrap the single quiz in an array
      })
      .catch((error) => {
        console.error('Error fetching latest quiz:', error);
      });
  }, []);
  const [quizResult, setQuizResult] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/quiz/result/latest')
      .then((response) => {
        setQuizResult(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quiz result:', error);
      });
  }, []);

  useEffect(() => {
    if (quizResult) {
      let correctAnswers = 0;
      quizResult.userAnswers.forEach((answer, index) => {
        if (answer.userAnswer === answer.correctAnswerIndex) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
    }
  }, [quizResult]);

  if (!quizResult) {
    return <div>Loading...</div>;
  }
  const QuestionText = styled.p`
    white-space: pre-line;
  `;

  return (
    <QuizContainer>
     <h1>Quiz Result</h1>
      <ScoreContainer>You scored {score} out of {quizResult.userAnswers.length}</ScoreContainer> {/* Display the score */}
      
      {quizzes.map((quiz, index) => (
        <div key={index}>
          <QuizTitle>{quiz.title}</QuizTitle>
          {quiz.questions.map((question, qIndex) => (
            <QuestionContainer key={qIndex}>
              <QuestionTitle>Question {qIndex + 1}</QuestionTitle>
              <QuestionText dangerouslySetInnerHTML={{ __html: question.question }} />
              <h4>Time Limit: {question.timeLimit} seconds</h4> {/* This line displays the time limit */}
              <AnswerTitle>Answers:</AnswerTitle>
              {question.answers.map((answer, aIndex) => (
                <AnswerText key={aIndex} isCorrect={aIndex === question.correctAnswerIndex}>
                  {answer}
                </AnswerText>
                
              ))}
               <AnswerTitle>Student answer:</AnswerTitle>
    <AnswerText>{quizResult.userAnswers[qIndex].userAnswer}</AnswerText>
            </QuestionContainer>
          ))}
        </div>
      ))}
    </QuizContainer>
  );
};

export default GradeQuizPage;
