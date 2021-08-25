import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import prodHandler from './prodHandler';
import cartHandler from './cartHandler';

export default configureStore({
    reducer: {
        product: prodHandler,
        cart: cartHandler
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
