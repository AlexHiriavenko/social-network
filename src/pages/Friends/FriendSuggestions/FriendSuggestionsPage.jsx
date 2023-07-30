// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { getFriendshipRequests, createFriendship } from "../../../redux/friends/actionCreators";
import SideBarFriends from "../SideBarFriends";
import { Profile } from "../../index";
import { setCurrentFriend, removeSuggestions } from "../../../redux/friends/friends.slise";
import FriendEmptyPage from  "../FriendEmptyPage";

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


    const handleClickAdd = (friendId) => {
        console.log(friendId);
        dispatch(createFriendship({friendId: friendId}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        console.log("handleClickRemoveSuggestion")
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
        </Box>
    )
}

export default FriendSuggestionsPage;