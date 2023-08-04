// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { getFriendshipRequests, createFriendship } from "../../../redux/friends/actionCreators";
import { setCurrentFriend, removeSuggestions } from "../../../redux/friends/friends.slise";
import { Profile } from "../../index";
import SideBarFriends from "../SideBarForFriends";
import FriendEmptyPage from  "../FriendEmptyPage";
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { setUser } from "../../../redux/user.slice/user.slice";

function FriendSuggestionsPage() {

    const dispatch = useDispatch(); 
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions);
    const currentFriend = useSelector((store)=>store.friends.currentFriend);

    useEffect(()=>{
        if(friendSuggestions.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[friendSuggestions, dispatch])

    useEffect(()=>{
        dispatch(getFriendshipRequests());
        return () => {
            dispatch(setCurrentFriend({}));
          };
    },[dispatch])


    const handleClickAdd = (friend) => {
        dispatch(createFriendship({friendId: friend.friend.id}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        dispatch(removeSuggestions(payload));
    }
    

    const SectionWraper = styled(Box)(({theme}) => ({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 20, 
        backgroundColor: theme.palette.backgroundColor.page/* '#F0F2F5' */,
    }))

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
                                    isAddButton={true}/>
                <SectionWraper sx={{minHeight: '93vh'}}>
                    { 
                        currentFriend.id === undefined && <FriendEmptyPage>{textMessage}</FriendEmptyPage>
                    }
                    {
                        !(currentFriend.id === undefined) && <Profile/>
                    }
                </SectionWraper>
            </PageBoxFriends>
        </PageBoxFriendsWrapper>
    )
}

export default FriendSuggestionsPage;