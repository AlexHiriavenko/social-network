// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { getFriendList } from "../../../redux/friends/actionCreators";
import SideBarFriends from "../SideBarForFriends";
import { Profile } from "../../index";
import { setCurrentFriend } from "../../../redux/friends/friends.slise";
import FriendEmptyPage from  "../FriendEmptyPage";
<<<<<<< HEAD
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
=======
import { setUser } from "../../../redux/user.slice/user.slice";
>>>>>>> develop

function UserFriendsPage() {

    const dispatch = useDispatch(); 
    //const user = useSelector((store)=>store.user.authorizedUser);
    const friends = useSelector((store)=>store.friends.friendsList, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);
    const userFriends = (friends.length > 0 
        ? friends.filter((elem) => elem.status==='accepted')
        : []);

        console.log(friends);
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
                                    isAvatarMutualFriend={false}/>
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