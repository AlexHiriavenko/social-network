import { setCurrentFriend } from '../../redux/friends/friends.slise';
import { setFriends, setUser, getUser, getFriends } from "../../redux/user.slice/user.slice";
import { getFriendshipRequests } from "../../redux/friends/actionCreators";


export const handleLinkClick = (dispatch, friend, authUser) => {
    const id = friend.id;
    dispatch(setCurrentFriend({}));
    dispatch(setUser({}));

    // get user friends
    const userFriendsResponse = dispatch(getFriends(id));
    userFriendsResponse
        .then((data) => {
            const friends = data.payload.filter(el => el.status === 'accepted');
            dispatch(setFriends(friends));
            localStorage.setItem("friends", JSON.stringify(friends));
        })
        .catch((error) => console.log(error.message));

    // checking if the user is authorized
    if (id === authUser.id) {
        dispatch(setUser(authUser));
        localStorage.setItem("user", JSON.stringify(authUser));
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        const userResponse = dispatch(getUser(id));
        userResponse
            .then((data) => {
                dispatch(setUser(data.payload));
                localStorage.setItem("user", JSON.stringify(data.payload));
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => error.message);
    }
    dispatch(setCurrentFriend(friend));
    dispatch(getFriendshipRequests());
}
