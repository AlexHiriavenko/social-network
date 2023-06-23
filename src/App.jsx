import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./utils/router/PrivateRoute";
import { Home, Watch, Marketplace, Groups, LogIn, NotFound } from "./pages/";
import Header from "./components/Header/Header";
import { logIn, logOut } from "./redux/login.slice/login.slice"; // Указать правильный путь к loginSlice

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const navigate = useNavigate();
    console.log(isLoggedIn);

    const handleLogIn = () => {
        dispatch(logIn());
        navigate("/");
    };

    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <>
            {isLoggedIn && <Header />}
            <Routes>
                <Route element={<PrivateRoute auth={isLoggedIn} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/watch" element={<Watch />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route
                    path="/login"
                    element={
                        <LogIn isLoggedIn={isLoggedIn} onClick={handleLogIn} />
                    }
                />
            </Routes>
            {isLoggedIn && (
                <button onClick={handleLogOut} className="tempBtn">
                    LogOut
                </button>
            )}
        </>
    );
}

export default App;
