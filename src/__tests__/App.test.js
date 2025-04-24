/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders the app correctly", () => {
  render(<App />);
  // Check if the app header is rendered
  expect(screen.getByText(/Create a New Question/i)).toBeInTheDocument();
});

test("submit button works", async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/Enter question/i), {
    target: { value: "What is React?" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 1/i), {
    target: { value: "A JavaScript library" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 2/i), {
    target: { value: "A CSS framework" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 3/i), {
    target: { value: "A Node.js framework" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), {
    target: { value: 0 },
  });
  fireEvent.click(screen.getByText(/Submit Question/i));

  // Check if the question was "submitted"
  expect(await screen.findByText(/What is React\?/i)).toBeInTheDocument();
});
