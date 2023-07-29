import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { 
    getFriendshipRequests,
    updateFriendship,
    createFriendship
} from '../../../redux/friends/actionCreators';
import { useTheme } from '@mui/material/styles';
import SideBarFriends from '../SideBarFriends';
import UserPage from '../../UserPage/UserPage';
import { setCurrentFriend, removeSuggestions } from '../../../redux/friends/friends.slise';
import FriendEmptyPage from  '../FriendEmptyPage';

function FriendSuggestionsPage() {

    const userID = 1;

    const dispatch = useDispatch(); 
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions);
    const currentFriend = useSelector((store)=>store.friends.currentFriend);

    console.log(friendSuggestions);

    useEffect(()=>{
        if(friendSuggestions.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[friendSuggestions, dispatch])

    useEffect(()=>{
        dispatch(getFriendshipRequests(userID));
        return () => {
            dispatch(setCurrentFriend({}));;
          };
    },[])

    const handleClickAdd = (userId, friendId) => {
        console.log(friendId);
        dispatch(createFriendship({userId: userId, friendId: friendId}));
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
        <Box sx={{ width: '100%', display: 'flex', }}>
            <SideBarFriends sideBarItems={friendSuggestions}
                                headerTitle={"Friend requests"}
                                subTitle={"Friend suggestions"}
                                noItemMessage={noItemMessage}
                                handleClickConfirm={handleClickAdd}
                                handleClickRemove={handleClickRemoveSuggestion}
                                isRemoveButton={true}
                                isAddButton={true}/>
            <SectionWraper sx={{minHeight: '93vh'}}>
                { 
                    currentFriend.id === undefined && <FriendEmptyPage>{textMessage}</FriendEmptyPage>
                }
                {
                    !(currentFriend.id === undefined) && <UserPage/>
                }
            </SectionWraper>
        </Box>
    )
}

export default FriendSuggestionsPage;