import React, { useState,useEffect } from 'react'                                                                   
import "../Styles/Styles.css"
import questions from "../QuizData/QuizData"
import { QuizResult } from '../QuizResult/QuizResult'

const Quiz = () => {
  const[currentQuestion,setCurrentQuestion]= useState(0)
  const[score,setScore]=useState(0)
  const[correctAns,setCorrectAns]=useState(0)
  const [skippedCount, setSkippedCount] = useState(0);
  const[showResult,setShowResult]=useState(false)
  const[clicked,setClicked]=useState(false)
  const [remainingTime, setRemainingTime] = useState(30);

  const handleNextOptions = ()=>{
    const nextQuestion = currentQuestion+1
    if(nextQuestion<questions.length){
      setCurrentQuestion(nextQuestion);
      setClicked(false);
      setRemainingTime(30);
    }else{
      setShowResult(true);
      
    }
  };

  const handleSkipQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSkippedCount(skippedCount+1);
      setClicked(false);
      setRemainingTime(30); 
    } else {
      setShowResult(true);
    }
  };

  const handleAnswerOption = (isCorrect)=>{
     if(isCorrect){
     setScore(score+5)
     setCorrectAns(correctAns+1)
     } 
     setClicked(true);
  };

  const handlePlayAgain = ()=>{
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAns(0);
    setSkippedCount(0);
    setShowResult(false);
    setClicked(false);
    setRemainingTime(30);
  };

  useEffect(() => {
    let timer;
    if (!showResult && currentQuestion < questions.length - 1 && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000); // 1 second
    } else if (!showResult && currentQuestion < questions.length - 1 && remainingTime === 0) {
      setRemainingTime(30);
      handleNextOptions();
    }

    return () => clearTimeout(timer);
  }, [showResult, currentQuestion, remainingTime, handleNextOptions]);

  const totalSkippedQuestions = questions.length - (correctAns + (currentQuestion - skippedCount));

  return (
    <>
    <div className='container'>
      {showResult?( <QuizResult score={score} correctAns={correctAns}  handlePlayAgain={ handlePlayAgain} skippedCount={totalSkippedQuestions}  totalQuestions={questions.length}/>)
      :(
       <>
     <div className='question-section'>
       <h4>Score:{score}</h4>
       <div className='timer'>{remainingTime}</div> 
       <div className='question-count'>
         <span>Question {currentQuestion+1} of {questions.length}</span>
       </div>
       <div className='question-text'>
         {questions[currentQuestion].questionText}
       </div>
     </div>
     
     <div className='answer-section'>
      {questions[currentQuestion].answerOptions.map((ans,index)=>{
        return  <button className={`button ${clicked && ans.isCorrect? "correct":"button"}`} disabled={clicked} key={index} onClick={()=>handleAnswerOption(ans.isCorrect)}>{ans.answerText}</button>
      })}
       <div className='actions'>
       <button  onClick={handleSkipQuestion}>Skip</button>
       <button disabled={!clicked} onClick={handleNextOptions}>Next</button>
     </div>
     </div>
     </>)}
     
    </div>
   </>
  )
}

export default Quiz