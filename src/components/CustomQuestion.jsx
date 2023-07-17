import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import QuizCardlist from "./QuizCardlist"


const CustomQuestion = () => {
          const [categories, setCategories] = useState([])
          const [carddata, setCarddata] = useState([])

          const categoryElement = useRef()
          const numberOfQuestionElement = useRef()

          useEffect(()=>{
                axios
                .get("https://opentdb.com/api_category.php")
                .then((response) =>{
                  console.log(response.data)

                  setCategories(response.data.trivia_categories)
                })
          }, [])



          // useEffect( () =>{
          //   axios.get("https://opentdb.com/api.php?amount=10")
          //   .then((res) =>{
          //     // console.log(res.data)
          //     setCarddata(res.data.results.map((quesitem, index) =>{
          //       const answer = quesitem.correct_answer
          //       const options = [...quesitem.incorrect_answers, answer]
          //       return{
          //       id:`${index} - ${Date.now()}`,
          //       question:quesitem.question,
          //       answer:answer,
          //       options: options
          //       }
                
          //     }))
          //   })
          // },[])

          function handleSubmit(e){
            e.preventDefault()
            axios.get("https://opentdb.com/api.php",{
              params:{
                amount: numberOfQuestionElement.current.value,
                category: categoryElement.current.value
              }
            })
            .then((res) =>{
              // console.log(res.data)
              setCarddata(res.data.results.map((quesitem, index) =>{
                const answer = quesitem.correct_answer
                const options = [...quesitem.incorrect_answers, answer]
                return{
                id:`${index} - ${Date.now()}`,
                question:quesitem.question,
                answer:answer,
                options: options
                }
                
              }))
            })
          }
        
  return (
    <div>
        <h2 className='title'>Enhance your Knowledge </h2>
       <p className='sub-title'>Fill the form and get your question with answer</p>
       <form onSubmit={handleSubmit} className='question-form'>
        <div>

        
            <label htmlFor="category"> Category </label>

            <select name="category" id="category" ref={categoryElement} className='question-form-select'>

              {categories.map((category) =>{
                return <option value={category.id} key={category.id} className='question-form-option'>{category.name}</option>
              })}

            </select>
            
            </div>

            <div>
            <label htmlFor="question-number">Number of Question</label>
            <input type="text" name="question-number" id="question-number" defaultValue={10} ref={numberOfQuestionElement} placeholder='Enter number' className='question-form-input'/>
            <button className='button'>Create Question</button>
            
             </div>
       </form>
       <p className='get-answer'>For answer click the card</p>

       <QuizCardlist carddata = {carddata} />
    </div>
  )
}

export default CustomQuestion