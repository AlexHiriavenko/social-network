import React, { useEffect } from "react";
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
import Modals from "./components/Modals/Modals";
import { getUser, setUser } from "./redux/user.slice/user.slice";

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.login.token);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  //const isLoggedIn = token? true : false;

  const navigate = useNavigate();

  const handleLogIn = () => {
    //   dispatch(logIn());
    navigate("/");
  };
  useEffect(() => {
    if (!localStorage.getItem("user") && localStorage.getItem("auth")) {
      const auth = localStorage.getItem("auth");
      const user = dispatch(getUser(JSON.parse(auth).id));
      user
        .then((result) => {
          dispatch(setUser(result.payload));
          localStorage.setItem("user", JSON.stringify(result.payload));
        })
        .catch((error) => alert(error));
    } else {
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route element={<PrivateRoute auth={isLoggedIn} />}>
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
          <Route path="/user-page/:id" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/login"
          element={<LogIn isLoggedIn={isLoggedIn} onClick={handleLogIn} />}
        />
      </Routes>
      <Modals />
    </>
  );
}

export default App;
