// src/__tests__/App.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (url.endsWith("/questions") && (!options || options.method === "GET")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, prompt: "lorem testum 1" },
            { id: 2, prompt: "lorem testum 2" },
          ]),
      });
    }

    if (url.endsWith("/questions") && options?.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 3,
            prompt: "New Question Prompt",
            answers: ["Answer 1", "Answer 2", "Answer 3"],
            correctIndex: 0,
          }),
      });
    }

    return Promise.reject(new Error("Unhandled request"));
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));

  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/New Question/i));

  fireEvent.change(screen.getByLabelText(/Prompt/i), {
    target: { value: "New Question Prompt" },
  });

  fireEvent.change(screen.getByLabelText(/Answer 1/i), {
    target: { value: "Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), {
    target: { value: "Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), {
    target: { value: "Answer 3" },
  });

  fireEvent.change(screen.getByLabelText(/Correct Answer/i), {
    target: { value: "0" },
  });

  fireEvent.click(screen.getByText(/Submit Question/i));

  expect(await screen.findByText(/New Question Prompt/i)).toBeInTheDocument();
});
