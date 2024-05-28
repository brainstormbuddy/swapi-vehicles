import axios from "axios";
import { act } from "react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

import peopleReducer from "../../store/slices/peopleSlice";
import vehiclesReducer from "../../store/slices/vehiclesSlice";
import PeopleList from "../../components/PeopleList";

const mock = new MockAdapter(axios);

const mockNetworkRequests = () => {
  mock.onGet(/https:\/\/swapi\.dev\/api\/people\/\?search=&page=\d+/).reply(200, {
    results: [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        gender: "male",
        edited: "2020-12-20T21:17:50.309000Z",
        vehicles: ["https://swapi.dev/api/vehicles/14/"]
      }
    ],
    count: 1
  });

  mock.onGet("https://swapi.dev/api/vehicles/14/").reply(200, {
    name: "Snowspeeder",
    model: "t-47 airspeeder",
    manufacturer: "Incom corporation",
    vehicle_class: "airspeeder"
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
      reducer: { people: peopleReducer, vehicles: vehiclesReducer },
      preloadedState: initialState
    })
  } = {}
) => {
  return rtlRender(<Provider store={store}>{ui}</Provider>);
};

describe("PeopleList", () => {
  beforeEach(() => {
    mockNetworkRequests();
  });

  afterEach(() => {
    unMockNetworkRequests();
  });

  it("should render PeopleList with fetched people", async () => {
    const initialState = {
      people: {
        people: [
          {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            gender: "male",
            edited: "2020-12-20T21:17:50.309000Z",
            vehicles: ["https://swapi.dev/api/vehicles/14/"]
          }
        ],
        loading: false,
        error: null,
        count: 1
      },
      vehicles: {
        vehicles: [],
        loading: false,
        error: null
      }
    };

    const store = configureStore({
      reducer: { people: peopleReducer, vehicles: vehiclesReducer },
      preloadedState: initialState
    });

    await act(async () => {
      render(<PeopleList />, { store });
    });

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Height: 172 cm, Mass: 77 kg, Gender: male, Edited: 12/20/2020")).toBeInTheDocument();
  });

  it("should show loading state", async () => {
    const initialState = {
      people: {
        people: [],
        loading: true,
        error: null,
        count: 0
      },
      vehicles: {
        vehicles: [],
        loading: false,
        error: null
      }
    };

    const store = configureStore({
      reducer: { people: peopleReducer, vehicles: vehiclesReducer },
      preloadedState: initialState
    });

    await act(async () => {
      render(<PeopleList />, { store });
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error state", async () => {
    const initialState = {
      people: {
        people: [],
        loading: false,
        error: "Failed to fetch people",
        count: 0
      },
      vehicles: {
        vehicles: [],
        loading: false,
        error: null
      }
    };

    const store = configureStore({
      reducer: { people: peopleReducer, vehicles: vehiclesReducer },
      preloadedState: initialState
    });

    await act(async () => {
      render(<PeopleList />, { store });
    });

    expect(screen.getByText("Error: Failed to fetch people")).toBeInTheDocument();
  });

  it("should fetch and display vehicles when button is clicked", async () => {
    const initialState = {
      people: {
        people: [
          {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            gender: "male",
            edited: "2020-12-20T21:17:50.309000Z",
            vehicles: ["https://swapi.dev/api/vehicles/14/"]
          }
        ],
        loading: false,
        error: null,
        count: 1
      },
      vehicles: {
        vehicles: [],
        loading: false,
        error: null
      }
    };

    const store = configureStore({
      reducer: { people: peopleReducer, vehicles: vehiclesReducer },
      preloadedState: initialState
    });

    await act(async () => {
      render(<PeopleList />, { store });
    });

    // Check that the person is rendered
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    // Find the button and click it
    const button = screen.getByText("Show Vehicles");
    fireEvent.click(button);

    // Check that the loading state is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the vehicles to be fetched and displayed
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    });

    // Check that the vehicle data is rendered correctly in the dialog
    expect(screen.getByText("Snowspeeder")).toBeInTheDocument();
    expect(
      screen.getByText("Model: t-47 airspeeder, Manufacturer: Incom corporation, Class: airspeeder")
    ).toBeInTheDocument();
  });
});
