import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

  function handleFormSubmit() {
    setRefresh((prev) => !prev); // Toggle refresh state
    setPage("List"); // Navigate back to the list
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onFormSubmit={handleFormSubmit} />
      ) : (
        <QuestionList refresh={refresh} />
      )}
    </main>
  );
}

export default App;
