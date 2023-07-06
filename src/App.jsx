import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./utils/router/PrivateRoute";
import {
  Home,
  Watch,
  Marketplace,
  Groups,
  LogIn,
  NotFound,
  Profile,
  ProfilePosts,
  ProfileAbout,
  Overview,
  Employment,
  Places,
  Contacts,
  ProfileFriends,
  ProfilePhotos,
  UserPage,
} from "./pages/";
import Header from "./components/Header/Header";
import { logIn } from "./redux/login.slice/login.slice";
import { useState } from "react";

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
