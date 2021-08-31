import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import prodHandler from './prodHandler';
import cartHandler from './cartHandler';
import userHandler from './userHandler';

export default configureStore({
    reducer: {
        product: prodHandler,
        cart: cartHandler,
        user: userHandler
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
