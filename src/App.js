import React, { useState, useEffect } from "react";
import QuestionList from "./components/QuestionList";
import QuestionForm from "./components/QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const handleAddNewQuestionClick = () => {
    setShowForm(true);
  };

  const handleViewQuestionsClick = () => {
    setShowForm(false);
  };

  const handleAddQuestion = (newQuestion) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((addedQuestion) => {
        setQuestions([...questions, addedQuestion]);
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setQuestions(questions.filter((question) => question.id !== id));
        } else {
          console.error(`Error deleting question with id ${id}`);
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleUpdateCorrectAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestions(
          questions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <div>
      <h1>Quiz Admin</h1>
      <div>
        <button onClick={handleAddNewQuestionClick}>New Question</button>
        <button onClick={handleViewQuestionsClick}>View Questions</button>
      </div>

      {showForm && <QuestionForm onAddQuestion={handleAddQuestion} />}

      {!showForm && (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </div>
  );
}

export default App;
