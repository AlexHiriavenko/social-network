import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
} from "./pages/";
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
        <Route element={<PrivateRoute auth={mockAuth} />}>
          <Route path="/" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/" element={<ProfilePosts />} />
            <Route path="/profile/about" element={<ProfileAbout />}>
              <Route path="/profile/about/" element={<Overview />} />
              <Route
                path="/profile/about/employment"
                element={<Employment />}
              />
              <Route path="/profile/about/places" element={<Places />} />
              <Route path="/profile/about/contacts" element={<Contacts />} />
            </Route>
            <Route path="/profile/friends" element={<ProfileFriends />} />
            <Route path="/profile/photos" element={<ProfilePhotos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
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
