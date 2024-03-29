import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import { ThemeProvider } from "@emotion/react";
import { themeDay, themeNight } from "./thema.js";

const DarkModeThemeProvider = ({ children }) => {
    const darkMode = useSelector((state) => state.darkMode.isOn);

    return <ThemeProvider theme={darkMode ? themeNight : themeDay}>{children}</ThemeProvider>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <DarkModeThemeProvider>
                <App />
            </DarkModeThemeProvider>
        </BrowserRouter>
    </Provider>
);
