// src/__tests__/HelloWorld.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HelloWorld from "../components/HelloWorld";

describe("HelloWorld Component", () => {
  test('renders the text "Hello, World!"', () => {
    render(<HelloWorld />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  test('renders a heading element containing "Hello, World!"', () => {
    render(<HelloWorld />);
    expect(
      screen.getByRole("heading", { name: "Hello, World!" })
    ).toBeInTheDocument();
  });
});
