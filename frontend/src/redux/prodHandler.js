import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../axios_config';

export const fetchProducts = createAsyncThunk(
    'fetch_products',
    async () => {
        const result = await axios.get('/products');
        return result.data;
    }
);

export const productSlice = createSlice({
    name: 'product',    
    initialState: {
        prod_data: [],
        current_prod_desc: 'No Description'
    },
    reducers:{
        updateCurrentProdId(state, action){
            state.current_prod_desc = action.payload;
        }
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.prod_data = action.payload;
        },
    }
});

export const { updateCurrentProdId } = productSlice.actions;
export default productSlice.reducer;
