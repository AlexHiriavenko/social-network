import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import { useTheme } from "@mui/material/styles";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {readCookie} from '../../readCookie.js'
import {getAccessToken, loginGoogle} from "../../redux/login.slice/login.slice.js";
import {getProfile, getUser, getUsers, setAuthorizedUser, setUsers} from "../../redux/user.slice/user.slice.js";
import {getPosts, setPosts} from "../../redux/post.slice/post.slice.js";



function Home() {

    window.setInterval(async()=>{
   const token =  await   dispatch(getAccessToken())
        console.log(token.payload)
        console.log("Set access token")
       document.cookie = `token=${token.payload}`
    },9 *60 *1000)
    const theme = useTheme();

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    useEffect(()=>{
       if(readCookie('token' ) == '0'){
        dispatch(loginGoogle())

    }
        if (
            !localStorage.getItem("authorizedUser") &&
            localStorage.getItem("auth")
        ) {
            const auth = localStorage.getItem("auth");
            const authorizedUserResponse = dispatch(getUser(JSON.parse(auth).id));
            authorizedUserResponse
                .then((result) => {
                  //  let promiseResult = result

                    dispatch(
                        setAuthorizedUser({ ...result.payload.data, isAuthorized: true })
                    );
                    localStorage.setItem(
                        "authorizedUser",
                        JSON.stringify({ ...result.payload.data, isAuthorized: true })
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
        dispatch(setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser"))))

       },[isLoggedIn])

    return (
        <div
            className="container-page"
            style={{ backgroundColor: theme.palette.backgroundColor.page }}
        >
            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
    );
}

export default Home;
