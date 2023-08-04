// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { getFriendList } from "../../../redux/friends/actionCreators";
import SideBarFriends from "../SideBarForFriends";
import { Profile } from "../../index";
import { setCurrentFriend } from "../../../redux/friends/friends.slise";
import FriendEmptyPage from  "../FriendEmptyPage";
import { setUser } from "../../../redux/user.slice/user.slice";

function UserFriendsPage() {

    const dispatch = useDispatch(); 
    const user = useSelector((store)=>store.user.authorizedUser);
    const friends = useSelector((store)=>store.friends.friendsList);
    const currentFriend = useSelector((store)=>store.friends.currentFriend);
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
          };
    },[dispatch])

    const SectionWraper = styled(Box)(({theme}) => ({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 20, 
        backgroundColor: theme.palette.backgroundColor.page,
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