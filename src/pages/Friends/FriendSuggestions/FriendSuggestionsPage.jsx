// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFriendship, getFriendSuggestionsPage } from "../../../redux/friends/actionCreators";
import { setCurrentFriend, setFriendsSuggestions } from "../../../redux/friends/friends.slise";
import SideBarFriends from "../SideBarForFriends";
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { setUser } from "../../../redux/user.slice/user.slice";
import FriendProfileML from '../FriendProfileML';
import FriendProfileS from '../FriendProfileS';

function FriendSuggestionsPage() {

    const dispatch = useDispatch(); 

    const user = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);
    const isLoadingSuggestions = useSelector((store)=>store.friends.isLoadingSuggestions, shallowEqual);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(()=>{
        setDrawerOpen(currentFriend.id ? true : false);
        if(friendSuggestions.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[friendSuggestions, dispatch])

    useEffect(()=>{
        //dispatch(setFriendsSuggestions([]));
        //dispatch(getFriendSuggestions());
        return () => {
            dispatch(setCurrentFriend({}));
          };
    },[dispatch])


    const handleClickAdd = (friend) => {
        if(user.id === friend.id) {
            dispatch(setCurrentFriend({}));
            dispatch(setUser({}));
        }
        dispatch(createFriendship({friendID: friend.friend.id}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        if(user.id === payload.friend.id) {
            dispatch(setCurrentFriend({}));
            dispatch(setUser({}))
        }
        dispatch(createFriendship({status: 'removed', friendID: payload.friend.id }));
    }

    const textMessage = friendSuggestions.length > 0 
        ? "Select people`s names to preview their profile." 
        : "When you have friend suggestions, you`ll see them here.";

    const noItemMessage = "No new suggestions";

    return(
        <PageBoxFriendsWrapper>
            <PageBoxFriends>
                <SideBarFriends sideBarItems={friendSuggestions}
                                headerTitle={"Friend suggestions"}
                                subTitle={"People You May Know"}
                                noItemMessage={noItemMessage}
                                handleClickConfirm={handleClickAdd}
                                handleClickRemove={handleClickRemoveSuggestion}
                                isAvatarMutualFriend={true}
                                isRemoveButton={true}
                                isAddButton={true}
                                openDrawer={setDrawerOpen}
                                getDataList={getFriendSuggestionsPage}
                                isLoading={isLoadingSuggestions}/>
                    <FriendProfileML currentFriend={currentFriend} 
                                textMessage={textMessage}/>
                    <FriendProfileS drawerOpen={drawerOpen} 
                                setDrawerOpen={setDrawerOpen} 
                                currentFriend={currentFriend} 
                                subtitleText={"Friends Suggestions"}/>
            </PageBoxFriends>
        </PageBoxFriendsWrapper>
    )
}

export default FriendSuggestionsPage;