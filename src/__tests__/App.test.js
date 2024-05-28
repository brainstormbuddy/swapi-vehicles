// src/__tests__/App.test.js
import React from "react";
import { render as rtlRender, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "../store/slices/peopleSlice";
import vehiclesReducer from "../store/slices/vehiclesSlice";
import App from "../App";

const render = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: { people: peopleReducer, vehicles: vehiclesReducer },
      preloadedState: initialState
    })
  } = {}
) => {
  return rtlRender(<Provider store={store}>{ui}</Provider>);
};

describe("App", () => {
  it("should render the header", async () => {
    render(<App />);
    const headerElement = await screen.findByText(/Star Wars Characters/);
    expect(headerElement).toBeInTheDocument();
  });

  it("should render PeopleList component", () => {
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
