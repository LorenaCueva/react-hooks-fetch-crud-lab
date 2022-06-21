import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  
  const [questions, setQuestions] = useState([]);

  function handleOnQuestionDelete(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE"
    })
    .then(r => r.json())
    .then(object => {
      const newQuestionList = questions.filter(question => question.id !== id);
      setQuestions(newQuestionList);
    })
    .catch(error => console.log(error))

    
  }

  function handleOnAnswerChange(id, newValue){
     fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": parseInt(newValue)
      })
     })
     .then(r => r.json())
     .then(newQuestion => {
      const newQuestionList = questions.map(q => newQuestion.id === q.id ? newQuestion : q)
      setQuestions(newQuestionList)
     })
     .catch(error => window.alert(error));

  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => setQuestions(data))
    .catch(error => console.log(error))
    },[]);

    let questionList = questions.map(q =><QuestionItem key={q.id} question={q} onQuestionDelete={handleOnQuestionDelete} onAnswerChange={handleOnAnswerChange}/>);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
