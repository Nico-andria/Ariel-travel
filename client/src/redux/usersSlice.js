import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    SetUser(state, action) {
      state.user = action.payload;
    },
    Logout(state) {
      state.user = null;
    },
  },
});

export const { SetUser, Logout } = usersSlice.actions;
export default usersSlice.reducer;
