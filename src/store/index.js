import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./slices/peopleSlice";
import vehiclesReducer from "./slices/vehiclesSlice";

export const rootReducer = {
  people: peopleReducer,
  vehicles: vehiclesReducer
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
