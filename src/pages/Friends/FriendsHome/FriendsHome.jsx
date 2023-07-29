/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Friend from "../../../components/Friends/Friend/Friend";
import { Box, Divider, Typography, Link, Button } from "@mui/material";
import {GreyButton, BlueButton, StandardButton} from '../../../components/StyledComponents/Buttons';
import { 
    getFriendList, 
    getFriendshipRequests,
    getFriendSuggestions, 
    createFriendship, 
    updateFriendship,
} from '../../../redux/friends/actionCreators';
import { removeSuggestions, setCurrentFriend, } from '../../../redux/friends/friends.slise';
import styled from "@emotion/styled";
import SideBarList from '../SideBarList'
import Sidebar from "../../../components/Sidebar/Sidebar";
import SideBarHeader from '../../../components/Friends/SideBar/SideBarHeader';
import { NavLink } from "react-router-dom";
/* import { useTheme } from '@mui/material/styles'; */


function FriendsHome() {

    const userID = 1;

    const dispatch = useDispatch(); 
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests);
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions);
    const friendsRequestsToUser = (friendsRequests.length > 0 
                                ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== userID)
                                : []);

    useEffect(()=>{
        dispatch(getFriendList(userID));
        dispatch(getFriendshipRequests(userID));
        dispatch(getFriendSuggestions(userID));
        return () => {
            dispatch(setCurrentFriend({}));;
          };
    },[])

    const handleClickConfirm = (friend) => {
        const payload = {id: friend.id, status: "accepted", userID: userID,  friendID: friend.friend.id}
        dispatch(updateFriendship(payload));
    }

    const handleClickRemove = (friend) => {
        const payload = {id: friend.id, status: "rejected", userID: userID,  friendID: friend.friend.id}
        dispatch(updateFriendship(payload));
    }
    const handleClickAdd = (userId, friendId) => {
        console.log(friendId);
        dispatch(createFriendship({userId: userId, friendId: friendId}));
    }

    const handleClickRemoveSuggestion = (payload) => {
        dispatch(removeSuggestions(payload));
    }

    const handleLinkClick = (payload) => {
        dispatch(setCurrentFriend(payload));
    }

    const SectorTitle = styled(Typography)({
        padding: '16px 4px',
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: 1.2,
        textAlign: 'left'
    })

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

/*     const theme = useTheme(); */
console.log(friendsRequestsToUser);

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
                            handleLinkClick={() => handleLinkClick(fr)}
                            mutualFriends={fr.mutualFriends} 
                            friend={fr.user} 
                            addButton={<StandardButton variant="contained" onClick={() => handleClickConfirm(fr)}>Confirm</StandardButton>}
                            removeButton={<GreyButton onClick={() => handleClickRemove(fr)}>Remove</GreyButton>}/>)
                    }
                    </FriendsContainer>
                </Box>}
                {friendSuggestions.length > 0 && friendsRequestsToUser.length > 0 && <Divider sx={{ my: '12px', }}/>}
                {friendSuggestions.length > 0 && <Box sx={{px: '16px'}}>
                    <SectorHeader>
                        <SectorTitle>People you may know</SectorTitle>
                        <LinkStyled to="/friends/suggestions">See All</LinkStyled>
                    </SectorHeader>
                    <FriendsContainer>
                    {
                        friendSuggestions &&  friendSuggestions.map(fr => <Friend 
                            key={fr.friend.id}
                            mutualFriends={fr.mutualFriends}
                            friend={fr.friend} 
                            /* addButton={<Button sx={{bgcolor: 'secondary.main', width: 1, '&:hover': {bgcolor: 'secondary.light'}, textTransform: 'none'}} 
                                                    onClick={handleClickConfirm}>Add friend</Button>} */
                            addButton={<BlueButton onClick={() =>  handleClickAdd(userID, fr.friend.id)}>Add friend</BlueButton>}
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

 /*  const mutialFriendsClickHandle = () =>{
        setIsModalOpen(true);
    } */

    /* const friends = [
        {
            id: 3,
            avatar: "https://marketplace.canva.com/EAEjuxgtTrE/2/0/1600w/canva-%D0%B6%D0%B5%D0%BB%D1%82%D1%8B%D0%B9-%D0%B8-%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9-%D0%B3%D0%B5%D0%B9%D0%BC%D0%B5%D1%80-%D0%B3%D1%80%D0%B0%D0%BD%D0%B4%D0%B6-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-twitch-GwiHF3J6qRM.jpg", 
            name: "Test Person",
            mutialFriends: [
                {id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg", 
                    name: "Emily White"},
                {id: 2,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg", 
                    name: "Ivan Gray"}
            ]
        },
        {
            id: 4,
            avatar: "https://marketplace.canva.com/EAEjuxgtTrE/2/0/1600w/canva-%D0%B6%D0%B5%D0%BB%D1%82%D1%8B%D0%B9-%D0%B8-%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9-%D0%B3%D0%B5%D0%B9%D0%BC%D0%B5%D1%80-%D0%B3%D1%80%D0%B0%D0%BD%D0%B4%D0%B6-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-twitch-GwiHF3J6qRM.jpg", 
            name: "Test Person",
            mutialFriends: [
                {id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg", 
                    name: "Masha Martinos"},
                {id: 2,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg", 
                    name: "Pasha Golombki"}
            ]
        }
    ] */