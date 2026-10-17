import { createSlice } from "@reduxjs/toolkit";

// short-lived UI state (not persisted): unread badges + who is typing
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    unread: {}, // { userId: count }
    typing: {}, // { userId: true }
  },
  reducers: {
    incrementUnread: (state, action) => {
      state.unread[action.payload] = (state.unread[action.payload] || 0) + 1;
    },
    clearUnread: (state, action) => {
      delete state.unread[action.payload];
    },
    setTyping: (state, action) => {
      const { userId, isTyping } = action.payload;
      if (isTyping) state.typing[userId] = true;
      else delete state.typing[userId];
    },
    resetUi: (state) => {
      state.unread = {};
      state.typing = {};
    },
  },
});

export const { incrementUnread, clearUnread, setTyping, resetUi } = uiSlice.actions;
export default uiSlice.reducer;
