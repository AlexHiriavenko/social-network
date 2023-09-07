import {
    getFriends,
    setFriends,
    setUser,
    getUser,
} from "../../../../redux/user.slice/user.slice";
import { toggleVisible } from "../../../../redux/searchDrawer.slice/headerSearch.slice";

export function lookUserPage(dispatch, id, authUser) {
    const userFriendsResponse = dispatch(getFriends(id));
    userFriendsResponse
        .then((data) => {
            dispatch(setFriends(data.payload));
            localStorage.setItem("friends", JSON.stringify(data.payload));
        })
        .catch((error) => console.log(error.message));

    if (id === authUser.id) {
        dispatch(setUser(authUser));
        localStorage.setItem("user", JSON.stringify(authUser));
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        const lookedUser = dispatch(getUser(id));
        lookedUser
            .then((data) => {
                dispatch(setUser(data.payload));
                localStorage.setItem("user", JSON.stringify(data.payload));
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => console.log(error.message));
    }
    dispatch(toggleVisible());
}
