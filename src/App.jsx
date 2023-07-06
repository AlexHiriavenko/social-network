import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./utils/router/PrivateRoute";
import { Home, Watch, Marketplace, Groups, LogIn, NotFound } from "./pages/";
import Header from "./components/Header/Header";

function App() {
  const [mockAuth, setMockAuth] = useState(false);
  const navigate = useNavigate();

  const logIn = () => {
    setMockAuth(true);
    navigate("/");
  };

  return (
    <>
      {mockAuth && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="*" element={<NotFound />} />z
        <Route
          path="/login"
          element={<LogIn auth={mockAuth} onClick={logIn} />}
        />
      </Routes>
      {mockAuth && (
        <button onClick={() => setMockAuth(false)} className="tempBtn">
          LogOut
        </button>
      )}
    </>
  );
}

export default App;
