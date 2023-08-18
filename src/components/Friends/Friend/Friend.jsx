/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, CardContent, CardMedia, Typography, Tooltip, Box, List, Avatar, CardActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { setUser } from "../../../redux/user.slice/user.slice";


function Friend (props) {

    const userProfileImageDefault = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANEhAODg0NDw0NDg0PDQ4NEBANDQ4QFhEXFhUVFRMYHSggGBolGxMTITEhJikrLi4uFyAzODMsNygtLisBCgoKDQ0NEA0PDysZFRkrLTctNzctKysrLTcrKystKzc3LSsrNysrLSsrNysrKy0rKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFBgMCB//EADQQAQACAAMEBQsFAQEAAAAAAAABAgMFEQQhMVESQVJhkhUiMjNxgaGxssHREyNCcpGCc//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/RAG2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfX6kgPkAAAAAAAAAAAAECpEAiQAAAAAAAAAAAAAAAAAAAAAAAIjXd1tHZMqm2+86R1RHF75TsMV/ctvtPCJ6mpozaqrhZfhU4V1nnOqxXDrH8Y/wAfQivO2BSeNY3qmPldLejHRnu4L4I5radjvhelGsdUxweDqsSkWiazwmJiXPbds04VtONZ31lqCsAqAAAAAAAAAAAAAAAAAAC5lezxiX3xrWu+VKW7kuHpTpab7SlVoRAkZVAlAAJBCtt2zxiVndvjfXuWkCOTnlyJWcxw4piWiI47+5Wa0AFQAAAAAAAAAAAAAAABDptirpSvV5sOZdRsvoU/rX5JVewhLKgAAACJSiQYudxpas6cYnXv4M1qZ9xw/Zb7MtUAGkAAAAAAAAAAAAAAAAQ6TLsTpYdZ5Rp/m5zjWyTHjzqTx4xySq1xCWVAAAAEJfN7aRMzwgGHnWLreK9mPnooQ9NqxOna1uczMa8nlDSJAVAQkAAAAAAAAAAAAAAB94GJNLRaOMS+CCq6jAxoxKxaJjv06pernNg2z9Gd+vRnjH3dBh4kWiJid0sK+wAAAGVm+17pw68d3S+axmG2xhRMRvvMTEadU85YFrTMzMzrM8VkR8pBpAAAAAAAAAAAAAAAAAAAgIFQ9tn2q+H6M7uU74eQg1tnznqvX3wsxm2F2p8Nvw58MG7fN8ONdNZ5bpj5qWLmuJbhpWO7izzUwfV7zaZmZmZnmhAqJAAAAAAAAAAAAAAAAAgB9YeHa86ViZ+S9sOW9PffWK7tI65bOFg1pGlaxGiarHwMptO+09HuXKZRhxxm8++Pw0BlVLyVhdmfFJ5LwuzPildAUvJWF2Z8Uo8lYXZnxSvAKPkrC7M+KTyVhdmfFK8Ao+SsLsz4pfNsow54TePZMfeGgAyb5LH8cSffXVUxssxa/wAelHOs6/Di6EXUxyVomN0xMTyndI6jH2emJGl6xPf1x7JYe3ZfbC86POpz649qyimAqAAAAAAAAAAENbLsu/nf3Qr5Ts3Tt0p4V+bfiGbViIhIIqEgAAAAAAAAAAAiY13TwlIDBzPYf0/Pr6Ezvjsz+FB1d6RaJrMaxMaTDmtrwJwrTWerfE846mpUeICoAAAAAAJpWbTERxmYiEL+TYPSv0p4UjX3zw+5VbGybPGFWKx755z1y9gYUAAAAAAAAAAAAAAAAZ2dYHSp04404/1lovjGp0q2r2qzHwByohLbIAAAAAA28ir5lp530/yI/LEb+TR+1Hfa0/HT7JVi8AyoAAAAAAAAAAAAAAAAADldorpe8cr2j4vh67X6zE/9L/VLybZAAAAAAHQ5R6qv/X1S550GUeqr7bfVKVYugMqAAAAAAAAAAAAAAAAAA5nbo/cxP72eCzmcaYt/bHyhWbQAEAAAAHQZR6qvtt9UglWLoDKgAAAAAAAAAAAAAAAIkhIDnc19bf8A5+mFQG4gAIAA/9k=';

    const { 
        mutualFriends,
        friend, 
        addButton, 
        removeButton, 
        horizontal,
        referenseForLinks,
        handleLinkClick,
        isAvatarMutualFriend,
        additionalButtons,
        moreMenuButton,
    } = props;

    const dispatch = useDispatch(); 

    const countForDisplayMF = 2;
    const countMutualFriends = mutualFriends.length;

    const mutialFriendsAvatars = isAvatarMutualFriend 
        ? (mutualFriends && mutualFriends.length > 2 ? mutualFriends.slice(0, 2) : mutualFriends)
        : null;

    const listMutualFriends =  mutualFriends && mutualFriends.length > countForDisplayMF
        ? ( 
            <ul>
                {mutualFriends.slice(0, countForDisplayMF).map(el => <li key={el.id}>{el.fullName}</li>)}
                <li>and {countMutualFriends-countForDisplayMF} more...</li>
            </ul>
            ) 
        : ( 
            <ul>
                {mutualFriends.map(el => <li key={el.id}>{el.fullName}</li>)}
            </ul>
            );

    const CardStyled = styled(Card)(({horizontal, theme}) => ({
        maxWidth: horizontal ? "100%" : "250px",
        minWidth: horizontal ? '250px' : "200px",
        width: horizontal ? '100%' : null,
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? 'center' : null,
        margin: "4px",
        flexShrink: 1,
        backgroundColor: horizontal ? 'inherit' : theme.palette.backgroundColor.card,
        '&:hover': horizontal ? 'inherit' : {backgroundColor: theme.palette.backgroundColor.page,},
        boxShadow:  horizontal ? 'none' : null,
        border: horizontal ? null: `solid 1px ${theme.palette.border.card}`,
        zIndex: 100,
        pointerEvents: horizontal ? 'none' : 'all',
    }));

    const CardMediaStyled = styled(CardMedia)(({horizontal}) => ({
        width: horizontal ? '60px' : '100%',
        height: horizontal ? '60px' : null,
        borderRadius: horizontal ? '50%' : null,
        paddingTop: '100%',
    }))

    const CardContentStyled = styled(CardContent)({
        display: 'flex', 
        flexDirection: 'column', 
        paddingBottom: 0,
    })

    const FriendName = styled(Typography)(({theme, horizontal}) => ({
        color: theme.palette.textColor.main, 
        fontSize: '1.0625rem', 
        fontWeight: '600', 
        lineHeight: '1.1765',
        fontFamily: 'inherit',
        '&:hover': horizontal ? null : {textDecoration: 'underline' },
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
    }))

    const CardActionsStyled = styled(CardActions)(({horizontal}) => ({
        display: 'flex', 
        flexDirection: horizontal ? 'row' : 'column', 
        gap: '6px', 
        width: '100%', 
        '&>:not(:first-of-type)': {marginLeft: 0}, 
        paddingTop: 0 ,
    }))

    const ContainerStyled = styled(Box)({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 1,
        justifyContent: 'center',

    })

    const handleMutualFriendClick = (payload) => {
        dispatch(setUser(payload));
    }

    return (
        <>
        <CardStyled horizontal={horizontal}>
            <Link to={referenseForLinks}  onClick={handleLinkClick}>
                <CardMediaStyled horizontal={horizontal}
                    image={friend.profilePicture ? friend.profilePicture : userProfileImageDefault}
                    title={friend.fullName}
                    alt="Profile Picture"
                />
            </Link>
            <ContainerStyled>
                <CardContentStyled>
                    <Link to={referenseForLinks} onClick={handleLinkClick} sx={{width: '100%',}}>
                        <FriendName horizontal={horizontal}>{friend.fullName}</FriendName>
                    </Link>
                    <Box sx={{ display: 'flex', gap: 1/2, height: 30}}>
                        <List sx={{ display: 'flex', '&:nth-last-of-type()': {ml: '-15%'}}}>
                            {mutialFriendsAvatars && mutialFriendsAvatars.map(el => 
                                <Link onClick={(e) => {e.stopPropagation(); handleMutualFriendClick(el)}} to={`/Profile`} key={el.id}>
                                    <Avatar src={el.profilePicture ? el.profilePicture: userProfileImageDefault} 
                                        sx={{width: 16, height: 16, zIndex: 1000, pointerEvents: 'all'}}/>
                                </Link>)}
                        </List>
                        {mutualFriends.length>0 && <Tooltip sx={{pointerEvents: 'all'}} title={listMutualFriends}>
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
            {moreMenuButton}
            {additionalButtons}
        </CardStyled>
        </>
    )
}

export default Friend;