import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>Error fetching questions: {error}</p>;
  }

  return (
    <div>
      <h1>Quiz App</h1>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      ) : null}
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
