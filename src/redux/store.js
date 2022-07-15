import { configureStore } from "@reduxjs/toolkit"
import productsReducer from './products.slice';
import alertReducer from './alert.slice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        alert: alertReducer
    }
})

export default store;