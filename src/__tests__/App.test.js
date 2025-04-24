import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("submit button works", async () => {
  render(<App />);

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText("Enter question"), {
    target: { value: "What is React?" },
  });
  fireEvent.change(screen.getByPlaceholderText("Answer 1"), {
    target: { value: "A JavaScript library" },
  });
  fireEvent.change(screen.getByPlaceholderText("Answer 2"), {
    target: { value: "A CSS framework" },
  });
  fireEvent.change(screen.getByPlaceholderText("Answer 3"), {
    target: { value: "A Node.js framework" },
  });
  fireEvent.change(screen.getByDisplayValue("Answer 1"), {
    target: { value: "0" },
  });

  // Submit the form
  fireEvent.click(screen.getByText(/submit question/i));

  // Check if the question is rendered
  expect(await screen.findByText(/What is React\?/i)).toBeInTheDocument();
});
