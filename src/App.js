import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState([]); // ✅ new

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      answers,
      correctIndex,
    };
    console.log(newQuestion);

    // ✅ Save submitted question to state
    setSubmittedQuestions([...submittedQuestions, newQuestion]);

    // Reset form (optional)
    setQuestion("");
    setAnswers(["", "", ""]);
    setCorrectIndex(0);
  };

  return (
    <div>
      <h1>Create a New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <div>
          {answers.map((answer, i) => (
            <label key={i}>
              Answer {i + 1}:
              <input
                type="text"
                placeholder={`Answer ${i + 1}`}
                value={answer}
                onChange={(e) => {
                  const updatedAnswers = [...answers];
                  updatedAnswers[i] = e.target.value;
                  setAnswers(updatedAnswers);
                }}
              />
            </label>
          ))}
        </div>
        <label>
          Correct Answer:
          <select
            value={correctIndex}
            onChange={(e) => setCorrectIndex(Number(e.target.value))}
          >
            <option value={0}>Answer 1</option>
            <option value={1}>Answer 2</option>
            <option value={2}>Answer 3</option>
          </select>
        </label>
        <button type="submit">Submit Question</button>
      </form>

      {/* ✅ Render submitted questions below the form */}
      <div>
        <h2>Submitted Questions</h2>
        <ul>
          {submittedQuestions.map((q, i) => (
            <li key={i}>{q.question}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
