import Options from './Options'

function Question({ currentQuestion, dispatch, answer, points }) {
    return (
        <div>
            <h4>{currentQuestion.question}</h4>
            <Options currentQuestion={currentQuestion} dispatch={dispatch} answer={answer}/>
        </div>
    );
  }
  
  export default Question;
  