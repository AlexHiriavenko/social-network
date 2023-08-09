// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Friend from "../../../components/Friends/Friend/Friend";
import { Box, Divider, Typography } from "@mui/material";
import {GreyButton, BlueButton, StandardButton} from '../../../components/StyledComponents/Buttons';
import { getFriendList, getFriendshipRequests, getFriendSuggestions,  createFriendship, updateFriendship } from '../../../redux/friends/actionCreators';
import { removeSuggestions, setCurrentFriend, } from '../../../redux/friends/friends.slise';
import styled from "@emotion/styled";
import SideBarList from '../SideBarList'
import Sidebar from "../../../components/Sidebar/Sidebar";
import SideBarHeader from '../../../components/Friends/SideBar/SideBarHeader';
import { NavLink } from "react-router-dom";
import { setUser } from "../../../redux/user.slice/user.slice";
import { useTheme } from '@mui/material/styles';

function FriendsHome() {

    const user = useSelector((store)=>store.user.authorizedUser);

    const dispatch = useDispatch();
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests);
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions);
    const friendsRequestsToUser = (friendsRequests.length > 0 
                                ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== user.id)
                                : []);

    useEffect(()=>{
        dispatch(getFriendList(user.id));
        dispatch(getFriendshipRequests(user.id));
        dispatch(getFriendSuggestions(user.id));
    },[dispatch, user.id])

    const handleClickConfirm = (friend) => {
        const payload = {id: friend.id, status: "accepted", userID: friend.user.id, friendID: friend.friend.id}
        dispatch(updateFriendship(payload));
    }

    const handleClickRemove = (friend) => {
        const payload = {id: friend.id, status: "rejected", userID: friend.user.id,  friendID: friend.friend.id}
        dispatch(updateFriendship(payload));
    }
    const handleClickAdd = (friendId) => {
        console.log(friendId);
        dispatch(createFriendship({friendId: friendId}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        dispatch(removeSuggestions(payload));
    }

    const handleLinkClick = (payload) => {
        dispatch(setUser(payload));
        dispatch(setCurrentFriend(payload));
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
        padding: 20, 
        backgroundColor: theme.palette.backgroundColor.page/* '#F0F2F5' */,
    }))

    const H1Styled = styled('h1')({
        fontWeight: 900,
        fontSize: '1.5rem',
        fontFamily: 'inherit',
    })

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
        <Box sx={{ width: '100%', display: 'flex', minHeight: '93vh'}}>
            <Sidebar>
                <SideBarHeader>
                    <H1Styled>Friends</H1Styled>
                </SideBarHeader>
                <SideBarList/>
            </Sidebar>         
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
                            addButton={<StandardButton variant="contained" onClick={() => handleClickConfirm(fr)}>Confirm</StandardButton>}
                            removeButton={<GreyButton onClick={() => handleClickRemove(fr)}>Remove</GreyButton>}/>)
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
                            handleLinkClick={handleLinkClick}
                            mutualFriends={fr.mutualFriends}
                            isAvatarMutualFriend={true}
                            friend={fr.friend} 
                            /* addButton={<Button sx={{bgcolor: 'secondary.main', width: 1, '&:hover': {bgcolor: 'secondary.light'}, textTransform: 'none'}} 
                                                    onClick={handleClickConfirm}>Add friend</Button>} */
                            addButton={<BlueButton onClick={() =>  handleClickAdd( fr.friend.id)}>Add friend</BlueButton>}
                            removeButton={<GreyButton /* bgColor={theme.palette.buttonColor.background}
                                                    hoverBgColor={theme.palette.buttonColor.backgroundHover}
                                                    color={"#cdcfd3"}/* theme.palette.textColor.main */
                                                    onClick={() =>  handleClickRemoveSuggestion(fr)}
                                                    >Remove</GreyButton>}/>)
                    }
                    </FriendsContainer>
                </Box>}
            </SectionWraper>
        </Box>
    </>
    );
}

export default FriendsHome;