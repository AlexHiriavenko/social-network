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
    setUsers,findByPartOfName,
} from "../../redux/user.slice/user.slice.js";
import { getPosts, setPosts } from "../../redux/post.slice/post.slice.js";


function Home() {
    const theme = useTheme();

    const dispatch = useDispatch();
    let user = useSelector((state) => state.user.authorizedUser);

  //  if(!JSON.parse(localStorage.getItem("token"))){
   //     dispatch(logOut())
   // }

    useEffect(() => {

        if (JSON.parse(localStorage.getItem("token")) == "out" ) {
            (async()=>{await  dispatch(loginGoogle());

                let result = await dispatch(getProfile())

                    dispatch(setAuthorizedUser({...result.payload,isAuthorized:true}))
                    localStorage.setItem('authorizedUser',JSON.stringify({...result.payload,isAuthorized:true}))
            }
            )()
            if (!localStorage.getItem("authorizedUser")) {
                (async()=>{

                        let result = await dispatch(getProfile())

                        localStorage.setItem('authorizedUser',JSON.stringify({...result.payload,isAuthorized:true}))

                        dispatch(setAuthorizedUser({...result.payload,isAuthorized:true}))
                    }
                )()
            }
        }

        if (
            !localStorage.getItem("authorizedUser")

        ) {

            const authorizedUserResponse = dispatch(

                getProfile()
            );
            authorizedUserResponse
                .then((result) => {


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





    }, []);


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
