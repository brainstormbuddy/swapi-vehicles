import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPeople = createAsyncThunk("people/fetchPeople", async ({ search = "", page = 1 }) => {
  const response = await axios.get(`https://swapi.dev/api/people/?search=${search}&page=${page}`);
  return { results: response.data.results, count: response.data.count };
});

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    people: [],
    loading: false,
    error: null,
    count: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPeople.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload.results;
        state.count = action.payload.count;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default peopleSlice.reducer;
