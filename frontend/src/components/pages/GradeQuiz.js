import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const QuizContainer = styled.div`
  margin: 2em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const QuizTitle = styled.h2`
  color: #333;
  font-size: 24px;
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
`;
const QuestionText = styled.p`
white-space: pre-line;
`;
const AnswerText1 = styled.p`
color: ${props => props.isCorrect ? 'green' : 'red'};
text-align: center;
`;
const QuestionContainer = styled.div`
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const GradeQuizPage = () => {
  const history = useHistory();
  const takenQuizData = history.location.state.takenQuizData;

  return (
    <QuizContainer>
       <h1>Quiz Results</h1>
      <QuizTitle>{takenQuizData.title}</QuizTitle>
      <ScoreContainer>Score: {takenQuizData.score}</ScoreContainer>
      {takenQuizData.userAnswers.map((answer, index) => (
        <QuestionContainer  key={index}>
          <QuestionTitle>Question {index + 1}</QuestionTitle>
          <QuestionText dangerouslySetInnerHTML={{ __html: answer.question }} />
          <h4>Time Limit: {answer.timeLimit} seconds</h4>
          <AnswerTitle>Answers: </AnswerTitle>          
            {answer.answer.map((ans, aIndex) => (
               <AnswerText key={aIndex} isCorrect={ans === answer.correctAnswer}>
                   {ans}
               </AnswerText>
            ))}
          <AnswerTitle>Your Answer:  </AnswerTitle>
          <AnswerText>{answer.userAnswer}</AnswerText>
          <AnswerText1 isCorrect={answer.userAnswer === answer.correctAnswer}>
            {answer.userAnswer === answer.correctAnswer ? 'Correct' : 'Incorrect'}
          </AnswerText1>
        </QuestionContainer>
      ))}
      
    </QuizContainer>
  );
};

export default GradeQuizPage;
