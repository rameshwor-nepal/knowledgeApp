import React from 'react'
import QuizCard from './QuizCard'

const QuizCardlist = ({ carddata }) => {
  return (
    <div className='card-grid'>
        {carddata.map((card) =>{
            return <QuizCard card= {card} key={card.id} />
        
        })}

    </div>
  )
}

export default QuizCardlist