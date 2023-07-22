/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Friend from "../../components/Friends/Friend/Friend";
import {
    Box,
    Divider,
    Typography,
    Button
} from "@mui/material";
import {GreyButton, BlueButton, StandardButton} from '../../components/StyledComponents/Buttons';
import { 
    getFriendList, 
    getFriendshipRequests,
    getFriendSuggestions, 
    createFriendship, 
    updateFriendship 
} from '../../redux/friends/actionCreators';
import {  removeSuggestions } from '../../redux/friends/friends.slise';
import SidebarFriends from './SidebarFriends';
import styled from "@emotion/styled";
import SideBarList from './SideBarList'


function FriendsHome() {

    const userID = 4;
    const dispatch = useDispatch(); 
    const friendsRequests = useSelector((store)=>store.friends.friendsRequests);
    const friendSuggestions = useSelector((store)=>store.friends.friendSuggestions);
    console.log(friendSuggestions);
    const friendsRequestsToUser = (friendsRequests.length > 0 
                                ? friendsRequests.filter((elem) => elem.status==='pending' && elem.user.id !== userID)
                                : []);

    useEffect(()=>{
        dispatch(getFriendList(userID));
        dispatch(getFriendshipRequests(userID));
        dispatch(getFriendSuggestions(userID));
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

    const SectorTitle = styled(Typography)({
        padding: '16px 4px',
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: 1.2,
        textAlign: 'left'
    })

    const FriendsContainer = styled(Box)({
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    }) 

    const SectionWraper = styled(Box)({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 20, 
        backgroundColor: '#F0F2F5',
    })

    const H1Styled = styled('h1')({
        fontWeight: 900,
        fontSize: '1.5rem',
        fontFamily: 'inherit',
    })

    return (<>
        <Box sx={{ width: '100%', display: 'flex', }}>
            <SidebarFriends headContent={<H1Styled>Friends</H1Styled>} menulist={<SideBarList/>}/>               
                <SectionWraper>
                    <Box>
                        <SectorTitle>Friend requests</SectorTitle>
                        <FriendsContainer>
                        {
                            friendsRequestsToUser && friendsRequestsToUser.map(fr => <Friend 
                                key={fr.id}
                                mutualFriends={fr.mutualFriends} 
                                friend={fr.user} 
                                addButton={<StandardButton variant="contained" onClick={() => handleClickConfirm(fr)}>Confirm</StandardButton>}
                                removeButton={<GreyButton onClick={() => handleClickRemove(fr)}>Remove</GreyButton>}/>)
                        }
                        </FriendsContainer>
                        <Divider sx={{ my: '12px', }}/>
                    </Box>
                <Box>
                    <SectorTitle>People you may know</SectorTitle>
                    <FriendsContainer>
                    {
                        friendSuggestions &&  friendSuggestions.map(fr => <Friend 
                            key={fr.friend.id}
                            mutualFriends={fr.mutualFriends}
                            friend={fr.friend} 
                            /* addButton={<Button sx={{bgcolor: 'secondary.main', width: 1, '&:hover': {bgcolor: 'secondary.light'}, textTransform: 'none'}} 
                                                    onClick={handleClickConfirm}>Add friend</Button>} */
                            addButton={<BlueButton onClick={() =>  handleClickAdd(userID, fr.friend.id)}>Add friend</BlueButton>}
                            removeButton={<GreyButton onClick={() =>  handleClickRemoveSuggestion(fr.friend)}>Remove</GreyButton>}/>)
                    }
                    </FriendsContainer>
                </Box>
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