import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getAccessToken,
    loginGoogle, logOut,
} from "../../redux/login.slice/login.slice.js";
import {
    getUser,
    getProfile,
    getUsers,
    setAuthorizedUser,
    setUsers,
} from "../../redux/user.slice/user.slice.js";
import { getPosts, setPosts } from "../../redux/post.slice/post.slice.js";


function Home() {
    const theme = useTheme();

    const dispatch = useDispatch();
    let user = useSelector((state) => state.user.authorizedUser);
    const renewToken = async function () {
        const token = await dispatch(getAccessToken());
        console.log(token.payload);
        console.log("Set access token");
        if(token.payload){
          localStorage.setItem("token",JSON.stringify(token.payload))}else{
            dispatch(logOut())
        }
    };

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("token")) == "out");
        if (JSON.parse(localStorage.getItem("token")) == "out") {
            (async()=>{await  dispatch(loginGoogle());} )()


        }

      //  window.setInterval(renewToken, 1000000)
        if (
            !localStorage.getItem("authorizedUser") &&
            localStorage.getItem("auth")
        ) {
            const auth = localStorage.getItem("auth");
            const authorizedUserResponse = dispatch(
                //  getUser(JSON.parse(auth).id)
                getProfile()
            );
            authorizedUserResponse
                .then((result) => {
                    //  let promiseResult = result

                    dispatch(
                        setAuthorizedUser({
                            ...result.payload,
                            isAuthorized: true,
                        })
                    );
                    localStorage.setItem(
                        "authorizedUser",
                        JSON.stringify({
                            ...result.payload,
                            isAuthorized: true,
                        })
                    );
                })
                .catch((error) => alert(error));
        } else {
            dispatch(
                setAuthorizedUser(
                    JSON.parse(localStorage.getItem("authorizedUser"))
                )
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
        dispatch(
            setAuthorizedUser(
                JSON.parse(localStorage.getItem("authorizedUser"))
            )
        );

     //   return function () {

        //    window.clearInterval(renewToken)

       // }
    }, [isLoggedIn]);

    return (
        <div
            className="container-page"
            style={{ backgroundColor: theme.palette.backgroundColor.page }}>
            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
    );
}

export default Home;
