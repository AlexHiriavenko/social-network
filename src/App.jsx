import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Modals from "./components/Modals/Modals";

import AllRoutes from "./components/Routes";

function App() {
    const token = useSelector((state) => state.login.token);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    useEffect(() => {}, [isLoggedIn]);

    return (
        <>
            {isLoggedIn && <Header />}
            <AllRoutes />
            <Modals />
        </>
    );
}

export default App;
