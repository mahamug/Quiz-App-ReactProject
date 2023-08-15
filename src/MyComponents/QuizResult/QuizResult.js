import React from 'react'
import questions from '../QuizData/QuizData'

export const QuizResult = (props) => {
  return (
    <div className='score-section'>
     <h2>Completed!</h2>
     <h4>Total Score {props.score}/10</h4>
     <h4>Your Corect Questions {props.correctAns} out of {questions.length}</h4>
     <h4>your Skipped Questions: {props.skippedCount}</h4>
     <h4>Total Questions: {props.totalQuestions}</h4>
     <button onClick={props.handlePlayAgain}>Play again</button>
    </div>
  )
}
