import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestion: null,
  isLoading: false,
  error: null,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // Placeholder reducers - will be implemented later
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setQuestions, setCurrentQuestion, setLoading, setError } = questionSlice.actions;

export default questionSlice.reducer;
