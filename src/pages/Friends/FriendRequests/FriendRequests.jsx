// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { getFriendshipRequests, updateFriendship, getFriendshipRequestsPage } from '../../../redux/friends/actionCreators';
import SideBarFriends from "../SideBarForFriends";
import { setCurrentFriend, } from '../../../redux/friends/friends.slise';
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { openSentFriendRequests, closeSentFriendRequests } from  '../../../redux/modal.slice/modal.slice';
import SentFriendRequestsModal from '../../../components/Modals/SentFriendRequestsModal/SentFriendRequestsModal';
import { setUser } from "../../../redux/user.slice/user.slice";
import FriendProfileML from '../FriendProfileML';
import FriendProfileS from '../FriendProfileS';

function FriendRequests(){

    const dispatch = useDispatch(); 

    const userAuth = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const user = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);
    const isLoadingRequests = useSelector((store)=>store.friends.isLoadingRequests, shallowEqual);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const friendsRequestsToUser = (friendsRequests.length > 0 
        ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== userAuth.id)
        : []);

    const requestsCount = friendsRequestsToUser.length === 0 ? '' : friendsRequestsToUser.length;

    useEffect(()=>{
        setDrawerOpen(currentFriend.id ? true : false);
        if(friendsRequestsToUser.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[friendsRequests, dispatch, friendsRequestsToUser.length])

    useEffect(()=>{
        //dispatch(getFriendshipRequests());
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
                                    isConfirmButton={true}
                                    openDrawer={setDrawerOpen}
                                    getDataList={getFriendshipRequestsPage}
                                    isLoading={isLoadingRequests}/>
                <FriendProfileML currentFriend={currentFriend} 
                                    textMessage={textMessage}/>
                <FriendProfileS drawerOpen={drawerOpen} 
                                    setDrawerOpen={setDrawerOpen} 
                                    currentFriend={currentFriend} 
                                    subtitleText={"Friends Requests"}/>
            </PageBoxFriends>
            <SentFriendRequestsModal/>
        </PageBoxFriendsWrapper>
    )
}

export default FriendRequests;