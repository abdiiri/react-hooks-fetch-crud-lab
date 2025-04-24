import React, { useEffect, useState } from "react";

function QuestionList({ refresh }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setQuestions(data); // Only update state if the component is still mounted
        }
      });

    return () => {
      isMounted = false; // Cleanup when the component unmounts
    };
  }, [refresh]); // Re-fetch when `refresh` changes

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.prompt}</li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
