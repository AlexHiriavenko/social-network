import React from "react";
import { useDispatch, useSelector, navigate } from "react-redux";
import { setFriends, setUser, getUser } from "../../redux/user.slice/user.slice";
import { getFriendsById } from '../../redux/friends/actionCreators';

function SetUserForProfile(id) {

    const dispatch =useDispatch();
    const authUser = useSelector((store)=>store.user.authorizedUser);

    // get user friends
    const userFriendsResponse = dispatch(getFriendsById(id));
    userFriendsResponse
        .then((data) => {
        dispatch(setFriends(data.payload));
        localStorage.setItem("friends", JSON.stringify(data.payload));
        })
        .catch((error) => console.log(error.message));
     // checking if the user is authorized
    if (id === authUser.id) {
        dispatch(setUser(authUser));
        localStorage.setItem("user", JSON.stringify(authUser));
        navigate("/profile");
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        const userResponse = dispatch(getUser(id));
        userResponse
        .then((data) => {
            dispatch(setUser(data.payload));
            localStorage.setItem("user", JSON.stringify(data.payload));
            navigate("/profile");
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => error.message);
    }
}

export default SetUserForProfile;