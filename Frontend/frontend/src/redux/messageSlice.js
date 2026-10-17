import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: null, // null = still loading, [] = empty conversation
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // append one message (ignores duplicates, e.g. the sender's own socket echo)
    addMessage: (state, action) => {
      const list = state.messages || [];
      if (!list.some((m) => m._id === action.payload._id)) {
        list.push(action.payload);
      }
      state.messages = list;
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
