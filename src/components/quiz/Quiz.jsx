import React from 'react'
import './Quiz.css'
import { data } from '../../assets/data'
import { useState } from 'react'
import { useRef } from 'react'

const Quiz = () => {

    let [index , setIndex] = useState(0);
    let [question , setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);


    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e,ans) => {
        if(lock === false) {
        if(question.ans === ans){
            e.target.classList.add('correct');
            setScore(score => score + 1);
            console.log('Score updated:', score + 1);
        }else{
            e.target.classList.add('wrong');
            option_array[question.ans-1].current.classList.add('correct');
        }

        setLock(true);
    }
    }

    const nextQuestion = () => {
        if (index === data.length - 1) {
            setResult(true);
            return;
        } 
        const newIndex = index + 1;
        setIndex(newIndex);
        setQuestion(data[newIndex]); // Use newIndex instead of index
        setLock(false);

        option_array.forEach(option => {
            option.current.classList.remove('correct', 'wrong');
        });
        
    }

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
    }

  return (
    <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result ? <>
        <h2>Result</h2>
        <p>Total Score : {score} out of {data.length}</p>
        <button onClick={resetQuiz}>Reset</button>
        </>: 
        <><h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(e) => checkAnswer(e,1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAnswer(e,2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAnswer(e,3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAnswer(e,4)}>{question.option4}</li>
        </ul>
        <button onClick={nextQuestion}>Next</button>

        <div className="index">{index+1} of {data.length} Questions</div>
        <div className="score">Score : {score}</div>

        </>
        
        }
        
    </div>
  )
}

export default Quiz