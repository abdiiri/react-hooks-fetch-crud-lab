// src/App.js
import React, { useState } from "react";

function App() {
  const [view, setView] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", ""],
    correctIndex: "0",
  });

  const fetchQuestions = async () => {
    const response = await fetch("http://localhost:4000/questions");
    const data = await response.json();
    setQuestions(data);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("answers-")) {
      const index = parseInt(name.split("-")[1]);
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    };

    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });

    const data = await response.json();

    // Add new question to list and switch to "view" mode
    setQuestions((prev) => [...prev, data]);
    setView("view");

    // Optionally reset form
    setFormData({
      prompt: "",
      answers: ["", "", ""],
      correctIndex: "0",
    });
  };

  return (
    <main>
      <nav>
        <button onClick={() => setView("new")}>New Question</button>
        <button
          onClick={() => {
            fetchQuestions();
            setView("view");
          }}
        >
          View Questions
        </button>
      </nav>

      {view === "view" && (
        <section>
          <h1>Quiz Questions</h1>
          <ul>
            {questions.map((q) => (
              <li key={q.id}>{q.prompt}</li>
            ))}
          </ul>
        </section>
      )}

      {view === "new" && (
        <form onSubmit={handleSubmit}>
          <label>
            Prompt:
            <input
              name="prompt"
              type="text"
              value={formData.prompt}
              onChange={handleFormChange}
            />
          </label>
          {formData.answers.map((ans, i) => (
            <label key={i}>
              Answer {i + 1}:
              <input
                name={`answers-${i}`}
                type="text"
                value={ans}
                onChange={handleFormChange}
              />
            </label>
          ))}
          <label>
            Correct Answer:
            <select
              name="correctIndex"
              value={formData.correctIndex}
              onChange={handleFormChange}
            >
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
            </select>
          </label>
          <button type="submit">Submit Question</button>
        </form>
      )}
    </main>
  );
}

export default App;
