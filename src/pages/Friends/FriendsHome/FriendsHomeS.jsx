import { useCallback} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Friend from "../../../components/Friends/Friend/Friend";
import { Box, Divider, List } from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonStyled } from '../../../components/StyledComponents/Buttons';
import SideBarHeader from '../../../components/Friends/SideBar/SideBarHeader';
import {SidebarStyled} from '../../../components/StyledComponents/SideBarFriends'
import { SectorTitle, SectorHeader, FriendsContainer, H1Styled } from '../../../components/StyledComponents/FriendPageComponents';
import { useTheme } from '@mui/material/styles';
import {PageBoxFriends} from '../../../components/StyledComponents/PageBoxFriends';
import { MenuItem, SideBarContentWrapper } from '../SideBarStyledComponents';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import { Loader } from "../../../components/PreLoader";


function FriendsHomeS(props) {

    const { 
        friendsRequestsToUser, 
        friendSuggestions, 
        handleClickLinklocal, 
        handleClickConfirm, 
        handleClickRemove,
        handleClickAdd,
        handleClickRemoveSuggestion
    } = props;

    const theme = useTheme();

    const dispatch = useDispatch(); 
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const callBackHandleLinkClick = useCallback(handleClickLinklocal, [authUser, dispatch, handleClickLinklocal]);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);

    const isLoadingSuggestions = useSelector((store)=>store.friends.isLoadingSuggestions, shallowEqual);
    const isLoadingRequests = useSelector((store)=>store.friends.isLoadingRequests, shallowEqual);

    const navigate = useNavigate();

    const LinkStyled = styled(Link)(({theme}) => ({
        color: theme.palette.textColor.content,
        fontSize: "14px",
    }));

    const FriendRequests = friendsRequestsToUser.map(fr => 
        <MenuItem onClick={(e) => {e.stopPropagation(); callBackHandleLinkClick(fr.user); navigate("/friends/requests/")}}
                key={fr.id} 
                selected={currentFriend.id === (fr.user)}>
            <Friend horizontal='true'
                key={fr.id}
                referenseForLinks={"/friends/requests/"}
                handleLinkClick={() => handleClickLinklocal(fr.user)}
                mutualFriends={fr.mutualFriends}
                isAvatarMutualFriend={true}
                friend={fr.user} 
                addButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.primary}} 
                        variant="contained" 
                    onClick={(e) => {e.stopPropagation(); handleClickConfirm(fr)}}>Confirm</ButtonStyled>}
                removeButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                        color: theme.palette.textColor.content,
                        '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover}}} 
                    onClick={(e) => {e.stopPropagation(); handleClickRemove(fr)}}>Remove</ButtonStyled>}
            />
        </MenuItem>);

    const divider = friendSuggestions.length > 0 && friendsRequestsToUser.length > 0 
        ? <Divider sx={{ my: '12px', borderColor: theme.palette.border.card}}/>
        : null;

    const friendSuggestionsList = friendSuggestions.map(fr => 
        <MenuItem onClick={(e) => {e.stopPropagation(); callBackHandleLinkClick(fr.friend); navigate("/friends/suggestions/")}}
                key={fr.friend.id} 
                selected={currentFriend.id === (fr.friend)}>
            <Friend 
                horizontal='true'
                key={fr.friend.id}
                referenseForLinks={"/friends/suggestions/"}
                handleLinkClick={() => handleClickLinklocal(fr.friend)}
                mutualFriends={fr.mutualFriends}
                isAvatarMutualFriend={true}
                friend={fr.friend} 
                addButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.blueLight,
                            '&:hover': {backgroundColor: theme.palette.buttonColor.blueLightHover,},
                            color: theme.palette.textColor.blueLink}} 
                    onClick={(e) => {e.stopPropagation(); handleClickAdd( fr.friend.id)}}>Add friend</ButtonStyled>}
                removeButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                            '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},
                            color: theme.palette.textColor.content}}
                    onClick={(e) => {e.stopPropagation();  handleClickRemoveSuggestion(fr)}}>Remove</ButtonStyled>}/>
        </MenuItem>);

    const allFriendsButton = <Box sx={{py: 0.5, px:2, borderRadius: 10, textDecoration: 'none',
                                    textAlign:'center',
                                    backgroundColor: theme.palette.buttonColor.background,
                                    '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},}}>
                                <LinkStyled to={"/friends/allfriends"}>All Friends</LinkStyled>
                            </Box>;

    const requestsButton = <Box sx={{py: 0.5, px:2, borderRadius: 10, textDecoration: 'none',
                                    textAlign:'center',
                                    backgroundColor: theme.palette.buttonColor.background,
                                    '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},}}>
                                <LinkStyled to={"/friends/requests"}>Requests</LinkStyled>
                            </Box>;

    const suggestionButton = <Box sx={{py: 0.5, px:2, borderRadius: 10, textDecoration: 'none',
                                    textAlign:'center',
                                    backgroundColor: theme.palette.buttonColor.background,
                                    '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},}}>
                                <LinkStyled to={"/friends/suggestions"}>Suggestions</LinkStyled>
                            </Box>;

    const loader = <Box sx={{display: 'flex', justifyContent:'center', alignContent: 'center', margin: 'auto'}}><Loader/></Box>;

    return(
        <PageBoxFriends sx={{
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('sm')]: {display: 'none',},}}>
            <SidebarStyled>
                <SideBarHeader>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 0.5}}>
                        <H1Styled>Friends</H1Styled>
                        <Box sx={{display: 'flex', gap: 1, flexWrap:'wrap'}}>
                            {allFriendsButton}
                            {requestsButton}
                            {suggestionButton}
                        </Box>
                    </Box>
                </SideBarHeader>
                <Divider sx={{my: 0, borderColor: theme.palette.border.card,}}/>
                <SideBarContentWrapper>
                {(isLoadingSuggestions || isLoadingRequests) && loader}
                    <List sx={{ py: 1}}>
                        {friendsRequestsToUser.length > 0 && !isLoadingSuggestions && !isLoadingRequests &&
                        <Box sx={{px: '16px'}}>
                            <SectorHeader sx={{backgroundColor: theme.palette.backgroundColor.section,}}>
                                <SectorTitle>Friend requests</SectorTitle>
                                <LinkStyled to="/friends/requests">See All</LinkStyled>
                            </SectorHeader>
                            <FriendsContainer>
                                {FriendRequests}
                            </FriendsContainer>
                        </Box>}
                        {divider}
                        {friendSuggestions.length > 0 && !isLoadingSuggestions && !isLoadingRequests &&
                        <Box sx={{px: '16px'}}>
                            <SectorHeader>
                                <SectorTitle>People you may know</SectorTitle>
                                <LinkStyled to="/friends/suggestions">See All</LinkStyled>
                            </SectorHeader>
                            <FriendsContainer>
                                {friendSuggestionsList}
                            </FriendsContainer>
                        </Box>}
                    </List>
                </SideBarContentWrapper>
            </SidebarStyled>
        </PageBoxFriends>
    )
}

FriendsHomeS.propTypes = {
    friendsRequestsToUser: PropTypes.arrayOf(PropTypes.object),
    friendSuggestions: PropTypes.arrayOf(PropTypes.object),
    handleClickLinklocal: PropTypes.func,
    handleClickConfirm: PropTypes.func,
    handleClickRemove: PropTypes.func,
    handleClickAdd: PropTypes.func,
    handleClickRemoveSuggestion: PropTypes.func,
  };
  
  FriendsHomeS.defaultProps = {
    friendsRequestsToUser: [],
    friendSuggestions: [],
    handleClickLinklocal: () => { },
    handleClickConfirm: () => { },
    handleClickRemove: () => { },
    handleClickAdd: () => { },
    handleClickRemoveSuggestion: () => { },
  };

export default FriendsHomeS;