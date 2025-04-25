import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Setup fetch as a mock function
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("submitting the form calls onAddQuestion and updates the list", async () => {
  const mockNewQuestion = {
    id: 1,
    prompt: "What is React?",
    answers: ["Library", "Framework", "Language", "Tool"],
    correctIndex: 0,
  };

  // Setup fetch calls
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    }) // First call: GET /questions
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockNewQuestion,
    }); // Second call: POST /questions

  render(<App />);
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  fireEvent.click(screen.getByText("New Question"));

  fireEvent.change(screen.getByLabelText("Prompt:"), {
    target: { value: mockNewQuestion.prompt },
  });
  fireEvent.change(screen.getByLabelText("Answer 1:"), {
    target: { value: mockNewQuestion.answers[0] },
  });
  fireEvent.change(screen.getByLabelText("Answer 2:"), {
    target: { value: mockNewQuestion.answers[1] },
  });
  fireEvent.change(screen.getByLabelText("Answer 3:"), {
    target: { value: mockNewQuestion.answers[2] },
  });
  fireEvent.change(screen.getByLabelText("Answer 4:"), {
    target: { value: mockNewQuestion.answers[3] },
  });
  fireEvent.change(screen.getByLabelText("Correct Answer Index:"), {
    target: { value: mockNewQuestion.correctIndex.toString() },
  });

  fireEvent.click(screen.getByText("Add Question"));

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  expect(screen.getByText("What is React?")).toBeInTheDocument();
});
