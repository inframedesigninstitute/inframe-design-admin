'use client'
import { Provider } from "react-redux";
import myStore from "../redux/store/store";

export default function MainLayout({ children }) {
    return <>
        <Provider store={myStore}>
            {children}
        </Provider>
    </>;
}
