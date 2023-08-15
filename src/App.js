import React, { useState } from 'react';
import Quiz from './MyComponents/Quiz/Quiz'; 
import './MyComponents/Styles/Styles.css'

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className='app-container'>
      {quizStarted ? (
        <Quiz />
      ) : (
        <div className='start-section'>
          <h1>Welcome to the Quiz!</h1>
          <p>Click the button below to start the quiz.</p>
          <button  onClick={() => setQuizStarted(true)}>Start Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
