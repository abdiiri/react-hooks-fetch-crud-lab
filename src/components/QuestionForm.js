import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "prompt") {
      setPrompt(value);
    } else if (name.startsWith("answer-")) {
      const index = parseInt(name.split("-")[1]);
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    } else if (name === "correctIndex") {
      setCorrectIndex(parseInt(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = {
      prompt,
      answers,
      correctIndex,
    };
    onAddQuestion(newQuestion);
    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  };

  return (
    <div>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={handleInputChange}
            required
            placeholder="Enter question"
          />
        </div>
        <div>
          <label htmlFor="answer-0">Answer 1:</label>
          <input
            type="text"
            id="answer-0"
            name="answer-0"
            value={answers[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="answer-1">Answer 2:</label>
          <input
            type="text"
            id="answer-1"
            name="answer-1"
            value={answers[1]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="answer-2">Answer 3:</label>
          <input
            type="text"
            id="answer-2"
            name="answer-2"
            value={answers[2]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="answer-3">Answer 4:</label>
          <input
            type="text"
            id="answer-3"
            name="answer-3"
            value={answers[3]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="correctIndex">Correct Answer Index:</label>
          <select
            id="correctIndex"
            name="correctIndex"
            value={correctIndex}
            onChange={handleInputChange}
          >
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={2}>3</option>
            <option value={3}>4</option>
          </select>
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default QuestionForm;
