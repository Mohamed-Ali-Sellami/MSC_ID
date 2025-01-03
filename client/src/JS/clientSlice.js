import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch clients
export const getclient = createAsyncThunk('/getclient', async (_, { rejectWithValue }) => {
  try {
    const resultat = await axios.get('http://localhost:5900/user/all'); // Await for API response
    return resultat.data; // Assuming the API returns the data in the `data` field
  } catch (error) {
    console.error("API Error:", error);
    return rejectWithValue(error.response?.data || error.message); // Handle error
  }
});

// Initial state
const initialState = {
  client: null,
  status: null,
  error: null,
};

// Client slice
export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getclient.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      // Fulfilled
      .addCase(getclient.fulfilled, (state, action) => {
        state.status = "success";
        state.client = action.payload?.user || action.payload; // Adjust based on actual response
        state.error = null;
      })
      // Rejected
      .addCase(getclient.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload || "Failed to fetch clients.";
      });
  },
});

export default clientSlice.reducer;
