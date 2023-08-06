import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styled from "styled-components";
import "../assets/css/Menu.css";
import { useHistory } from "react-router-dom";
import Footer from "../assets/js/Footer";
axios.defaults.withCredentials = true;
const QuizCreator = () => {
  const [title, setTitle] = useState("");
  const [quizType, setQuizType] = useState("multiple-choice");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const history = useHistory();
  const textAreaRef = useRef();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [question]);

  const handleAddQuestion = () => {
    // Check if the text fields are empty before adding the question
    if (title === "") {
      alert("Please add your title.");
      return;
    }
    if (question === "") {
      alert("Please add your question.");
      return;
    }
    if (answer === "") {
      alert("Please add your answer.");
      return;
    }
    const formattedQuestion = question.replace(/\n/g, "<br />");

    const newQuestion = {
      question: formattedQuestion,
      answer: answer,
      quizType: quizType, // Include quizType in each question
    };
    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setAnswer("");
  };

  const handleCreateQuiz = () => {
    const quizData = {
      title: title,
      quizType: quizType,
      questions: questions,
    };

    axios
      .post("http://localhost:8080/api/user/quiz", quizData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Quiz Created!", response.data);
        setTitle("");
        setQuizType("multiple-choice");
        setQuestions([]);
        // Store the quiz ID
        setQuizId(response.data.quizId);
        console.log(quizId); // This might not reflect the updated state immediately

        // Navigate to QuizPreviewPage
        history.push("/quiz-preview");
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
      });
  };

  const QuestionText = styled.p`
    white-space: pre-line;
  `;
  return (
    <>
      <div className='container-menu'>
        <h1>Quiz Creator</h1>
        <div className='mb-3'>
          <label className='form-label'>Quiz Title:</label>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Quiz Type:</label>
          <select
            className='form-select'
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
          >
            <option value='multiple-choice'>Multiple Choice</option>
            <option value='true-false'>True/False</option>
            <option value='fill-in-the-blank'>Fill in the Blank</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Question:</label>
          <textarea
            ref={textAreaRef}
            className='form-control'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Answer:</label>
          <input
            type='text'
            className='form-control'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button className='btn btn-primary' onClick={handleAddQuestion}>
          Add Question
        </button>
        <button className='btn btn-success' onClick={handleCreateQuiz}>
          Create Quiz
        </button>

        <div>
          {questions.map((q, index) => (
            <div key={index} className='mt-3'>
              <h4>Question {index + 1}</h4>
              <QuestionText dangerouslySetInnerHTML={{ __html: q.question }} />
              <h4>Answer {index + 1}</h4>
              <p>{q.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizCreator;
