import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'fetch_products',
    async () => {
        const result = await axios.get('http://localhost:5000/products');
        return result.data;
    }
);

export const productSlice = createSlice({
    name: "product",    
    initialState: {
        prod_data: []
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.prod_data = action.payload;
        },
    }
});

export default productSlice.reducer;
