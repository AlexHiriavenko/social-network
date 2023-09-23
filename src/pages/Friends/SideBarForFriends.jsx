/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React, {memo, useCallback, useEffect, useState} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SideBarHeader from '../../components/Friends/SideBar/SideBarHeader';
import { Box, Typography, List, Divider} from "@mui/material";
import Friend from "../../components/Friends/Friend/Friend";
import { ButtonStyled } from '../../components/StyledComponents/Buttons';
import { SVGArrowBack } from '../../components/SVG/svg';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {SidebarStyled, } from '../../components/StyledComponents/SideBarFriends';
import PopupMenuFriends from './UserFriends/PopupMenuFriends';
import Search from '../../components/Search/Search';
import { TitleStyled, LinkStyled, SubTitleStyled, MenuItem, ArrowBackStyled, SideBarWrapper, SideBarContentWrapper } from './SideBarStyledComponents';
import { handleLinkClick } from './handleClickLink';


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
        search,
        handleChangeValue,
        placeholderText,
        initialValue,
        openDrawer,
        getDataList,
        isLoading,
    } = props;

    const theme = useTheme();
    const dispatch = useDispatch(); 
    const [isFetching, setIsFetching] = useState(true);
    const [page, setPage] = useState(1);
    const authUser = useSelector((store)=>store.user.authorizedUser, shallowEqual);
    const currentFriend = useSelector((store)=>store.friends.currentFriend, shallowEqual);

    const size = 10;

    useEffect(() => {
        if(sideBarItems.length === 0 && !isLoading) {
            dispatch(getDataList({page: 0, size}));
            setPage(page+1);
            setIsFetching(false);
        }
    },[dispatch]);

    useEffect(() => {
        if(isFetching && !isLoading && getDataList) {
            dispatch(getDataList({page, size}));
            setPage(page+1);
            setIsFetching(false);
        }
    },[isFetching, dispatch]);

    const handleClickLinklocal = (friend) => {
        handleLinkClick(dispatch, friend, authUser);
    };

    const callBackHandleLinkClick = useCallback(handleClickLinklocal, [authUser, dispatch]);

    function handleScroll(e) {
        if (e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight) < 100 && !isLoading) {
            setIsFetching(true);
        }
      }

    const searchComponent = search  
        ?   <>
                <Search sx={{m:0}} 
                        handleChangeValue={handleChangeValue} 
                        placeholderText={placeholderText}
                        initialValue={initialValue}/>
                <Divider sx={{mt: '12px', borderColor: theme.palette.border.card,}}/>
            </>
        : null;
 
    const menuItemList = sideBarItems.length > 0
        ? sideBarItems.map(fr =>
            <MenuItem onClick={(e) => {e.stopPropagation(); callBackHandleLinkClick(fr.user ? fr.user : fr.friend); openDrawer(true)}}
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
        :   <Typography sx={{py: 2, fontSize: 12, color: theme.palette.textColor.secondary}}>
                { noItemMessage }
            </Typography>;

    return (
        <SidebarStyled>
            <SideBarWrapper>
                <SideBarHeader>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <ArrowBackStyled to="/friends/home">
                            <SVGArrowBack />
                        </ArrowBackStyled>
                        <Box sx={{ display: 'flex', gap: 1 / 2, flexDirection: 'column' }}>
                            <LinkStyled to="/friends/home">Friends</LinkStyled>
                            <TitleStyled>{ headerTitle }</TitleStyled>
                        </Box>
                    </Box>
                    <Divider sx={{ my: '12px', borderColor: theme.palette.border.card, }}/>
                </SideBarHeader>
                <SideBarContentWrapper  onScroll={handleScroll}>
                    { searchComponent }
                    { addlItemsHead }
                    <Box sx={{paddingTop: 1}}>
                        <SubTitleStyled>{ subTitle }</SubTitleStyled>
                        { addItemsSubHead }
                    </Box>            
                    <List sx={{ py: 1}}>
                        { menuItemList }
                    </List>
                </SideBarContentWrapper>
            </SideBarWrapper>
        </SidebarStyled>
    )
}

SideBarFriends.propTypes = {
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
    search: PropTypes.bool,
    handleChangeValue: PropTypes.func,
    placeholderText: PropTypes.string,
    initialValue: PropTypes.string,
    openDrawer: PropTypes.func,
    getDataList: PropTypes.func,
    isLoading: PropTypes.bool,
  };
  
  SideBarFriends.defaultProps = {
    headerTitle: '',
    subTitle: '',
    additionItems: null,
    noItemMessage: '',
    sideBarItems: [],
    handleClickConfirm: () => { },
    handleClickRemove: () => { },
    isAddButton: false,
    isRemoveButton: false,
    isConfirmButton: false,
    isAvatarMutualFriend: false,
    additionalButtons: <></>,
    isMoreMenuButton: false,
    handleClickUnfriend: () => {},
    search: false,
    handleChangeValue: () => {},
    placeholderText: '',
    initialValue: '',
    openDrawer: () => {},
    getDataList: () => {},
    isLoading: false,
  };

export default memo(SideBarFriends);