import { render, screen } from "@testing-library/react";
import React from "react";

function HelloWorld() {
  return <h1>Hello, World!</h1>;
}

test("renders hello world", () => {
  render(<HelloWorld />);
  expect(screen.getByText(/hello, world/i)).toBeInTheDocument();
});
