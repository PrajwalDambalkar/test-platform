import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tests: [],
  currentTest: null,
  isLoading: false,
  error: null,
};

const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    // Placeholder reducers - will be implemented later
    setTests: (state, action) => {
      state.tests = action.payload;
    },
    setCurrentTest: (state, action) => {
      state.currentTest = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTests, setCurrentTest, setLoading, setError } = testSlice.actions;

export default testSlice.reducer;
