import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUsers} from "../../redux/user.slice/user.slice.js";

function Home() {

    const dispatch = useDispatch();
    useEffect(async()=>{
      const users = await dispatch(getUsers())

        console.log(users)

    },[])
    return (
        <div className="container-page">
            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
    );
}

export default Home;
