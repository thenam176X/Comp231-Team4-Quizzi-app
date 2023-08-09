import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const TakeQuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [fillInTheBlankAnswer, setFillInTheBlankAnswer] = useState('');
  const [fillInTheBlankAnswerArray, setFillInTheBlankAnswerArray] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const history = useHistory();
  const [answeredQuestions, setAnsweredQuestions] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/quiz/latest`)
      .then((response) => {
        setQuiz(response.data);
        setTimeLeft(response.data.questions[0].timeLimit);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft === 0) {
          if (!isAnswered) {
            alert('Time is up! Moving to the next question. This question will be marked as incomplete.');
          }
          handleNextQuestion();
          return null;
        } else {
          return timeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length) {
      setTimeLeft(quiz.questions[currentQuestionIndex].timeLimit);
      setIsAnswered(false); // Reset the answered state when moving to a new question
    } else if (quiz) {
      handleSubmitQuiz();
    }
  }, [currentQuestionIndex, quiz]);

  const handleNextQuestion = () => {
    if (quiz.questions[currentQuestionIndex].quizType === 'fill-in-the-blank' && fillInTheBlankAnswer === '') {
      alert('Please fill in your answer before going to the next question.');
      return;
    } else if (quiz.questions[currentQuestionIndex].quizType !== 'fill-in-the-blank' && selectedAnswerIndex === null) {
      alert('Please choose your answer before going to the next question.');
      return;
    }

    setIsAnswered(true);
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    setCurrentQuestionIndex(currentQuestionIndex + 1);

    setSelectedAnswers([...selectedAnswers, selectedAnswerIndex]);
    setFillInTheBlankAnswerArray([...fillInTheBlankAnswerArray, fillInTheBlankAnswer]);

    setSelectedAnswerIndex(null);
    setFillInTheBlankAnswer(''); // Reset the fill-in-the-blank answer
  };

  const handleSubmitQuiz = () => {
    const completedQuestions = answeredQuestions.length;
    const incompleteQuestions = quiz.questions.length - completedQuestions;

    alert(`You have completed ${completedQuestions} questions and ${incompleteQuestions} questions are marked as incomplete.`);

    // Prepare the data to send to the server
    const quizData = {
      completedQuestions: answeredQuestions,
      incompleteQuestions: quiz.questions.length - completedQuestions,
      userAnswers: quiz.questions.map((question, index) => {
        if (question.quizType === 'fill-in-the-blank') {
          return {
            question: question.question,
            userAnswer: fillInTheBlankAnswerArray[index],
            correctAnswerIndex: question.answers[question.correctAnswerIndex],
          };
        } else {
          return {
            question: question.question,
            userAnswer: question.answers[selectedAnswers[index]],
            correctAnswerIndex: question.answers[question.correctAnswerIndex],
          };
        }
      }),
    };

    // Send the data to the server
    axios.post('http://localhost:8080/api/user/quiz/submit', quizData)
      .then((response) => {
        console.log('Quiz submitted successfully:', response.data);
        history.push(`/grade-quiz/`);
      })
      .catch((error) => {
        console.error('Error submitting quiz:', error);
      });
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }
  const question = currentQuestionIndex < quiz.questions.length ? quiz.questions[currentQuestionIndex] : quiz.questions[currentQuestionIndex - 1];
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{quiz.title}</h1>
      <h2 style={styles.questionNumber}>Question {currentQuestionIndex < quiz.questions.length ? currentQuestionIndex + 1 : currentQuestionIndex}</h2>
      <p style={styles.question}>{question.question}</p>
      <p style={styles.timeLeft}>Time left: {timeLeft} seconds</p>
      {question.quizType === 'fill-in-the-blank' ? (
      <input
        type="text"
        value={fillInTheBlankAnswer}
        onChange={(e) => setFillInTheBlankAnswer(e.target.value.toUpperCase())}
        style={styles.textInput}
      />
    ) : (
      question.answers.map((answer, index) => (
        <div key={index} style={styles.answerContainer}>
          <input
            type="radio"
            id={`answer-${index}`}
            name="answer"
            value={index}
            checked={selectedAnswerIndex === index}
            onChange={() => setSelectedAnswerIndex(index)}
            style={styles.radioInput}
          />
          <label htmlFor={`answer-${index}`} style={styles.answerLabel}>{answer}</label>
        </div>
      ))
    )}
      <button style={styles.button} onClick={handleNextQuestion}>
        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  questionNumber: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  question: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  timeLeft: {
    fontSize: '14px',
    marginBottom: '20px',
  },
  answerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  radioInput: {
    marginRight: '10px',
  },
  answerLabel: {
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TakeQuizPage;
