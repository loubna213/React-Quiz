import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
    const mins = Math.floor(secondsRemaining / 60)
    const seconds = Math.floor(secondsRemaining % 60)

    useEffect(function() {
        const id = setInterval(() => {
            dispatch({type: 'timer'})
        }, 1000)

        return () => clearInterval(id)
    }, [])
   
    return (
        <div className="timer">0 {mins} : {seconds < 10 ? `0 ${seconds}` : seconds}</div>
    );
  }
  
  export default Timer;
  