import React from "react";
import { Provider } from "react-redux";
import { render as rtlRender, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";

import VehiclesDialog from "../../components/VehiclesDialog";
import vehiclesReducer from "../../store/slices/vehiclesSlice";
import peopleReducer from "../../store/slices/peopleSlice";

const render = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: { vehicles: vehiclesReducer, people: peopleReducer },
      preloadedState: initialState
    })
  } = {}
) => {
  return rtlRender(<Provider store={store}>{ui}</Provider>);
};

describe("VehiclesDialog", () => {
  it("should render loading state", () => {
    const initialState = {
      vehicles: {
        vehicles: [],
        loading: true,
        error: null
      },
      people: {
        people: [],
        loading: false,
        error: null,
        count: 0
      }
    };

    render(<VehiclesDialog open={true} onClose={() => {}} />, { initialState });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    const initialState = {
      vehicles: {
        vehicles: [],
        loading: false,
        error: "Failed to fetch vehicles"
      },
      people: {
        people: [],
        loading: false,
        error: null,
        count: 0
      }
    };

    render(<VehiclesDialog open={true} onClose={() => {}} />, { initialState });

    expect(screen.getByText("Error: Failed to fetch vehicles")).toBeInTheDocument();
  });

  it("should render vehicles list", () => {
    const initialState = {
      vehicles: {
        vehicles: [
          {
            name: "Snowspeeder",
            model: "t-47 airspeeder",
            manufacturer: "Incom corporation",
            vehicle_class: "airspeeder"
          }
        ],
        loading: false,
        error: null
      },
      people: {
        people: [],
        loading: false,
        error: null,
        count: 0
      }
    };

    render(<VehiclesDialog open={true} onClose={() => {}} />, { initialState });

    expect(screen.getByText("Snowspeeder")).toBeInTheDocument();
    expect(
      screen.getByText("Model: t-47 airspeeder, Manufacturer: Incom corporation, Class: airspeeder")
    ).toBeInTheDocument();
  });
});
