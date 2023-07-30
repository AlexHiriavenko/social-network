/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, CardMedia, Typography, Tooltip, Box, List, Avatar, CardActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { setUser } from "../../../redux/user.slice/user.slice";
import zIndex from "@mui/material/styles/zIndex";
import { NULL } from "sass";


function Friend (props) {

    const { 
        mutualFriends,
        friend, 
        addButton, 
        removeButton, 
        horizontal,
        referenseForLinks,
        handleLinkClick,
        isAvatarMutualFriend,
    } = props;

    const dispatch = useDispatch(); 

    const countForDisplayMF = 2;
    const countMutualFriends = mutualFriends.length;
    console.log(countMutualFriends);

    const mutialFriendsAvatars = isAvatarMutualFriend 
        ? (mutualFriends && mutualFriends.length > 2 ? mutualFriends.slice(0, 2) : mutualFriends)
        : null;

    const listMutualFriends =  mutualFriends && mutualFriends.length > countForDisplayMF
        ? (<ul>
                {mutualFriends.slice(0, countForDisplayMF).map(el => <li key={el.id}>{el.fullName}</li>)}
                <li>and {countMutualFriends-countForDisplayMF} more...</li>
            </ul>) 
        : ( <ul>
                {mutualFriends.map(el => <li key={el.id}>{el.fullName}</li>)}
            </ul>);

    const CardStyled = styled(Card)(({horizontal, theme}) => ({
        maxWidth: horizontal ? "100%" : "250px",
        minWidth: horizontal ? '250px' : "200px",
        width: horizontal ? '100%' : null,
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? 'center' : null,
        margin: "4px",
        flexShrink: 1,
        backgroundColor: theme.palette.backgroundColor.card,
        '&:hover': horizontal ? {backgroundColor: theme.palette.backgroundColor.page,} : null,
        boxShadow:  horizontal ? 'none' : null,
        border: horizontal ? null: `solid 1px ${theme.palette.border.card}`,
        zIndex: 100,
    }));

    const CardMediaStyled = styled(CardMedia)(({horizontal}) => ({
        width: horizontal ? '60px' : '100%',
        height: horizontal ? '60px' : null,
        borderRadius: horizontal ? '50%' : null,
        paddingTop: '100%',
        zIndex: 200,
    }))

    const CardContentStyled = styled(CardContent)({
        display: 'flex', 
        flexDirection: 'column', 
        paddingBottom: 0,
        zIndex: 200,
    })

    const FriendName = styled(Typography)(({theme, horizontal}) => ({
        color: theme.palette.textColor.main, 
        fontSize: '1.0625rem', 
        fontWeight: '600', 
        lineHeight: '1.1765',
        fontFamily: 'inherit',
        '&:hover': horizontal ? null : {textDecoration: 'underline' },
        zIndex: 200,
    }))

    const MutualFriendsList = styled(Typography)(({theme}) => ({
        display: 'flex',
        color: theme.palette.textColor.secondary, 
        fontSize: '.9375rem', 
        fontWeight: 'fontWeightRegular', 
        lineHeight: '1.3333',
        fontFamily: 'inherit',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 200,
    }))

    const CardActionsStyled = styled(CardActions)(({horizontal}) => ({
        display: 'flex', 
        flexDirection: horizontal ? 'row' : 'column', 
        gap: '6px', 
        width: '100%', 
        '&>:not(:first-of-type)': {marginLeft: 0}, 
        paddingTop: 0 ,
        zIndex: 200,
    }))

    const ContainerStyled = styled(Box)({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 1,
    })

    const handleMutualFriendClick = (payload) => {
        dispatch(setUser(payload));
    }

    return (
        <>
        <CardStyled horizontal={horizontal}>
            <Link to={referenseForLinks}  onClick={()=>handleLinkClick(friend)}>
                <CardMediaStyled horizontal={horizontal}
                    image={friend.profilePicture}
                    title={friend.fullName}
                    alt="Profile Picture"
                />
            </Link>
            <ContainerStyled>
                <CardContentStyled>
                    <Link to={referenseForLinks} onClick={()=>handleLinkClick(friend)} sx={{width: '100%',}}>
                        <FriendName horizontal={horizontal}>{friend.fullName}</FriendName>
                    </Link>
                    <Box sx={{ display: 'flex', gap: 1/2, height: 30}}>
                        <List sx={{ display: 'flex', '&:nth-last-of-type()': {ml: '-15%'}}}>
                            {mutialFriendsAvatars && mutialFriendsAvatars.map(el => 
                                <Link onClick={()=>handleMutualFriendClick(el)} to={`/Profile`} key={el.id}>
                                    <Avatar src={el.profilePicture} sx={{width: 16, height: 16, zIndex: 1000}}/>
                                </Link>)}
                        </List>
                        {mutualFriends.length>0 && <Tooltip title={listMutualFriends}>
                            <MutualFriendsList>
                                {countMutualFriends} mutual friends
                            </MutualFriendsList>
                        </Tooltip>}
                    </Box>
                </CardContentStyled>
                <CardActionsStyled horizontal={horizontal}>
                    {addButton}
                    {removeButton}
                </CardActionsStyled>
            </ContainerStyled>
        </CardStyled>
        </>
    )

}

export default Friend;