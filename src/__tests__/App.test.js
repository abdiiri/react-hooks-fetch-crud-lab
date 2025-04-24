import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  expect(await screen.findByText(/lorem testum 1/)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/New Question/));
  fireEvent.change(screen.getByLabelText(/Prompt/), {
    target: { value: "New Question Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/), {
    target: { value: "Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/), {
    target: { value: "Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 3/), {
    target: { value: "Answer 3" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });
  fireEvent.click(screen.getByText(/Submit Question/));
  expect(await screen.findByText(/New Question Prompt/)).toBeInTheDocument();
});
