import { render, screen, waitFor, act } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("<App />", () => {
  let mockFetch;

  beforeEach(() => {
    // Mock the global fetch function
    mockFetch = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, text: "Sample Question" }]),
      })
    );
  });

  afterEach(() => {
    // Restore the original fetch function
    mockFetch.mockRestore();
  });

  test("renders loading state initially", () => {
    act(() => {
      render(<App />);
      const loadingElement = screen.getByText(/Loading questions.../i);
      expect(loadingElement).toBeInTheDocument();
    });
  });

  test("renders fetched questions", async () => {
    await act(async () => {
      render(<App />);
      await waitFor(() => screen.getByText(/Sample Question/i));
      const questionElement = screen.getByText(/Sample Question/i);
      expect(questionElement).toBeInTheDocument();
    });
  });

  test("renders error message on failed fetch", async () => {
    // Mock fetch to simulate a failed API call
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("API is down"))
    );
    await act(async () => {
      render(<App />);
      await waitFor(() => screen.getByText(/Error fetching questions/i), {
        timeout: 3000,
      });
      const errorElement = screen.getByText(/Error fetching questions/i);
      expect(errorElement).toBeInTheDocument();
    });
  });
});
