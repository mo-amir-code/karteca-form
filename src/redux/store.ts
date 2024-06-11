import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/form/formSlice";
import formAPI from "./queries/form/formQuery";
import participantSlice from "./slices/participant/participantSlice";


const store = configureStore({
    reducer:{
        [formSlice.name]: formSlice.reducer,
        [participantSlice.name]: participantSlice.reducer,
        [formAPI.reducerPath]: formAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat([
          formAPI.middleware
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;