import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    OtherUsers: null,
    selectedUser: null,
    OnLineUsers: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      // logging out: wipe everything that belonged to the previous user
      if (!action.payload) {
        state.OtherUsers = null;
        state.selectedUser = null;
        state.OnLineUsers = null;
      }
    },
    setOtherUsers: (state, action) => {
      state.OtherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.OnLineUsers = action.payload;
    },
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
