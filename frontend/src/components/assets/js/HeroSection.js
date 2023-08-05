import React from 'react';
import '../../../App';
import '../css/HeroSection.css';
import { Link } from 'react-router-dom';
function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='./videos/video-1.mp4' autoPlay loop muted />
      <h1>QUIZZI </h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <button className='btns'> <Link to='/create-quiz' className='menulink' >
        GET STARTED
              </Link></button>
        <button className='btns' onClick={console.log('hey')}>Tutorial <i className='far fa-play-circle' /></button>
      </div>
    </div>
  );
}

export default HeroSection;
