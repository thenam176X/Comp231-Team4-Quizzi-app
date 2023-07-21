import React, { useState, useRef, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/Menu.css';
const QuizCreator = () => {
  const [title, setTitle] = useState('');
  const [quizType, setQuizType] = useState('multiple-choice');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuizType, setSelectedQuizType] = useState(''); // New state to store the selected quiz type

  const textAreaRef = useRef();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [question]);

  const handleAddQuestion = () => {
    // Create a new question object and add it to the questions array
    const newQuestion = {
      questionText: question,
      answerOptions: [
        { answerText: answer, isCorrect: true }, // You can modify this to include multiple answer options
      ],
    };
    setQuestions([...questions, newQuestion]);
    setQuestion('');
    setAnswer('');
  };

  const handleCreateQuiz = () => {
    // Logic to create the quiz with the current state data (e.g., title, quizType, questions, etc.)
    console.log("Quiz Created!");
    console.log("Title:", title);
    console.log("Quiz Type:", quizType);
    console.log("Questions:", questions);
    setSelectedQuizType(quizType); // Update the selected quiz type
  };

  return (
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
      <div className="mb-3">
        <label className="form-label">Answer:</label>
        <input
          type="text"
          className="form-control"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button className="btn btn-success"  onClick={handleCreateQuiz}>
        Create Quiz
      </button>
      <div>
        {selectedQuizType && <p>Selected Quiz Type: {selectedQuizType}</p>} {/* Display the selected quiz type */}
        {questions.map((q, index) => (
          <div key={index} className="mt-3">
            <h4>Question {index + 1}</h4>
            <p>{q.questionText}</p>
            <div>
              {q.answerOptions.map((option, idx) => (
                <div key={idx}>
                  <input
                    type={quizType === 'true-false' ? 'radio' : 'checkbox'}
                    checked={option.isCorrect}
                    disabled
                  />
                  <label>{option.answerText}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCreator;
