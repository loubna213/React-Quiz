function StartScreen({ questionsLength, dispatch }) {
    return (
      <div className="start">
        <h2>Welcome to The React Quiz!</h2>
        <h3>{questionsLength} question to test your React mastery</h3>
        <button onClick={() => dispatch({type: 'dataActive'})} className="btn btn-ui">Let's start</button>
      </div>
    );
  }
  
  export default StartScreen;
  