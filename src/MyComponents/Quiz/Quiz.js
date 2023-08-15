import React, { useReducer, useEffect } from 'react';
import "../Styles/Styles.css";
import questions from "../QuizData/QuizData";
import { QuizResult } from '../QuizResult/QuizResult';

const initialState = {
  currentQuestion: 0,
  score: 0,
  correctAns: 0,
  skippedCount: 0,
  showResult: false,
  clicked: false,
  remainingTime: 30
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      const nextQuestion = state.currentQuestion + 1;
      const newState = {
        ...state,
        currentQuestion: nextQuestion < questions.length ? nextQuestion : state.currentQuestion,
        clicked: false,
        remainingTime: nextQuestion < questions.length ? 30 : state.remainingTime,
        showResult: nextQuestion >= questions.length
      };
      return newState;

    case 'SKIP_QUESTION':
      const nextQuestionAfterSkip = state.currentQuestion + 1;
      const showResultAfterSkip = nextQuestionAfterSkip >= questions.length;
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        skippedCount: state.skippedCount + 1,
        clicked: false,
        remainingTime: showResultAfterSkip ? state.remainingTime : 30,
        showResult: showResultAfterSkip
      };

    case 'ANSWER_QUESTION':
      return {
        ...state,
        score: action.payload.isCorrect ? state.score + 5 : state.score,
        correctAns: action.payload.isCorrect ? state.correctAns + 1 : state.correctAns,
        clicked: true
      };

    case 'PLAY_AGAIN':
      return initialState;

    case 'SET_CLICKED':
      return {
        ...state,
        clicked: action.payload
      };

    case 'TICK_TIMER':
      if (!state.showResult && state.currentQuestion < questions.length - 1 && state.remainingTime > 0) {
        return {
          ...state,
          remainingTime: state.remainingTime - 1
        };
      } else if (!state.showResult && state.currentQuestion < questions.length - 1 && state.remainingTime === 0) {
        return {
          ...state,
          remainingTime: 30
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
const Quiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'TICK_TIMER' });
  
      // Add a check to transition to the next question if timer is up
      if (state.remainingTime === 0) {
        dispatch({ type: 'NEXT_QUESTION' });
      }
    }, 1000); // 1 second
    return () => clearTimeout(timer);
  }, []);
  


   const totalSkippedQuestions =  state.skippedCount;
  return (
    <>
      <div className='container'>
        {state.showResult ? (
          <QuizResult
            score={state.score}
            correctAns={state.correctAns}
            handlePlayAgain={() => dispatch({ type: 'PLAY_AGAIN' })}
            skippedCount={totalSkippedQuestions}
            totalQuestions={questions.length}
          />
        ) : (
          <>
            <div className='question-section'>
              <h4>Score: {state.score}</h4>
              <div className='timer'>{state.remainingTime}</div>
              <div className='question-count'>
                <span>Question {state.currentQuestion + 1} of {questions.length}</span>
              </div>
              <div className='question-text'>
                {questions[state.currentQuestion].questionText}
              </div>
            </div>
            <div className='answer-section'>
              {questions[state.currentQuestion].answerOptions.map((ans, index) => (
                <button
                  key={index}
                  className={`button ${state.clicked && ans.isCorrect ? 'correct' : 'button'}`}
                  disabled={state.clicked}
                  onClick={() => dispatch({ type: 'ANSWER_QUESTION', payload: ans })}
                >
                  {ans.answerText}
                </button>
              ))}
              <div className='actions'>
              <button onClick={() => dispatch({ type: 'SKIP_QUESTION' })}>Skip</button>

                <button disabled={!state.clicked} onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
