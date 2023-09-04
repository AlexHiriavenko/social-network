import {
    getFriends,
    setFriends,
    setUser,
    getUser,
} from "../../../redux/user.slice/user.slice";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
///
export const setChatParticipant = (participants, id) => {
    const user = participants.find((participant) => participant.id === id);
    return user ? user : participants[0];
};
///
export const isAuthUser = (authUserID, userId) => authUserID === userId;
///
export function lookFriendPage(dispatch, location, id, authUser, closeMenu) {
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
        const lookedFriend = dispatch(getUser(id));
        lookedFriend
            .then((data) => {
                dispatch(setUser(data.payload));
                localStorage.setItem("user", JSON.stringify(data.payload));
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => console.log(error.message));
    }
    dispatch(resetCurrentChat());
    if (location.pathname !== "/chats") {
        closeMenu();
    }
}
