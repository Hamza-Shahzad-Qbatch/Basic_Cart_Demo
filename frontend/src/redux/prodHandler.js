import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../axios_config';

export const fetchProducts = createAsyncThunk(
    'fetch_products',
    async () => {
        const result = await axios.get('/products');
        return result.data;
    }
);

export const fetchProduct = createAsyncThunk(
    'fetch_product',
    async (id, { rejectWithValue }) => {    //thunkAPI.rejectWithValue
        try {
            const result = await axios.get(`/product/${id}`);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        prod_data: [],  //Hash
        selectedProduct: {}   //Hash
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.prod_data = action.payload;
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.selectedProduct = action.payload;
        },
        [fetchProduct.rejected]: (state, action) => {
            return { ...state, selectedProduct: null };
        },
    }
});

export default productSlice.reducer;
