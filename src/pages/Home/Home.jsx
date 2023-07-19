import HomeMain from "./HomeMain";
import HomeAsideLeft from "./HomeAsideLeft";
import HomeAsideRight from "./HomeAsideRight";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUsers} from "../../redux/user.slice/user.slice.js";

function Home() {

    return (
        <div className="container-page">
            <HomeAsideLeft />
            <HomeMain />
            <HomeAsideRight />
        </div>
    );
}

export default Home;
