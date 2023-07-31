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
  FriendsHome,
  FriendRequests,
  FriendSuggestions,
  UserFriendsPage,
} from "./pages/";
import Header from "./components/Header/Header";
import { logIn } from "./redux/login.slice/login.slice";
import Modals from "./components/Modals/Modals";
import {
  getUser,
  getUsers,
  setAuthorizedUser,
  setUser,
  setUsers,
} from "./redux/user.slice/user.slice";
import { getPosts, setPosts } from "./redux/post.slice/post.slice";
import ChangePasswordForm from "./pages/LogIn/ChangePasswordForm.jsx";

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
    if (
      !localStorage.getItem("authorizedUser") &&
      localStorage.getItem("auth")
    ) {
      const auth = localStorage.getItem("auth");
      const authorizedUserResponse = dispatch(getUser(JSON.parse(auth).id));
      authorizedUserResponse
        .then((result) => {
          dispatch(
            setAuthorizedUser({ ...result.payload, isAuthorized: true })
          );
          localStorage.setItem(
            "authorizedUser",
            JSON.stringify({ ...result.payload, isAuthorized: true })
          );
        })
        .catch((error) => alert(error));
    } else {
      dispatch(
        setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser")))
      );
    }

    // get all users
    const allUsersResponse = dispatch(getUsers());
    allUsersResponse
      .then((result) => {
        dispatch(setUsers(result.payload));
      })
      .catch((error) => alert(error));
      
      // get all posts
    const allPostsResponse = dispatch(getPosts());
    allPostsResponse
      .then((result) => {
        dispatch(setPosts(result.payload));
      })
      .catch((error) => alert(error));
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
          <Route path="/friends/home" element={<FriendsHome />}/>
          <Route path="/friends/requests/" element={<FriendRequests />}/>
          <Route path="/friends/suggestions/" element={<FriendSuggestions />}/>
          <Route path="//friends/allfriends" element={<UserFriendsPage />}/>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/login"
          element={<LogIn isLoggedIn={isLoggedIn} onClick={handleLogIn} />}
        />
        <Route path="/password" element={<ChangePasswordForm />} />
      </Routes>
      <Modals />
    </>
  );
}

export default App;
