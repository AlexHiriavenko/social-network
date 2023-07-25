import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import { useTheme } from "@mui/material/styles";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {readCookie} from '../../readCookie.js'
import { loginGoogle} from "../../redux/login.slice/login.slice.js";



function Home() {
    const theme = useTheme();

    const dispatch = useDispatch();

    useEffect(()=>{
       if(readCookie('token' ) == '0'){
        dispatch(loginGoogle())

    }

       },[])

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
