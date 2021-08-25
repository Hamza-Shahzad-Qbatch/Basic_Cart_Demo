import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import axios from '../axios_config';

export const fetchCartProducts = createAsyncThunk(
    'fetch_cart_products',
    async () => {
        const result = await axios.get('/cart_products');
        if (result !== -1)
            return result.data;
        return result;
    }
);

export const insertCartProduct = createAsyncThunk(
    'insert_cart_product',
    async (id, thunkAPI) => {
        const config = {
            method: 'POST',
            data: { id: id },
            url: `/cart_product/${id}`
        };
        const result = await axios(config);
        if (result !== -1)
            return result.data;
        return result;
    }
);

export const removeCartProduct = createAsyncThunk(
    'remove_cart_product',
    async (id, thunkAPI) => {
        const config = {
            method: 'DELETE',
            url: `/del_cart_prod/${id}`
        };
        const result = await axios(config);
        if (result !== -1)
            return id;
        return result;
    }
);

export const updateCartProdQuantity = createAsyncThunk(
    'update_cart_product_quantity',
    async (obj, thunkAPI) => {
        const config = {
            method: 'PATCH',
            data: { cart_id: obj.cart_id, quantity: obj.quantity },
            url: '/update_cart_prod_quantity'
        };
        const result = await axios(config);
        if (result !== -1)
            return obj;
        return result;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart_data: [],
        cart_counter: 0,
    },
    extraReducers: {
        [fetchCartProducts.fulfilled]: (state, action) => {
            if (action.payload !== -1) {
                state.cart_data = action.payload;
                let sum = 0;
                state.cart_data.forEach((ele) => {
                    sum += ele.quantity;
                });
                state.cart_counter = sum;
            }
        },
        [insertCartProduct.fulfilled]: (state, action) => {
            if (action.payload !== "Invalid ID" && action.payload !== -1) {
                const index = _.findIndex(state.cart_data,
                    ele => ele.prod_id === action.payload.prod_id);
                if (index === -1) {
                    state.cart_data.push(action.payload);
                }
                else {
                    state.cart_data[index].quantity++;
                }
                state.cart_counter++;
            }
        },
        [removeCartProduct.fulfilled]: (state, action) => {
            if (action.payload !== -1) {
                const index = _.findIndex(state.cart_data,
                    ele => ele.cart_id === action.payload);
                state.cart_counter -= state.cart_data[index].quantity;

                const result = state.cart_data.filter(element => element.cart_id !== action.payload);
                state.cart_data = result;
            }
        },
        [updateCartProdQuantity.fulfilled]: (state, action) => {
            if (action.payload !== -1) {
                const index = _.findIndex(state.cart_data,
                    ele => ele.cart_id === action.payload.cart_id);
                state.cart_data[index].quantity = action.payload.quantity;

                let sum = 0;
                state.cart_data.forEach((ele) => {
                    sum += ele.quantity;
                });
                state.cart_counter = sum;
            }
        },
    }
});

export default cartSlice.reducer;
