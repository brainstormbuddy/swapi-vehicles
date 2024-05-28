import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVehicles = createAsyncThunk("vehicles/fetchVehicles", async vehicleUrls => {
  const vehicles = await Promise.all(vehicleUrls.map(url => axios.get(url).then(res => res.data)));
  return vehicles;
});

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    vehicles: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVehicles.pending, state => {
        state.loading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default vehiclesSlice.reducer;
