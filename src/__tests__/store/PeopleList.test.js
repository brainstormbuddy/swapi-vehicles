import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PeopleList from '../../components/PeopleList';
import { fetchVehicles } from '../store/slices/vehiclesSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PeopleList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      people: {
        people: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            gender: 'male',
            edited: '2014-12-20T21:17:56.891000Z',
            vehicles: ['/api/vehicles/14/', '/api/vehicles/30/'],
          },
        ],
        loading: false,
        error: null,
      },
      vehicles: {
        vehicles: [],
        loading: false,
        error: null,
      },
    });
  });

  test('renders loading state correctly', () => {
    store = mockStore({
      people: { people: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <PeopleList />
      </Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    store = mockStore({
      people: { people: [], loading: false, error: 'Failed to fetch' },
    });

    render(
      <Provider store={store}>
        <PeopleList />
      </Provider>
    );

    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });

  test('renders list of people correctly', () => {
    render(
      <Provider store={store}>
        <PeopleList />
      </Provider>
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77 kg/i)).toBeInTheDocument();
  });

  test('dispatches fetchVehicles action on button click', () => {
    render(
      <Provider store={store}>
        <PeopleList />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Show Vehicles/i));

    const actions = store.getActions();
    expect(actions).toContainEqual(fetchVehicles(['/api/vehicles/14/', '/api/vehicles/30/']));
  });
});
