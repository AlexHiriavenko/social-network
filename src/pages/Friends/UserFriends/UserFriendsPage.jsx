// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { getFriendList, getFriendsByName } from "../../../redux/friends/actionCreators";
import SideBarFriends from "../SideBarForFriends";
import { Profile } from "../../index";
import { setCurrentFriend, setSearchValue, removeFriend } from "../../../redux/friends/friends.slise";
import FriendEmptyPage from  "../FriendEmptyPage";
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { updateFriendship } from '../../../redux/friends/actionCreators';
import { setUser } from "../../../redux/user.slice/user.slice";


function UserFriendsPage() {

    const dispatch = useDispatch();
    const inputValue = useSelector((store)=>store.friends.searchValue, shallowEqual);
    const friends = useSelector((store)=>store.friends.friendsList, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);
    const userFriends = (friends.length > 0 
        ? friends.filter((elem) => elem.status==='accepted')
        : []);

    const friendsCount = userFriends.length === 0 ? '' : userFriends.length;

    useEffect(()=>{
        if(friends.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[friends, dispatch])

    useEffect(()=>{
        dispatch(getFriendList());
        return () => {
            dispatch(setCurrentFriend({}));
            dispatch(setSearchValue(''));
          };
    },[dispatch])

    const handleChangeValue = useCallback((value) => {
        if(inputValue === value){
            return;
        }
        dispatch(setSearchValue(value));
        dispatch(getFriendsByName({friendName: value}));
    }, [dispatch, inputValue])

    const handleClickUnfriend = useCallback((friend) => {
        const payload = {id: friend.id, status: "unfriended"}
        dispatch(updateFriendship(payload));
        dispatch(removeFriend(friend.friend.id));
        dispatch(setCurrentFriend({}));
        dispatch(setUser({}));
    }, [dispatch])

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

    const textMessage = getFriendList.length > 0 
    ? "Select people`s names to preview their profile." 
    : "When you have any friend, you`ll see them here.";

    const noItemMessage = "No friends yet.";

    return(
        <PageBoxFriendsWrapper>
            <PageBoxFriends>
                <SideBarFriends sideBarItems={userFriends}
                                    headerTitle={"All Friends"}
                                    subTitle={`${friendsCount} Friends`}
                                    noItemMessage={noItemMessage}
                                    isAvatarMutualFriend={false}
                                    search={true}
                                    handleChangeValue={handleChangeValue} 
                                    placeholderText='Search Friends'
                                    initialValue={inputValue}
                                    isMoreMenuButton={true}
                                    handleClickUnfriend={handleClickUnfriend}/>
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

export default UserFriendsPage;