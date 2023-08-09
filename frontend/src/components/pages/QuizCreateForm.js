import React, { useState, useRef, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styled from 'styled-components';
import '../assets/css/Menu.css';
import { useHistory } from 'react-router-dom';
import Footer from '../assets/js/Footer';
const QuizCreator = () => {
  const [title, setTitle] = useState('');
  const [quizType, setQuizType] = useState('multiple-choice');
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [answers, setAnswers] = useState(['']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState(30);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');
  const history = useHistory();
  const textAreaRef = useRef();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [question]);
  const handleAddAnswer = () => {
    setAnswers([...answers, '']);
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleAddQuestion = () => {
    // Check if the text fields are empty before adding the question
    if (title === '') {
      alert('Please add your title.');
      return;
    }
    if (question === '') {
      alert('Please add your question.');
      return;
    }
    if (answers === '') {
      alert('Please add your answer.');
      return;
    }
    
    const newQuestion = {
      question: question,
      answers: answers, // include all answers
      correctAnswerIndex: correctAnswerIndex,
      quizType: quizType,
      timeLimit: timeLimit,
    };
    if (quizType === 'multiple-choice') {
      newQuestion.answers = answers; // include all answers
      newQuestion.correctAnswerIndex = correctAnswerIndex;
    } else if (quizType === 'true-false') {
      newQuestion.answers = ['True', 'False'];
      newQuestion.correctAnswerIndex = correctAnswerIndex ? 0 : 1; // 0 for True, 1 for False
    }
    if (quizType === 'fill-in-the-blank') {
      newQuestion.answers = [fillBlankAnswer]; // include the fill-in-the-blank answer
      newQuestion.correctAnswerIndex = 0; // the correct answer is always the first one
    }
    
  
    setQuestions([...questions, newQuestion]);
    setQuestion('');
    setAnswers(['']); // reset answers
  
   
   
  };
  
  const handleCreateQuiz = () => {
    const quizData = {
      title: title,
      quizType: quizType,
      questions: questions
    };
  
    axios.post('http://localhost:8080/api/user/quiz', quizData)
  .then((response) => {
    console.log('Quiz Created!', response.data);
    setTitle('');
    setQuizType('multiple-choice')
    setQuestions([]);
    // Store the quiz ID
    setQuizId(response.data.quizId);
    console.log(quizId); // This might not reflect the updated state immediately

    // Navigate to QuizPreviewPage
    history.push('/quiz-preview');
  })
  .catch((error) => {
    console.error('Error creating quiz:', error);
  });
  };
  
  const QuestionText = styled.p`
  white-space: pre-line;
`;
const handleRemoveAnswer = () => {
  const newAnswers = [...answers];
  newAnswers.pop(); // remove the last answer
  setAnswers(newAnswers);
};
  return (
    <>
    <div className="container-menu">
      <h1>Quiz Creator</h1>
      <div className="mb-3">
        <label className="form-label">Quiz Title:</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
       
      </div>
      <div className="mb-3">
        <label className="form-label">Quiz Type:</label>
        <select
          className="form-select"
          value={quizType}
          onChange={(e) => setQuizType(e.target.value)}
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="fill-in-the-blank">Fill in the Blank</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Question:</label>
        <textarea
          ref={textAreaRef}
          className="form-control"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        
      </div>
      {quizType === 'multiple-choice' && (
  <div className="mb-3">
    {answers.map((answer, index) => (
      <div key={index}>
        <label className="form-label" key={index}>Answers: {index + 1}</label>
        <input
          type="text"
          className="form-control"
          value={answer}
          onChange={(e) => handleAnswerChange(index, e)}
        />
      </div>
    ))}
   

    <button className="btn btn-secondary mt-2" onClick={handleAddAnswer}>
      Add Answer
    </button>
    {answers.length > 1 && (
      <button className="btn btn-danger mt-2 ml-2" onClick={handleRemoveAnswer}>
        Remove Answer
      </button>
    )}
  </div>
)}
      {quizType === 'multiple-choice' && (
        <div className="mb-3">
          <label className="form-label">Correct Answer:</label>
          <select
            className="form-select"
            value={correctAnswerIndex}
            onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
          >
            {answers.map((answer, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}
      {quizType === 'true-false' && (
  <div className="mb-3">
    <label className="form-label">Correct Answer:</label>
    <select
      className="form-select"
      value={correctAnswerIndex}
      onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
    >
      <option value={0}>True</option>
      <option value={1}>False</option>
    </select>
  </div>
)}
 {quizType === 'fill-in-the-blank' && (
  <div className="mb-3">
    <label className="form-label">Answer:</label>
    <input
      type="text"
      className="form-control"
      value={fillBlankAnswer}
      onChange={(e) => setFillBlankAnswer(e.target.value.toUpperCase())}
    />
  </div>
)}
<div className="mb-3">
  <label className="form-label">Time Limit:</label>
  <select
    className="form-select"
    value={timeLimit}
    onChange={(e) => setTimeLimit(Number(e.target.value))}
  >
    <option value={30}>30s</option>
    <option value={60}>60s</option>
    <option value={90}>90s</option>
    <option value={150}>150s</option>
  </select>
</div>
      <button className="btn btn-primary" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button className="btn btn-success"  onClick={handleCreateQuiz}>
        Create Quiz
      </button>
      <div>
  {questions.map((q, index) => (
    <div key={index} className="mt-3">
      <h4>Question {index + 1}</h4>
      <QuestionText dangerouslySetInnerHTML={{ __html: q.question }} />
      <h4>Time Limit: {q.timeLimit} seconds</h4> {/* This line displays the time limit */}
      <h4>Answers:</h4>
      {q.answers.map((answer, answerIndex) => (
        <p key={answerIndex} style={{ color: 
          q.quizType === 'multiple-choice' ? 
          (answerIndex === q.correctAnswerIndex ? 'green' : 'black') : 
          (q.quizType === 'true-false' && answerIndex === q.correctAnswerIndex ? 'black' : 'green') 
        }}>
          {answer}
        </p>
      ))}
    </div>
  ))}
</div>

    </div>
     <Footer/>
     </>
  );
};

export default QuizCreator;
