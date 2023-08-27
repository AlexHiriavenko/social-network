import {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { getFriendList, getFriendshipRequests, getFriendSuggestions,  createFriendship, updateFriendship } from '../../../redux/friends/actionCreators';
import { removeSuggestions, } from '../../../redux/friends/friends.slise';
import { PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { handleLinkClick } from '../handleClickLink';
import FriendsHomeLM from './FriendsHomeLM';
import FriendsHomeS from './FriendsHomeS';


function FriendsHome() {

    const user = useSelector((store)=>store.user.authorizedUser, shallowEqual);

    const dispatch = useDispatch();
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests, shallowEqual);
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions, shallowEqual);
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const friendsRequestsToUser = (friendsRequests.length > 0 
                                ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== user.id)
                                : []);

    useEffect(()=>{
        dispatch(getFriendList());
        dispatch(getFriendshipRequests());
        dispatch(getFriendSuggestions());
    },[dispatch])

    const handleClickConfirm = (friend) => {
        const payload = {id: friend.id, status: "accepted"}
        dispatch(updateFriendship(payload));
    }

    const handleClickRemove = (friend) => {
        const payload = {id: friend.id, status: "rejected"}
        dispatch(updateFriendship(payload));
    }
    const handleClickAdd = (friendId) => {
        dispatch(createFriendship({friendId: friendId}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        dispatch(removeSuggestions(payload));
    }

    const handleClickLinklocal = (friend) => {
        handleLinkClick(dispatch, friend, authUser);
    }

    return (
    <PageBoxFriendsWrapper >
            <FriendsHomeLM 
            friendsRequestsToUser={friendsRequestsToUser}
            friendSuggestions={friendSuggestions}
            handleClickLinklocal={handleClickLinklocal} 
            handleClickConfirm={handleClickConfirm} 
            handleClickRemove={handleClickRemove}
            handleClickAdd={handleClickAdd}
            handleClickRemoveSuggestion={handleClickRemoveSuggestion}/>
            <FriendsHomeS            
            friendsRequestsToUser={friendsRequestsToUser}
            friendSuggestions={friendSuggestions}
            handleClickLinklocal={handleClickLinklocal} 
            handleClickConfirm={handleClickConfirm} 
            handleClickRemove={handleClickRemove}
            handleClickAdd={handleClickAdd}
            handleClickRemoveSuggestion={handleClickRemoveSuggestion}/>
    </PageBoxFriendsWrapper>
    );
}

export default FriendsHome;