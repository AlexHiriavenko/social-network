import { useEffect, useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFriendList, getFriendsByName } from "../../../redux/friends/actionCreators";
import SideBarFriends from "../SideBarForFriends";
import { setCurrentFriend, removeFriend } from "../../../redux/friends/friends.slise";
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import { updateFriendship } from '../../../redux/friends/actionCreators';
import { setUser } from "../../../redux/user.slice/user.slice";
import FriendProfileML from '../FriendProfileML';
import FriendProfileS from '../FriendProfileS';


function UserFriendsPage() {

    const dispatch = useDispatch();
    const friends = useSelector((store)=>store.friends.friendsList, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);
    const userFriends = (friends.length > 0 
        ? friends.filter((elem) => elem.status==='accepted')
        : []);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const friendsCount = userFriends.length === 0 
        ? '' 
        : userFriends.length === 1
            ? `${userFriends.length} Friend`
            : `${userFriends.length} Friends`;

    useEffect(()=>{
        setDrawerOpen(currentFriend.id ? true : false);
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

    const handleChangeValue = useCallback((value) => {
        dispatch(getFriendsByName({friendName: value}));
    }, [dispatch])

    const handleClickUnfriend = useCallback((friend) => {
        const payload = {id: friend.id, status: "unfriended"}
        dispatch(updateFriendship(payload));
        dispatch(removeFriend(friend.friend.id));
        dispatch(setCurrentFriend({}));
        dispatch(setUser({}));
    }, [dispatch])

    const textMessage = getFriendList.length > 0 
        ? "Select people`s names to preview their profile." 
        : "When you have any friend, you`ll see them here.";

    const noItemMessage = "No friends yet.";

    return(
        <PageBoxFriendsWrapper>
            <PageBoxFriends>
                <SideBarFriends sideBarItems={userFriends}
                                headerTitle={"All Friends"}
                                subTitle={friendsCount}
                                noItemMessage={noItemMessage}
                                isAvatarMutualFriend={false}
                                search={true}
                                handleChangeValue={handleChangeValue} 
                                placeholderText='Search Friends'
                                isMoreMenuButton={true}
                                handleClickUnfriend={handleClickUnfriend}
                                openDrawer={setDrawerOpen}/>
                    <FriendProfileML currentFriend={currentFriend} 
                                textMessage={textMessage}/>
                    <FriendProfileS drawerOpen={drawerOpen} 
                                setDrawerOpen={setDrawerOpen} 
                                currentFriend={currentFriend} 
                                subtitleText={"All Friends"}/>
            </PageBoxFriends>
        </PageBoxFriendsWrapper>
    )
}

export default UserFriendsPage;