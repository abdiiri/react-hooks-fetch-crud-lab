import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectAnswer }) {
  return (
    <div>
      <h2>Questions</h2>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <strong>{question.prompt}</strong>
              <ul>
                {question.answers.map((answer, index) => (
                  <li key={index}>
                    {answer}{" "}
                    {index === question.correctIndex ? "(Correct)" : ""}
                  </li>
                ))}
              </ul>
              <label htmlFor={`correctAnswer-${question.id}`}>
                Correct Answer:
              </label>
              <select
                id={`correctAnswer-${question.id}`}
                value={question.correctIndex}
                onChange={(e) =>
                  onUpdateCorrectAnswer(question.id, parseInt(e.target.value))
                }
              >
                {question.answers.map((_, index) => (
                  <option key={index} value={index}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button onClick={() => onDeleteQuestion(question.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionList;
