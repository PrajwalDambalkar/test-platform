import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [],
  currentResult: null,
  isLoading: false,
  error: null,
};

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    // Placeholder reducers - will be implemented later
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setCurrentResult: (state, action) => {
      state.currentResult = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setResults, setCurrentResult, setLoading, setError } = resultSlice.actions;

export default resultSlice.reducer;
