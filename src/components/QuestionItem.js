import React from "react";

function QuestionItem({ question, onQuestionDelete, onAnswerChange}) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteQuestionClick(){
    onQuestionDelete(id);
  }

  function handleAnswerChange(e){
    onAnswerChange(id, e.target.value)
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestionClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
