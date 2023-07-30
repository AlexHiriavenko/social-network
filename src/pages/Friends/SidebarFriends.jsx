import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import SideBarHeader from '../../components/Friends/SideBar/SideBarHeader';
import styled from "@emotion/styled";
import { Box, Typography, List, Divider, ListItemButton } from "@mui/material";
import Friend from "../../components/Friends/Friend/Friend";
import {GreyButton, StandardButton, BlueButton } from '../../components/StyledComponents/Buttons';
import { NavLink } from "react-router-dom";
import {SVGArrowBack} from '../../components/SVG/svg';
import { useTheme } from '@mui/material/styles';
import { setUser } from "../../redux/user.slice/user.slice";
import { setCurrentFriend } from '../../redux/friends/friends.slise';


function SideBarFriends(props) {

    const {
        headerTitle,
        subTitle,
        additionItems,
        noItemMessage,
        sideBarItems,
        handleClickConfirm,
        handleClickRemove,
        isAddButton,
        isRemoveButton,
        isConfirmButton,
        isAvatarMutualFriend,
    } = props;

    console.log("isAvatarMutualFriend");
    console.log(isAvatarMutualFriend);


    const currentFriend = useSelector((store)=>store.friends.currentFriend);
    const dispatch = useDispatch(); 
    
    const handleLinkClick = (payload) => {
        console.log("handleLinkClick");
        dispatch(setUser(payload));
        dispatch(setCurrentFriend(payload));
    }

    const SidebarStyled = styled(Sidebar)({
        width: 500,
    })

    const TitleStyled = styled('h1')({
        fontWeight: 900,
        fontSize: '1.5rem',
        fontFamily: 'inherit',
    })

    const LinkStyled = styled(NavLink)(({color}) => ({
        fontFamily: 'inherit',
        fontSize: '.8125rem',
        fontWeight: 400,
        lineHeight: 1.2308,
        paddingBottom: 1,
        color: {color},
        textDecoration: 'none',
    }))

    const SubTitleStyled = styled(Typography)(({theme}) => ({
        paddingBottom: 10,
        fontWeight: 600,
        textAlign: 'left',
        lineHeight: 1.1765,
        fontSize: '1.0625rem',
        color: theme.palette.textColor.main,
    }))

    const MenuItem = styled(ListItemButton)(({theme}) => ({
        display: 'flex',
        width: '100%',
/*         color: '#050505',
        '&:hover': {backgroundColor: '#F0F2F5',},
        '&:active': {backgroundColor: '#E4E6EB',}, */
        color: theme.palette.textColor.main,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        padding: 0,
        '&:hover': {backgroundColor: theme.palette.backgroundColor.page,},
        '&:active': {backgroundColor: theme.palette.buttonColor.background}, 
    }))

    const theme = useTheme();

    return(
        <SidebarStyled>
            <SideBarHeader>
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                    <NavLink to="/friends/home">
                        <SVGArrowBack/>
                    </NavLink>
                    <Box sx={{display: 'flex', gap: 1/2, flexDirection: 'column'}}>
                        <LinkStyled color={theme.palette.textColor.secondary} 
                                    to="/friends/home"
                                    sx={{'&:hover': {textDecoration: 'underline' }}}>Friends</LinkStyled>
                        <TitleStyled>{ headerTitle }</TitleStyled>
                    </Box>
                </Box>
                <Divider sx={{my: '12px'}}/>
                <Box>
                    <SubTitleStyled>{ subTitle }</SubTitleStyled>
                    { additionItems }
                    { sideBarItems.length === 0 
                && <Typography sx={{py: 2, fontSize: 12}}>{ noItemMessage }</Typography>}
                </Box>                
            </SideBarHeader>
            <List sx={{padding: 0}}>
                {
                    sideBarItems && sideBarItems.map(fr =>
                    <MenuItem onClick={() => handleLinkClick(fr.user ? fr.user : fr.friend)} 
                        key={fr.user ? fr.user.id : fr.friend.id} selected={currentFriend.id === (fr.user ? fr.user.id : fr.friend.id)}>
                        <Friend horizontal = 'true'
                            key={fr.id}
                            mutualFriends={fr.mutualFriends} 
                            handleLinkClick={() => handleLinkClick(fr.user ? fr.user : fr.friend)}
                            friend={fr.user ? fr.user : fr.friend}
                            isAvatarMutualFriend={isAvatarMutualFriend}
                            addButton={isConfirmButton 
                                ? <StandardButton variant="contained" onClick={() => handleClickConfirm(fr)}>Confirm</StandardButton> 
                                :  isAddButton
                                    ? <BlueButton variant="contained" onClick={() => handleClickConfirm(fr)}>Add friend</BlueButton> 
                                    : null}
                            /* addButton={<ButtonStyled sx={{backgroundColor: theme.palette.accentColor.main, 
                                                            color: theme.palette.textColor.onDarkFone, 
                                                            '&:hover': {backgroundColor: theme.palette.buttonColor.primaryHover,
                                                                opacity: [0.9, 0.8, 0.7],}, 
                                                            '&:active': {backgroundColor:theme.palette.buttonColor.primaryPressed}}}
                                                        onClick={() => handleClickConfirm(fr)}>Confirm</ButtonStyled>} */
                            removeButton={isRemoveButton 
                                ? <GreyButton onClick={() => handleClickRemove(fr)}>Remove</GreyButton>
                                : null}
                            />
                    </MenuItem>)
                }
            </List>
        </SidebarStyled>
    )
}

export default SideBarFriends;