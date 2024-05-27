import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './slices/peopleSlice';
import vehiclesReducer from './slices/vehiclesSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
    vehicles: vehiclesReducer,
  },
});

export default store;
