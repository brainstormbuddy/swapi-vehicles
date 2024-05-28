import axios from "axios";
import { act } from "react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import { render as rtlRender, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

import vehiclesReducer, { fetchVehicles } from "../../store/slices/vehiclesSlice";
import peopleReducer from "../../store/slices/peopleSlice";
import VehiclesDialog from "../../components/VehiclesDialog";

const mock = new MockAdapter(axios);

const mockNetworkRequests = () => {
  mock.onGet("https://swapi.dev/api/vehicles/4/").reply(200, {
    name: "Sand Crawler",
    model: "Digger Crawler",
    manufacturer: "Corellia Mining Corporation",
    vehicle_class: "wheeled"
  });
};

const unMockNetworkRequests = () => {
  mock.resetHistory();
};

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

describe("vehiclesSlice", () => {
  beforeEach(() => {
    mockNetworkRequests();
  });

  afterEach(() => {
    unMockNetworkRequests();
  });

  it("should handle fetchVehicles fulfilled", async () => {
    const store = configureStore({ reducer: { vehicles: vehiclesReducer, people: peopleReducer } });

    await store.dispatch(fetchVehicles(["https://swapi.dev/api/vehicles/4/"]));
    const state = store.getState();

    expect(state.vehicles.loading).toBe(false);
    expect(state.vehicles.vehicles.length).toBe(1);
    expect(state.vehicles.vehicles[0].name).toBe("Sand Crawler");
  });

  it("should handle fetchVehicles pending and rejected", async () => {
    mock.onGet("https://swapi.dev/api/vehicles/4/").reply(500);

    const store = configureStore({ reducer: { vehicles: vehiclesReducer, people: peopleReducer } });

    await store.dispatch(fetchVehicles(["https://swapi.dev/api/vehicles/4/"]));
    const state = store.getState();

    expect(state.vehicles.loading).toBe(false);
    expect(state.vehicles.error).not.toBeNull();
  });

  it("should render VehiclesDialog with fetched vehicles", async () => {
    const initialState = {
      vehicles: {
        vehicles: [
          {
            name: "Sand Crawler",
            model: "Digger Crawler",
            manufacturer: "Corellia Mining Corporation",
            vehicle_class: "wheeled"
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

    const store = configureStore({
      reducer: { vehicles: vehiclesReducer, people: peopleReducer },
      preloadedState: initialState
    });

    await act(async () => {
      render(<VehiclesDialog open={true} onClose={() => {}} />, { store });
    });

    expect(screen.getByText("Sand Crawler")).toBeInTheDocument();
  });
});
