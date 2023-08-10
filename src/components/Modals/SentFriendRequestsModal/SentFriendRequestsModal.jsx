// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, Divider, Typography, Box, Link } from "@mui/material";
import { closeSentFriendRequests } from  '../../../redux/modal.slice/modal.slice';
import { StyledModalTitle, 
        StyledModalCloseButton, 
        StyledModalCloseButtonLine ,
    } from '../StyledModalComponents';
import { setCurrentFriend } from '../../../redux/friends/friends.slise';
import { setFriends, setUser, getUser, getFriends } from "../../../redux/user.slice/user.slice";
import Friend from '../../Friends/Friend/Friend';
import styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';
import { ButtonStyled } from '../../../components/StyledComponents/Buttons';
import { updateFriendship } from '../../../redux/friends/actionCreators';
import { useNavigate } from "react-router-dom";


function SentFriendRequestsModal() {

    const dispatch = useDispatch();
    const theme = useTheme();
    const refItemWrapper = useRef(null);
    const navigate = useNavigate();

    const isOpen = useSelector((store)=>store.modal.sentFriendRequests.isOpen);
    const requests = useSelector((store)=>store.friends.friendsRequests, shallowEqual);
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const sentRequests = (requests.length > 0 
        ? requests.filter((elem) => elem.status==='pending' && elem.user.id === authUser.id)
        : []);
        console.log(sentRequests);

    const sentRequestsCount = sentRequests.length > 0 ? sentRequests.length : '';

    useEffect(() => {
        console.log(refItemWrapper);
    }, [refItemWrapper])

    const handleClose = () => {
        dispatch(closeSentFriendRequests());
    }

    const handleClickItem = (friend) => {
        navigate("/profile");
        handleLinkClick(friend);
    }

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

    const handleCancelRequest = (friend) => {
        const payload = {id: friend.id, status: "canceled", userID: friend.user.id,  friendID: friend.friend.id}
        dispatch(updateFriendship(payload));
    }

    const RequestQuantity = styled(Typography)({
        marginLeft: 10,
        paddingBottom: 15,
        lineHeight: 1.1765,
        fontWeight: 600,
        fontSize: '1.0625rem',
    })

    const ContentWraper = styled(Box)({
        display: 'flex', 
        flexDirection: 'column', 
        paddingLeft: '8px',
        paddingRight: '8px', 
        borderRadius: '8px', 
        marginLeft: '4px',
        marginRight: '4px',
    })

    const ItemWraper = styled(Link)(({theme})=>({
        display: 'flex', 
        paddingLeft: '8px',
        paddingRight: '8px', 
        borderRadius: '8px', 
        marginLeft: '4px',
        marginRight: '4px',
        justifyContent: 'space-between', 
        '&:hover': {backgroundColor: theme.palette.backgroundColor.hover,
                    cursor: 'pointer',
                textDecoration: 'none',}
    }))

    return(
    <>
    <Dialog
        onClose={handleClose}
        aria-labelledby="sent-requests-dialog"
        open={isOpen}
        sx={{fontFamily: theme.typography.fontFamily}}
      >
        <DialogTitle id="sent-requests-dialog-title" 
            onClose={handleClose} 
            sx={{p:1, minWidth: '500px', 
                backgroundColor: theme.palette.backgroundColor.section,
                color: theme.palette.textColor.content, py: '12px'}}>
            <StyledModalTitle>Sent requests</StyledModalTitle>
                <StyledModalCloseButton onClick={handleClose}>
                    <StyledModalCloseButtonLine/>
                </StyledModalCloseButton>
        </DialogTitle>
        <Divider sx={{my: '12px', borderColor: theme.palette.border.card, m: 0}}/>
        <DialogContent 
            sx={{backgroundColor: theme.palette.backgroundColor.section,
                color: theme.palette.textColor.secondary,
                px: 0}}>
            <>
            {sentRequests.length === 0 
                && <Typography sx={{fontSize: '.9375rem', textAlign: 'center', lineHeight: 1.3333, py: '40px'}}>
                        When you send someone a friend request, it will appear here.
                    </Typography>}
            {
                sentRequests.length > 0 && 
                <ContentWraper>
                    <RequestQuantity>{sentRequestsCount} sent request</RequestQuantity>
                    {sentRequests.map(fr => 
                    <ItemWraper  key={fr.id} ref={refItemWrapper} onClick={() => handleClickItem(fr.friend)}>
                        <Friend horizontal = 'true'
                                key={fr.id}
                                mutualFriends={fr.mutualFriends} 
                                handleLinkClick={() => handleLinkClick(fr.friend)}
                                friend={fr.friend}
                                isAvatarMutualFriend={true}
                                referenseForLinks={`/Profile`}/>
                        <Box sx={{display: 'flex', width: '50%', height: '40px', margin: 'auto', zIndex: 100}}>
                            <ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                                    '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},
                                    color: theme.palette.textColor.content}}
                                    onClick={(e) => {e.stopPropagation(); handleCancelRequest(fr);}}>
                                Cancel Request
                            </ButtonStyled>
                        </Box>
                    </ItemWraper>)}
                </ContentWraper>
            }
            </>
        </DialogContent>
      </Dialog>
    </>
    )
}

export default SentFriendRequestsModal;