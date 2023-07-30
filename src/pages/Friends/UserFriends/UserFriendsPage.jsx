import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { getFriendList } from '../../../redux/friends/actionCreators';
import SideBarFriends from '../SideBarFriends';
import { Profile } from '../../index';
import { setCurrentFriend } from '../../../redux/friends/friends.slise';
import FriendEmptyPage from  '../FriendEmptyPage';

function UserFriendsPage() {

    const dispatch = useDispatch(); 
    const userFriends = useSelector((store)=>store.friends.friendsList);
    const currentFriend = useSelector((store)=>store.friends.currentFriend);

    const friendsCount = userFriends.length === 0 ? null : userFriends.length;

    useEffect(()=>{
        if(userFriends.length === 0) {
            dispatch(setCurrentFriend({}));
        } 
    },[userFriends, dispatch])

    useEffect(()=>{
        dispatch(getFriendList());
        return () => {
            dispatch(setCurrentFriend({}));
          };
    },[])

    const SectionWraper = styled(Box)(({theme}) => ({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 20, 
        backgroundColor: theme.palette.backgroundColor.page/* '#F0F2F5' */,
    }))

    const textMessage = getFriendList.length > 0 
    ? "Select people`s names to preview their profile." 
    : "When you have any friend, you`ll see them here.";

    const noItemMessage = "No friends yet.";

    return(
        <Box sx={{ width: '100%', display: 'flex', }}>
            <SideBarFriends sideBarItems={userFriends}
                                headerTitle={"All Friends"}
                                subTitle={`${friendsCount} Friends`}
                                noItemMessage={noItemMessage}
                                isAvatarMutualFriend={false}/>
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

export default UserFriendsPage;