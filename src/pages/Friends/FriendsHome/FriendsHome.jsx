import {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { getFriendshipRequests, getFriendListPage, getFriendList, getFriendshipRequestsPage, getFriendSuggestionsPage,  createFriendship, updateFriendship } from '../../../redux/friends/actionCreators';
import { setCurrentFriend, setFriendsSuggestions, setFriendsList } from '../../../redux/friends/friends.slise';
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

    const [isFetching, setIsFetching] = useState(true);
    const [page, setPage] = useState(0);
    const isLoading = useSelector((store)=>store.friends.isLoading, shallowEqual);
    const size = 10;

    useEffect(()=>{
        //dispatch(getFriendList());
        dispatch(setFriendsSuggestions([]))
        console.log(friendsRequests)
        console.log(friendsRequestsToUser)
        console.log(friendSuggestions)
        dispatch(setFriendsList([]));
        dispatch(getFriendListPage({page: 0, size}))
        dispatch(getFriendshipRequests());
/*         dispatch(getFriendSuggestionsPage({page: 0, size})) */
        //dispatch(getFriendSuggestions());
        dispatch(setCurrentFriend({}));
/*         dispatch(getFriendSuggestionsPage({page, size}));
        setPage(page+1); */
    },[dispatch])

    useEffect(() => {
        if(isFetching && !isLoading ) {
            dispatch(getFriendSuggestionsPage({page, size}));
            setPage(page+1);
            setIsFetching(false);
        }
    },[isFetching, dispatch]);

    function handleScroll(e) {
        if (e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight) < 100 && !isLoading) {
            setIsFetching(true);
        }
      }

    const handleClickConfirm = (friend) => {
        const payload = {id: friend.id, status: "accepted"}
        dispatch(updateFriendship(payload));
    }

    const handleClickRemove = (friend) => {
        const payload = {id: friend.id, status: "rejected"}
        dispatch(updateFriendship(payload));
    }
    const handleClickAdd = (friendId) => {
        dispatch(createFriendship({friendID: friendId}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        dispatch(createFriendship({status: 'removed', friendID: payload.friend.id }));
    }

    const handleClickLinklocal = (friend) => {
        handleLinkClick(dispatch, friend, authUser);
    }

    console.log(friendSuggestions)

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
                handleClickRemoveSuggestion={handleClickRemoveSuggestion}
                handleScroll={handleScroll}/>
    </PageBoxFriendsWrapper>
    );
}

export default FriendsHome;