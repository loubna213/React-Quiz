
function NextQuestion({ dispatch, answer, index, questionsLength }) {
    if(answer === null) return null;
    if(index < questionsLength - 1) {
        return (
            <button onClick={() => dispatch({type: 'nextQuestion'})} className='btn btn-ui'>Next</button>
        );
    }

    if(index === questionsLength - 1) {
        return (
            <button onClick={() => dispatch({type: 'finished'})} className='btn btn-ui'>Finish</button>
        );
    }

  }
  
  export default NextQuestion;
  