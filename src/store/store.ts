import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileIdReducer from "./fileIdSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        fileId: fileIdReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
