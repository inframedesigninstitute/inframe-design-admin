import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../slices/userSlice";

let myStore = configureStore({
    reducer: {
        loginStore: loginSlice.reducer,
    }
})

export default myStore;