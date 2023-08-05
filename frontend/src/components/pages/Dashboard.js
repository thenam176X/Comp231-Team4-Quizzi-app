import React from 'react';
import '../../App.css';
import '../assets/css/Dashboard.css'
import { useLocation } from 'react-router-dom';
import Footer from '../assets/js/Footer';

export default function Dashboard() {
    const location = useLocation();
    const { title, quizType, questions } = location.state || {}; 

    // Store the quiz data using the title as the key
  const quizDataByTitle = title ? { [title]: { quizType, questions } } : {};

  // Store all the quiz titles in an array
  const quizTitles = title ? [title] : [];

    return (
        <>
          <div className="dashboard-container">
          <h1 className="dashboard-heading">Analytics Dashboard</h1>
      <div className="dashboard-header">
       
        <button className="create-test-button">Create Test</button>
      </div>

      <div className="dashboard-content">
        <div className="category-tests">
          <h3 className="section-heading">Category of Tests</h3>
          <ul>
            <li className='choice'>Multiple Choice</li>
            <li className='choice'>True/false</li>
            <li className='choice'>Fill in the blank</li>
          </ul>
        </div>

        <div className="overall-feedback">
          <h3 className="section-heading">Overall Feedback</h3>
         <p>kcjndkjcnkwdjncewjnwejknfifubnbiewufiweufiewubnf</p>
        </div>
      </div>
      <h3 className='available'>Available Quizes</h3>
<div className='quizes'>
  <div className="quiz-titles">
        <h3 className="section-heading">Quiz 1</h3>
        {/* Add quiz titles content here */}
  </div>

        <button className="section-update">Update</button>
        {/* Add update quiz content here */}

</div>
<div className='quizes'>
 
  <div className="quiz-titles">
        <h3 className="section-heading">Quiz 2</h3>
        {/* Add quiz titles content here */}
  </div>

        <button className="section-update">Update</button>
        {/* Add update quiz content here */}

</div>
    </div>
   <Footer/>
        </>

    );

}
