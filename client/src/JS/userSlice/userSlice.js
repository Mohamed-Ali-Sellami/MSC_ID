import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for user registration
export const userRegister = createAsyncThunk("user/register", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("msc-id-backend.vercel.app/user/register", user);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Registration failed");
  }
});

// Thunk for user login
export const userLogin = createAsyncThunk("user/login", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("msc-id-backend.vercel.app/user/login", user);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

// Thunk for getting the current user
export const userCurrent = createAsyncThunk("user/current", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("msc-id-backend.vercel.app/user/current", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Failed to get current user");
  }
});

// Thunk for updating the user profile
export const updateuser = createAsyncThunk("user/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`msc-id-backend.vercel.app/user/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Update failed");
  }
});

// Thunk for deleting a user
export const deleteuser = createAsyncThunk("user/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`msc-id-backend.vercel.app/user/${id}`);
    return id; // Retourner l'ID pour le retirer du state
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Delete failed");
  }
});

// Initial state
const initialState = {
  user: null,
  status: null,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.newUserToken;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Current user
      .addCase(userCurrent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userCurrent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(userCurrent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update user
      .addCase(updateuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.user && state.user._id === action.payload._id) {
          state.user = action.payload; // Update user if they are logged in
        }
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.user && state.user._id === action.payload) {
          state.user = null; // Supprimer l'utilisateur actuel si c'est lui
          localStorage.removeItem("token");
        }
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
