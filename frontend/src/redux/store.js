import { configureStore } from "@reduxjs/toolkit";
import prodHandler from './prodHandler';
import cartHandler from './cartProdHandler';

export default configureStore({
    reducer: {
        productReducer: prodHandler,
        cartReducer: cartHandler
    }
});
