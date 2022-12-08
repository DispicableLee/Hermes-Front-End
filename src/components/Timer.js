import { useState, useEffect } from "react";

function Timer() {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const timerID = setInterval(() => {
            setCounter(counter => counter + 1)
        }, 500);

        return function cleanup() {
            clearInterval(timerID)
        }
    }, [])

    console.log(counter)
    return
}

export default Timer