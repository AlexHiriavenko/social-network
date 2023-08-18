// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getFriendshipRequests, updateFriendship } from '../../../redux/friends/actionCreators';
import SideBarFriends from "../SideBarForFriends";
import { Profile } from '../../index';
import { setCurrentFriend, } from '../../../redux/friends/friends.slise';
import FriendEmptyPage from  '../FriendEmptyPage';
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { openSentFriendRequests, closeSentFriendRequests } from  '../../../redux/modal.slice/modal.slice';
import SentFriendRequestsModal from '../../../components/Modals/SentFriendRequestsModal/SentFriendRequestsModal';
import { setUser } from "../../../redux/user.slice/user.slice";

function FriendRequests(){

    const dispatch = useDispatch(); 

    const userAuth = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const user = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);

    const friendsRequestsToUser = (friendsRequests.length > 0 
        ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== userAuth.id)
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
            dispatch(closeSentFriendRequests());
          };
    },[dispatch])

    const handleClickConfirm = (friend) => {
        if(user.id === friend.id) {
            dispatch(setCurrentFriend({}));
            dispatch(setUser({}))
        }
        const payload = {id: friend.id, status: "accepted"}
        dispatch(updateFriendship(payload));
    }

    const handleClickRemove = (friend) => {
        if(user.id === friend.id) {
            dispatch(setCurrentFriend({}));
            dispatch(setUser({}))
        }
        const payload = {id: friend.id, status: "rejected"}
        dispatch(updateFriendship(payload));
    }

    const hadleOpenModal = () => {
        dispatch(openSentFriendRequests());
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

    const addItemsSubHead = (
        <LinkStyled to="#" onClick={hadleOpenModal}>View sent requests</LinkStyled>
    )

    return(
        <PageBoxFriendsWrapper>
            <PageBoxFriends>
                <SideBarFriends sideBarItems={friendsRequestsToUser}
                                    headerTitle={"Friend requests"}
                                    subTitle={`${requestsCount} Friend requests`}
                                    addItemsSubHead={addItemsSubHead}
                                    noItemMessage={noItemMessage}
                                    handleClickConfirm={handleClickConfirm}
                                    handleClickRemove={handleClickRemove}
                                    isAvatarMutualFriend={true}
                                    isRemoveButton={true}
                                    isConfirmButton={true}/>
                <SectionWraper>
                    { 
                        currentFriend.id === undefined && <FriendEmptyPage>{textMessage}</FriendEmptyPage>
                    }
                    {
                        !(currentFriend.id === undefined) && <Profile/>
                    }
                </SectionWraper>
            </PageBoxFriends>
            <SentFriendRequestsModal/>
        </PageBoxFriendsWrapper>
    )
}

export default FriendRequests;