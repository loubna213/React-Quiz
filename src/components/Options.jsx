
const Options = ({ currentQuestion, dispatch, answer }) => {
    return (
        <div className="options">
            {
                currentQuestion.options.map((opt, index) => 
                    <button 
                        key={index} 
                        disabled={answer !== null}
                        onClick={() => dispatch({type: 'answer', payload: index})} 
                        className={
                            `btn btn-option ${index === answer ? 'answer' : ''} 
                            ${answer !== null ? index === currentQuestion.correctOption ? 'correct' : 'wrong' : ''}`
                        }>
                        {opt}
                    </button>
                )
            } 
        </div>
    )
}

export default Options;
