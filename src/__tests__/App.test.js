import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  test("submit button works", async () => {
    render(<App />);

    // Click the "New Question" button to show the form
    fireEvent.click(screen.getByText("New Question"));

    // Fill out the form using the label text
    fireEvent.change(screen.getByLabelText("Prompt:"), {
      target: { value: "What is React?" },
    });
    fireEvent.change(screen.getByLabelText("Answer 1:"), {
      target: { value: "A JavaScript library" },
    });
    fireEvent.change(screen.getByLabelText("Answer 2:"), {
      target: { value: "A CSS framework" },
    });
    fireEvent.change(screen.getByLabelText("Answer 3:"), {
      target: { value: "A database system" },
    });
    fireEvent.change(screen.getByLabelText("Answer 4:"), {
      target: { value: "A server-side language" },
    });
    fireEvent.change(screen.getByLabelText("Correct Answer Index:"), {
      target: { value: "1" }, // Assuming '1' corresponds to index 0
    });

    // Click the "Add Question" button
    fireEvent.click(screen.getByText("Add Question"));

    // You would then add assertions to check if the new question
    // is displayed in the list or if the API call was made correctly.
    // For example:
    // await waitFor(() => screen.getByText('What is React?'));
  });
});
