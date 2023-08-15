// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Friend from "../../../components/Friends/Friend/Friend";
import { Box, Divider, Typography } from "@mui/material";
import { ButtonStyled } from '../../../components/StyledComponents/Buttons';
import { getFriendList, getFriendshipRequests, getFriendSuggestions,  createFriendship, updateFriendship } from '../../../redux/friends/actionCreators';
import { removeSuggestions, setCurrentFriend, } from '../../../redux/friends/friends.slise';
import styled from "@emotion/styled";
import SideBarList from '../SideBarList'
import SideBarHeader from '../../../components/Friends/SideBar/SideBarHeader';
import { NavLink } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import {PageBoxFriends, PageBoxFriendsWrapper} from '../../../components/StyledComponents/PageBoxFriends';
import {SidebarStyled} from '../../../components/StyledComponents/SideBarFriends'
import { setFriends, setUser, getUser, getFriends } from "../../../redux/user.slice/user.slice";


function FriendsHome() {

    const user = useSelector((store)=>store.user.authorizedUser, shallowEqual);

    const dispatch = useDispatch();
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests, shallowEqual);
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions, shallowEqual);
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const friendsRequestsToUser = (friendsRequests.length > 0 
                                ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== user.id)
                                : []);

    useEffect(()=>{
        dispatch(getFriendList());
        dispatch(getFriendshipRequests());
        dispatch(getFriendSuggestions());
    },[dispatch])

    const handleClickConfirm = (friend) => {
        const payload = {id: friend.id, status: "accepted"}
        dispatch(updateFriendship(payload));
    }

    const handleClickRemove = (friend) => {
        const payload = {id: friend.id, status: "rejected"}
        dispatch(updateFriendship(payload));
    }
    const handleClickAdd = (friendId) => {
        dispatch(createFriendship({friendId: friendId}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        dispatch(removeSuggestions(payload));
    }

/*     const handleLinkClick = (payload) => {
        dispatch(setUser(payload));
        dispatch(setCurrentFriend(payload));
    } */
    const handleLinkClick = (friend) => {
        const id  = friend.id;
        dispatch(setCurrentFriend({}));
        dispatch(setUser({}));

        // get user friends
    const userFriendsResponse = dispatch(getFriends(id));
        userFriendsResponse
            .then((data) => {
                const friends = data.payload.filter(el => el.status === 'accepted');
                dispatch(setFriends(friends));
                localStorage.setItem("friends", JSON.stringify(friends));
            })
            .catch((error) => console.log(error.message));

        // checking if the user is authorized
        if (id === authUser.id) {
            dispatch(setUser(authUser));
            localStorage.setItem("user", JSON.stringify(authUser));
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const userResponse = dispatch(getUser(id));
            userResponse
            .then((data) => {
                dispatch(setUser(data.payload));
                localStorage.setItem("user", JSON.stringify(data.payload));
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => error.message);
        }
        dispatch(setCurrentFriend(friend));
    }

    const SectorTitle = styled(Typography)(({theme}) => ({
        padding: '16px 4px',
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: 1.2,
        textAlign: 'left',
        color: theme.palette.textColor.content
    }))

    const SectorHeader = styled(Box)({
        width:'100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    })

    const FriendsContainer = styled(Box)({
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    }) 

    const SectionWraper = styled(Box)(({theme}) => ({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        paddingTop: 0,
        height: '100%',
        boxSizing: 'content-box',
        overflowY: 'scroll',
        overflowX: 'hidden',
        backgroundColor: theme.palette.backgroundColor.page,
        "&::-webkit-scrollbar": {
            width: 0,
          },
    }))

    const H1Styled = styled('h1')(({theme}) => ({
        fontWeight: 900,
        fontSize: '1.5rem',
        fontFamily: 'inherit',
        color: theme.palette.textColor.content,
    }))

    const LinkStyled = styled(NavLink)(({theme}) => ({
        fontFamily: 'inherit',
        fontSize: '1.0625rem',
        fontWeight: 400,
        lineHeight: 1.1765,
        paddingBottom: 1,
        color: theme.palette.textColor.blueLink,
        textDecoration: 'none'
    }))

    const theme = useTheme();

    return (<>
    <PageBoxFriendsWrapper>
        <PageBoxFriends>
            <SidebarStyled >
                <SideBarHeader>
                    <H1Styled>Friends</H1Styled>
                </SideBarHeader>
                <SideBarList  activeItem={"Home"}/>
            </SidebarStyled>         
            <SectionWraper>
            {friendsRequestsToUser.length > 0 && <Box sx={{px: '16px'}}>
                    <SectorHeader>
                        <SectorTitle>Friend requests</SectorTitle>
                        <LinkStyled to="/friends/requests">See All</LinkStyled>
                    </SectorHeader>
                    <FriendsContainer>
                    {
                        friendsRequestsToUser.map(fr => <Friend 
                            key={fr.id}
                            referenseForLinks={"/friends/requests/"}
                            handleLinkClick={handleLinkClick}
                            mutualFriends={fr.mutualFriends}
                            isAvatarMutualFriend={true}
                            friend={fr.user} 
                            addButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.primary}} 
                                variant="contained" 
                                onClick={() => handleClickConfirm(fr)}>Confirm</ButtonStyled>}
                            removeButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                                color: theme.palette.textColor.content,
                                '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover}}} 
                                onClick={() => handleClickRemove(fr)}>Remove</ButtonStyled>}/>)
                    }
                    </FriendsContainer>
                </Box>}
                {friendSuggestions.length > 0 && friendsRequestsToUser.length > 0 
                    && <Divider sx={{ my: '12px', borderColor: theme.palette.border.card}}/>}
                {friendSuggestions.length > 0 && <Box sx={{px: '16px'}}>
                    <SectorHeader>
                        <SectorTitle>People you may know</SectorTitle>
                        <LinkStyled to="/friends/suggestions">See All</LinkStyled>
                    </SectorHeader>
                    <FriendsContainer>
                    {
                        friendSuggestions &&  friendSuggestions.map(fr => <Friend 
                            key={fr.friend.id}
                            referenseForLinks={"/friends/suggestions/"}
                            handleLinkClick={() => handleLinkClick(fr.friend)}
                            mutualFriends={fr.mutualFriends}
                            isAvatarMutualFriend={true}
                            friend={fr.friend} 
                            addButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.blueLight,
                                '&:hover': {backgroundColor: theme.palette.buttonColor.blueLightHover,},
                                color: theme.palette.textColor.blueLink}} onClick={() => handleClickAdd( fr.friend.id)}>Add friend</ButtonStyled>}
                            removeButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                                '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},
                                color: theme.palette.textColor.content}}
                                onClick={() =>  handleClickRemoveSuggestion(fr)}>Remove</ButtonStyled>}/>)
                    }
                    </FriendsContainer>
                </Box>}
            </SectionWraper>
        </PageBoxFriends>
    </PageBoxFriendsWrapper>
    </>
    );
}

export default FriendsHome;