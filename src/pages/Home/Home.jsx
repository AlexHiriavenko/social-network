import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, setUsers} from "../../redux/user.slice/user.slice.js";
import axios from "axios";
import {readCookie} from '../../readCookie.js'
import {getAccessToken, loginGoogle, setLogin} from "../../redux/login.slice/login.slice.js";


function Home() {

    const dispatch = useDispatch();

    useEffect(()=>{
       if(readCookie('token' ) == '0'){
        dispatch(loginGoogle())

    }
       },[])

    return (
        <>
        <div className="container-page">

            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
</>
    );
}

export default Home;
