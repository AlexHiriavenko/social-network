/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React, {memo, useCallback} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SideBarHeader from '../../components/Friends/SideBar/SideBarHeader';
import styled from "@emotion/styled";
import { Box, Typography, List, Divider, ListItemButton } from "@mui/material";
import Friend from "../../components/Friends/Friend/Friend";
import { ButtonStyled } from '../../components/StyledComponents/Buttons';
import { NavLink } from "react-router-dom";
import { SVGArrowBack } from '../../components/SVG/svg';
import { setCurrentFriend } from '../../redux/friends/friends.slise';
import { setFriends, setUser, getUser, getFriends } from "../../redux/user.slice/user.slice";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {SidebarStyled} from '../../components/StyledComponents/SideBarFriends';
import PopupMenuFriends from './UserFriends/PopupMenuFriends';


function SideBarFriends(props) {

    const {
        headerTitle,
        subTitle,
        addlItemsHead,
        addItemsSubHead,
        noItemMessage,
        sideBarItems,
        handleClickConfirm,
        handleClickRemove,
        isAddButton,
        isRemoveButton,
        isConfirmButton,
        isAvatarMutualFriend,
        additionalButtons,
        isMoreMenuButton,
        handleClickUnfriend,
    } = props;

    const theme = useTheme();
    const dispatch = useDispatch(); 
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);

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

    const callBackHandleLinkClick = useCallback(handleLinkClick, [authUser, dispatch]);

    const TitleStyled = styled('h1')(({theme}) => ({
        fontWeight: 900,
        fontSize: '1.5rem',
        fontFamily: 'inherit',
        color: theme.palette.textColor.content,
    }))

    const LinkStyled = styled(NavLink)(({theme}) => ({
        fontFamily: 'inherit',
        fontSize: '.8125rem',
        fontWeight: 400,
        lineHeight: 1.2308,
        paddingBottom: 1,
        color: theme.palette.textColor.secondary,
        textDecoration: 'none',
        '&:visited': {color: theme.palette.textColor.secondary},
        '&:hover': {textDecoration: 'underline'},
    }))

    const SubTitleStyled = styled(Typography)(({theme}) => ({
        paddingBottom: 10,
        fontWeight: 600,
        textAlign: 'left',
        lineHeight: 1.1765,
        fontSize: '1.0625rem',
        color: theme.palette.textColor.content,
    }))

    const MenuItem = styled(ListItemButton)(({theme}) => ({
        display: 'flex',
        width: '100%',
        color: theme.palette.textColor.main,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: 0,
        '&.Mui-hover': {backgroundColor: theme.palette.backgroundColor.hover,},
        '&.Mui-active': {backgroundColor: theme.palette.backgroundColor.hover},
        '&.Mui-selected': {backgroundColor: theme.palette.backgroundColor.hover, opacity: 1},
        '&.Mui-selected:hover': {backgroundColor: theme.palette.backgroundColor.hover,}
    }))

    const ArrowBackStyled = styled(NavLink)(({theme}) => ({
        borderRadius: '50%',
        padding:  '6px 8px' ,
        '&:hover': {backgroundColor: theme.palette.backgroundColor.hover,},
        width: '35px',
        height: '35px',
    }))

    return(
        <SidebarStyled>
            <SideBarHeader>
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                    <ArrowBackStyled to="/friends/home">
                        <SVGArrowBack/>
                    </ArrowBackStyled>
                    <Box sx={{display: 'flex', gap: 1/2, flexDirection: 'column'}}>
                        <LinkStyled to="/friends/home">
                            Friends
                        </LinkStyled>
                        <TitleStyled>{ headerTitle }</TitleStyled>
                    </Box>
                </Box>
                { addlItemsHead }
                <Divider sx={{my: '12px', borderColor: theme.palette.border.card,}}/>
                <Box>
                    <SubTitleStyled>{ subTitle }</SubTitleStyled>
                    { addItemsSubHead }
                    { sideBarItems.length === 0 
                && <Typography sx={{py: 2, fontSize: 12, color: theme.palette.textColor.secondary}}>
                        { noItemMessage }
                    </Typography>}
                </Box>                
            </SideBarHeader>
            <List sx={{padding: 0}}>
                {
                    sideBarItems && sideBarItems.map(fr =>
                    <MenuItem onClick={(e) => {e.stopPropagation(); callBackHandleLinkClick(fr.user ? fr.user : fr.friend)}}
                            key={fr.user ? fr.user.id : fr.friend.id} 
                            selected={currentFriend.id === (fr.user ? fr.user.id : fr.friend.id)}>
                        <Friend horizontal = 'true'
                            key={fr.id}
                            mutualFriends={fr.mutualFriends} 
                            handleLinkClick={(e) => {e.stopPropagation(); callBackHandleLinkClick(fr.user ? fr.user : fr.friend)}}
                            friend={fr.user ? fr.user : fr.friend}
                            isAvatarMutualFriend={isAvatarMutualFriend}
                            addButton={isConfirmButton 
                                ? <ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.primary}}
                                        variant="contained" 
                                        onClick={(e) => {e.stopPropagation(); handleClickConfirm(fr)}}>
                                            Confirm
                                    </ButtonStyled> 
                                :  isAddButton
                                    ? <ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.blueLight,
                                            '&:hover': {backgroundColor: theme.palette.buttonColor.blueLightHover,},
                                            color: theme.palette.textColor.blueLink}}
                                            onClick={(e) => {e.stopPropagation(); handleClickConfirm(fr)}}>Add friend</ButtonStyled> 
                                    : null}
                            removeButton={isRemoveButton 
                                ? <ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                                        '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},
                                        color: theme.palette.textColor.content}}
                                        onClick={(e) => {e.stopPropagation(); handleClickRemove(fr)}}>Remove</ButtonStyled>
                                : null}
                            moreMenuButton={isMoreMenuButton 
                                ? <PopupMenuFriends handleClickUnfriend={(e) => {e.stopPropagation(); handleClickUnfriend(fr)}}/>
                                : null}
                            additionalButtons={additionalButtons}
                            />
                    </MenuItem>)
                }
            </List>
        </SidebarStyled>
    )
}

SideBarFriends.propTypes  = {
    headerTitle: PropTypes.string,
    subTitle: PropTypes.string,
    addlItemsHead: PropTypes.node,
    addItemsSubHead: PropTypes.node,
    noItemMessage: PropTypes.string,
    sideBarItems: PropTypes.arrayOf(PropTypes.object),
    handleClickConfirm: PropTypes.func,
    handleClickRemove: PropTypes.func,
    isAddButton: PropTypes.bool,
    isRemoveButton: PropTypes.bool,
    isConfirmButton: PropTypes.bool,
    isAvatarMutualFriend: PropTypes.bool,
    additionalButtons: PropTypes.node,
    isMoreMenuButton: PropTypes.bool,
    handleClickUnfriend: PropTypes.func,
  };
  
  SideBarFriends.defaultProps = {
    headerTitle: '',
    subTitle: '',
    additionItems: null,
    noItemMessage: '',
    sideBarItems: [],
    handleClickConfirm: () => {},
    handleClickRemove: () => {},
    isAddButton: false,
    isRemoveButton: false,
    isConfirmButton: false,
    isAvatarMutualFriend: false,
    additionalButtons: <></>,
    isMoreMenuButton: false,
    handleClickUnfriend: () => {},
  };

export default memo(SideBarFriends);