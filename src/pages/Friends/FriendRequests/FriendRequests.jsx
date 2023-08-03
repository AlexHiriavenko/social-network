// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getFriendshipRequests, updateFriendship } from '../../../redux/friends/actionCreators';
import { useTheme } from '@mui/material/styles';
import SideBarFriends from "../SideBarForFriends";
import { Profile } from '../../index';
import { setCurrentFriend, } from '../../../redux/friends/friends.slise';
import FriendEmptyPage from  '../FriendEmptyPage';


function FriendRequests(){

    
    const dispatch = useDispatch(); 
    const theme = useTheme();

    const user = useSelector((store)=>store.user.authorizedUser);
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests);
    const currentFriend = useSelector((store)=>store.friends.currentFriend);

    const friendsRequestsToUser = (friendsRequests.length > 0 
        ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== user.id)
        : []);

    const requestsCount = friendsRequestsToUser.length === 0 ? '' : friendsRequestsToUser.length;

    useEffect(()=>{
        if(friendsRequestsToUser.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[friendsRequests, dispatch, friendsRequestsToUser.length])

    useEffect(()=>{
        dispatch(getFriendshipRequests());
        return () => {
            dispatch(setCurrentFriend({}));
          };
    },[dispatch])

    const handleClickConfirm = (friend) => {
        const payload = {id: friend.id, status: "accepted", userID: user.id,  friendID: friend.friend.id}
        dispatch(updateFriendship(payload));
    }

    const handleClickRemove = (friend) => {
        const payload = {id: friend.id, status: "rejected", userID: user.id,  friendID: friend.friend.id}
        dispatch(updateFriendship(payload));
    }
    
    const SectionWraper = styled(Box)(({theme}) => ({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 20, 
        backgroundColor: theme.palette.backgroundColor.page,
    }))

    const LinkStyled = styled(NavLink)(({theme}) => ({
        fontFamily: 'inherit',
        fontSize: '.8125rem',
        fontWeight: 400,
        lineHeight: 1.2308,
        paddingBottom: 1,
        textDecoration: 'none',
        color: theme.palette.textColor.blueLink,
    }))

    const textMessage = friendsRequestsToUser.length > 0 
        ? "Select people`s names to preview their profile." 
        : "When you have friend requests, you`ll see them here.";

    const noItemMessage = "No new requests";

    const additionItems = (
        <LinkStyled to="#">View sent requests</LinkStyled>
    )

    return(
        <Box sx={{ width: '100%', display: 'flex', }}>
            <SideBarFriends sideBarItems={friendsRequestsToUser}
                                headerTitle={"Friend requests"}
                                subTitle={`${requestsCount} Friend requests`}
                                additionItems={additionItems}
                                noItemMessage={noItemMessage}
                                handleClickConfirm={handleClickConfirm}
                                handleClickRemove={handleClickRemove}
                                isAvatarMutualFriend={true}
                                isRemoveButton={true}
                                isConfirmButton={true}/>
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

export default FriendRequests;