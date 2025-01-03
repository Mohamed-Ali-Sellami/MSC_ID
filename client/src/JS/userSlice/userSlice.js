import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for user registration
export const userRegister = createAsyncThunk("user/register", async (user) => {
  try {
    let response = await axios.post("http://localhost:5900/user/register", user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Thunk for user login
export const userLogin = createAsyncThunk("user/login", async (user) => {
  try {
    let response = await axios.post("http://localhost:5900/user/login", user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Thunk for getting the current user
export const userCurrent = createAsyncThunk("user/current", async () => {
  try {
    let response = await axios.get("http://localhost:5900/user/current", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Thunk for deleting a user
export const deleteuser = createAsyncThunk("user/delete", async (id) => {
  try {
    let response = await axios.delete(`http://localhost:5900/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Thunk for updating a user
export const updateuser = createAsyncThunk(
  "user/update",
  async ({ id, updatedData }) => {
    try {
      let response = await axios.put(
        `http://localhost:5900/user/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Initial state
const initialState = {
  user: null,
  status: null,
};

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    // Register
    [userRegister.pending]: (state) => {
      state.status = "pending";
    },
    [userRegister.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.newUserToken;
      localStorage.setItem("token", action.payload.token);
    },
    [userRegister.rejected]: (state) => {
      state.status = "fail";
    },

    // Login
    [userLogin.pending]: (state) => {
      state.status = "pending";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    [userLogin.rejected]: (state) => {
      state.status = "fail";
    },

    // Current user
    [userCurrent.pending]: (state) => {
      state.status = "pending";
    },
    [userCurrent.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
    },
    [userCurrent.rejected]: (state) => {
      state.status = "fail";
    },

    // Delete user
    [deleteuser.pending]: (state) => {
      state.status = "pending";
    },
    [deleteuser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = state.user.filter((u) => u._id !== action.payload._id);
    },
    [deleteuser.rejected]: (state) => {
      state.status = "fail";
    },

    // Update user
    [updateuser.pending]: (state) => {
      state.status = "pending";
    },
    [updateuser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = state.user.map((u) =>
        u._id === action.payload._id ? action.payload : u
      );
    },
    [updateuser.rejected]: (state) => {
      state.status = "fail";
    },
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
