import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// ---------------- GET Clients -------------------
export const getclient = createAsyncThunk('client/getclient', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:5900/user/all');
    return response.data.user; // Supposons que "user" contient la liste des clients
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Erreur serveur");
  }
});

// ---------------- Initial State -----------------
const initialState = {
  client: [], // Stocke la liste des utilisateurs
  status: null, // Status de la requête
  error: null,  // Stocke les erreurs (si nécessaire)
};

// ---------------- Slice -------------------------
const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Clients
      .addCase(getclient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getclient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.client = action.payload; // Stocke les utilisateurs
        state.error = null;
      })
      .addCase(getclient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Stocke l'erreur
      });
  },
});

export default clientSlice.reducer;
