import React, { act } from 'react'
import ReactDOM from 'react-dom/client'
import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import questions from './data/questions.json'
import Loader from './components/status/Loader'
import Error from './components/status/Error'
import StartScreen from './components/status/StartScreen'
import Question from './components/Question'
import NextQuestion from './components/NextQuestion'
import Progress from './components/Progress'
import FinishScreen from './components/status/FinishScreen'
import Timer from './components/Timer'

const SECS_PER_QUES = 30

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived':
      return {...state, questionsList: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state, status: 'error'}
    case 'dataActive':
      return {...state, status: 'active', secondsRemaining: state.questionsList.length * SECS_PER_QUES}
    case 'answer': 
      const question = state.questionsList[state.index];

      return {
                ...state,
                answer: action.payload, 
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
              }
    case 'nextQuestion':
      return {...state, index: state.index + 1, answer: null}
    case 'finished':
      return {...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore}
    case 'restart':
      return {...state, status: 'restart', points: 0, answer: null, index: 0, secondsRemaining: null}
    case 'timer':
      return {...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? 'finished' : state.status}
    default: 
      throw new Error('Unknown action')
  }
}

const App = () => {
  const initialState = {
    questionsList: [questions.Questions],
    // loading / error / ready / active / finished
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const {questionsList, status, index, answer, points, highscore, secondsRemaining} = state;
  
  useEffect(function() {
    dispatch({type: 'dataReceived', payload: questions.Questions})
  }, [])

  const questionsLength = questionsList.length
  const maxPoints = questionsList.reduce((prev, cur) => prev + cur.points, 0)

  return (
    <div className="app">
      <Header/>
      <Main>
        { status === 'loading' && <Loader/> }
        { status === 'error' && <Error/> }
        { (status === 'ready' || status === 'restart') && 
          <>
            <StartScreen questionsLength={questionsLength} dispatch={dispatch}/>
          </> 
        }
        { status === 'active' && 
          <>
            <Progress 
              index={index} 
              questionsLength={questionsLength} 
              points={points} 
              maxPoints={maxPoints} 
              answer={answer}
            />
            <Question 
              currentQuestion={questionsList[index]} 
              dispatch={dispatch} 
              answer={answer} 
              points={points}
            />
            <footer>
              <NextQuestion 
                dispatch={dispatch} 
                answer={answer} 
                index={index} 
                questionsLength={questionsLength}
              />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </footer>
          </>

        }
        { status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} dispatch={dispatch} highscore={highscore} /> }
      </Main>
    </div>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App/>)