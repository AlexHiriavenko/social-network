// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { getFriendSuggestions, createFriendship } from "../../../redux/friends/actionCreators";
import { setCurrentFriend, removeSuggestions } from "../../../redux/friends/friends.slise";
import { Profile } from "../../index";
import SideBarFriends from "../SideBarForFriends";
import FriendEmptyPage from  "../FriendEmptyPage";
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { setUser } from "../../../redux/user.slice/user.slice";

function FriendSuggestionsPage() {

    const dispatch = useDispatch(); 

    const user = useSelector((store)=>store.user.user, shallowEqual);
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);

    useEffect(()=>{
        if(friendSuggestions.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[friendSuggestions, dispatch])

    useEffect(()=>{
        dispatch(getFriendSuggestions());
        return () => {
            dispatch(setCurrentFriend({}));
          };
    },[dispatch])


    const handleClickAdd = (friend) => {
        if(user.id === friend.id) {
            dispatch(setCurrentFriend({}));
            dispatch(setUser({}));
        }
        dispatch(createFriendship({friendId: friend.friend.id}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        console.log(payload);
        if(user.id === payload.friend.id) {
            dispatch(setCurrentFriend({}));
            dispatch(setUser({}))
        }
        dispatch(removeSuggestions(payload));
    }
    

    const SectionWraper = styled(Box)(({theme}) => ({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 20, 
        backgroundColor: theme.palette.backgroundColor.page,
        height: '100%',
        boxSizing: 'content-box',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingBottom: 0,
        paddingTop: 0,
        "&::-webkit-scrollbar": {
            width: "0",
          },
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
                <SectionWraper>
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