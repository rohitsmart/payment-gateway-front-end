import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  sessionId: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { accessToken, sessionId } = action.payload;
      state.accessToken = accessToken;
      state.sessionId = sessionId;
    },
    setSessionId: (state, action) => {
      const { sessionId } = action.payload;
      state.sessionId = sessionId;
    },
    clearAuthData: (state) => {
      state.accessToken = null;
      state.sessionId = null;
    },
  },
});

export const { setAuthData, setSessionId, clearAuthData } = authSlice.actions;

// Selector function
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
