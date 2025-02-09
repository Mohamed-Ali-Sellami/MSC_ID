import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------- GET Clients -------------------
export const getclient = createAsyncThunk("client/getclient", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://msc-id-mohamed-alis-projects-8660c8bc.vercel.app/user/all");
    return response.data.user; // Assuming "user" contains the list of clients
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Failed to fetch clients");
  }
});

// ---------------- DELETE Client -------------------
export const deleteclient = createAsyncThunk("client/deleteclient", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://msc-id-mohamed-alis-projects-8660c8bc.vercel.app/user/${id}`);
    return id; // Return deleted user ID to update state
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Failed to delete client");
  }
});

// ---------------- Initial State -----------------
const initialState = {
  client: [], // Stores the list of users
  status: null, // Request status
  error: null, // Stores errors (if needed)
};

// ---------------- Slice -------------------------
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Clients
      .addCase(getclient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getclient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.client = action.payload;
        state.error = null;
      })
      .addCase(getclient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // DELETE Client
      .addCase(deleteclient.fulfilled, (state, action) => {
        state.client = state.client.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteclient.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
