import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export let loginSlice = createSlice({
    name: 'loginData',
    initialState: {
        token: Cookies.get("TOKEN") ?? ""
    },
    reducers: {
        loginUserData: function (state, reqData) {
            state.token = reqData.payload.token
            Cookies.set("TOKEN", reqData.payload.token)
        },
        logoutUser: function (state) {
            state.token = ''
            Cookies.remove("TOKEN")
        }
    }
})

export const { loginUserData, logoutUser } = loginSlice.actions;
export default loginSlice.reducer