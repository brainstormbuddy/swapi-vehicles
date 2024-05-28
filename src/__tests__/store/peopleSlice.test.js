import axios from "axios";
import { act } from "react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import { render as rtlRender, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

import peopleReducer, { fetchPeople } from "../../store/slices/peopleSlice";
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
        vehicles: []
      }
    ],
    count: 1
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

describe("peopleSlice", () => {
  beforeEach(() => {
    mockNetworkRequests();
  });

  afterEach(() => {
    unMockNetworkRequests();
  });

  it("should handle fetchPeople fulfilled", async () => {
    const store = configureStore({ reducer: { people: peopleReducer, vehicles: vehiclesReducer } });

    await store.dispatch(fetchPeople({ search: "", page: 1 }));
    const state = store.getState();

    expect(state.people.loading).toBe(false);
    expect(state.people.people.length).toBe(1);
    expect(state.people.people[0].name).toBe("Luke Skywalker");
  });

  it("should handle fetchPeople pending and rejected", async () => {
    mock.onGet(/https:\/\/swapi\.dev\/api\/people\/\?search=&page=\d+/).reply(500);

    const store = configureStore({ reducer: { people: peopleReducer, vehicles: vehiclesReducer } });

    await store.dispatch(fetchPeople({ search: "", page: 1 }));
    const state = store.getState();

    expect(state.people.loading).toBe(false);
    expect(state.people.error).not.toBeNull();
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
            vehicles: []
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
  });
});
