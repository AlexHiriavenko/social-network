import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Modals from "./components/Modals/Modals";
import {
  getProfile,
  getUser,
  getUsers,
  setAuthorizedUser,
  setUsers,
} from "./redux/user.slice/user.slice";
import { getPosts, setPosts } from "./redux/post.slice/post.slice";
import AllRoutes from "./components/Routes";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
 /*   if (
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
      .catch((error) => alert(error));*/
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && <Header />}
      <AllRoutes />
      <Modals />
    </>
  );
}

export default App;
