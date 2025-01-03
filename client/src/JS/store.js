import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import clientSlice from './clientSlice';

export const store = configureStore({
  reducer: {
    user: userSlice, client: clientSlice,
  },
});
