import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TStateIngredients = {
  ingredients: TIngredient[];
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TStateIngredients = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getIngredientsWithSelector: (state) => state.ingredients,
    getLoadingStatus: (state) => state.loading,
    getStateIngredients: (state) => state
  }
});

export default ingredientsSlice.reducer;

export const {
  getIngredientsWithSelector,
  getLoadingStatus,
  getStateIngredients
} = ingredientsSlice.selectors;
