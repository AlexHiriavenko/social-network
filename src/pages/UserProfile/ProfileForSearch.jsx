import {Outlet, useParams} from "react-router-dom";
import ProfileHeaderForSearch from "../../components/ProfileForSearch/ProfileHeaderForSearch.jsx";
import ProfileNavigationForSearch from "../../components/ProfileForSearch/ProfileNavigationForSearch.jsx";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import {useDispatch } from 'react-redux'
import {getUser} from "../../redux/user.slice/user.slice.js";
import {useEffect, useState} from "react";

export default function Profile(props) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.user?.user);
    const [user,setUser] = useState(null)
    let {id} = useParams()


   // const id =1;
useEffect(()=>{

    const userPromise = dispatch(getUser(id))
    userPromise.then(result =>{
        setUser( result.payload)
        console.log(user)
    })

},[id])

    return (
        <>
            {auth ? (
                <>
                    <ProfileHeaderForSearch user={user} />
                    <ProfileNavigationForSearch user ={user} />
                    <Outlet />
                </>
            ) : (
                <Backdrop
                    sx={{ color: "#fff", }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </>
    );
}
