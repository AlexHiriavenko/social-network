import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import { useTheme } from "@mui/material/styles";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {

    loginGoogle,logOut
} from "../../redux/login.slice/login.slice.js";

import {
    getProfile,
    setAuthorizedUser,
} from "../../redux/user.slice/user.slice.js";



function Home() {
    const theme = useTheme();

    const dispatch = useDispatch();
    let user = useSelector((state) => state.user.authorizedUser);

    useEffect(() => {

        if (JSON.parse(localStorage.getItem("token")) == null || JSON.parse(localStorage.getItem("token")) == "out" ) {
            (async()=>{
                
                const auth  = await  dispatch(loginGoogle());
                
                console.log(auth?.type)

            //    if(auth?.type === 'Login/loginGoogle/rejected'){dispatch(logOut()}

                let result = await dispatch(getProfile())

                    dispatch(setAuthorizedUser({...result.payload,isAuthorized:true}))

            }
            )()

        }
        if (
            !localStorage.getItem("authorizedUser") &&
            localStorage.getItem("auth")

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
        if (!user) {
            (async()=>{

                    let result = await dispatch(getProfile())

                    dispatch(setAuthorizedUser({...result.payload,isAuthorized:true}))
                    if(!localStorage.getItem("authorizedUser")){
                        localStorage.setItem("authorizedUser",JSON.stringify({...result.payload,isAuthorized:true}))
                    }
                }
            )()
        }

    }, []);


    return (
        <div
            className="container-page"
            style={{ backgroundColor: theme.palette.backgroundColor.page, height: "calc(100vh-65px)" }}>
            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
    );
}

export default Home;
