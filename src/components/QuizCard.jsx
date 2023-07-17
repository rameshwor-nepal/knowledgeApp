import React, { useState } from 'react'

const QuizCard = ({card}) => { 
    const [flip, setFlip]  = useState(false) 

  return (
    <div 
        className={`card ${flip ? 'flip' : ""} `}
        onClick={() => setFlip(!flip)}
    >
        <div className='front'>
            {card.question}

            <div className='flashcard-options'>
                {card.options.map((option) =>{
                    return <div className='flashcard-option' key={option} >{ option}</div>
                })}

            </div>
        </div>
        <div className="back"> 
                <span className='back-title'>Correct Answer</span> <br />
        { card.answer }

        </div>

    </div>
  )
}

export default QuizCard