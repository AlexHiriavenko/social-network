import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, setUsers,getUser} from "../../redux/user.slice/user.slice.js";
import axios from "axios";
import {readCookie} from '../../readCookie.js'
import {getAccessToken, loginGoogle, setLogin} from "../../redux/login.slice/login.slice.js";
import {getChat, sendMessage} from "../../redux/chat.slice/chat.slice.js";


function Home() {

    const dispatch = useDispatch();

    useEffect(()=>{
       if(readCookie('token' ) == '0'){
        dispatch(loginGoogle())

    }
        ( async function(){
      const user = await  dispatch(getUser(1));
       console.log(user)
let id =1
        const chat = await dispatch(getChat(1));
            console.log(chat.payload)

           // dispatch(sendMessage({sender:user.payload,chat:chat.payload.data,content:"New message"}))
        })()


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
