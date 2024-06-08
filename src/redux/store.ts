import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/form/formSlice";


const store = configureStore({
    reducer:{
        [formSlice.name]: formSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;