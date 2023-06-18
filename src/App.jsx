import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Watch, Marketplace, Groups, LogIn, NotFound } from "./pages/";
import Header from "./components/Header/Header";

function App() {
    const [mockAuth, setMockAuth] = useState(false);

    return (
        <>
            {mockAuth ? (
                <>
                    <Header></Header>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/watch" element={<Watch />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/groups" element={<Groups />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <button onClick={() => setMockAuth(false)} style={{ color: "red" }}>
                        LogOut
                    </button>
                </>
            ) : (
                <>
                    {" "}
                    <LogIn />
                    <button onClick={() => setMockAuth(true)} style={{ color: "red" }}>
                        LogIn
                    </button>
                </>
            )}
        </>
    );
}

export default App;
