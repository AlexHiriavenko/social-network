/* eslint-disable react/prop-types */
import { Card, CardContent, CardMedia, Typography, Tooltip, Box, List, Avatar, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

function Friend (props) {

    const { 
        mutualFriends, 
        friend, 
        addButton, 
        removeButton, 
        mutialFriendsClick,
    } = props;

    const mutialFriendsAvatars = (mutualFriends && mutualFriends.length > 2 ? mutualFriends.slice(1) : mutualFriends);

    return (
        <>
        <Card sx={{ maxWidth: "250px",
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    m: "4px",
                    flexShrink: 1,
                    }}>
            <Link href="#">
                <CardMedia
                    image={friend.profilePicture}
                    title="Profile Picture"
                    alt="Profile Picture"
                    sx={{ width: '100%', pt: '100%'/* , minHeight: '240px' */}}
                />
            </Link>    
            <CardContent sx={{ display: 'flex', flexDirection: 'column', pb: 0}}>
                <Link href="#" sx={{width: '100%',}}>
                    <Typography sx={{color: 'text.primary', 
                                    fontSize: '1.0625rem', 
                                    fontWeight: '600', 
                                    lineHeight: '1.1765',
                                    fontFamily: 'inherit',
                                    '&:hover': {textDecoration: 'underline' } }}>
                        {friend.fullName}
                    </Typography>
                </Link>
                <Box sx={{ display: 'flex', gap: 1/2, height: 30}}>
                     <List sx={{ display: 'flex', '&:nth-last-of-type()': {ml: '-15%'}}}>
                        {mutialFriendsAvatars.map(el => <Link href="#" key={el.id}><Avatar src={el.profilePicture} sx={{width: 16, height: 16}}/></Link>)}
                    </List>
                    {mutualFriends.length>0 && <Tooltip title={<ul>{mutualFriends.map(el => <li key={el.id}>{el.fullName}</li>)}</ul>}>
                        <Typography  onClick={mutialFriendsClick} sx={{ display: 'flex',
                                            color: 'text.secondary', 
                                            fontSize: '.9375rem', 
                                            fontWeight: 'fontWeightRegular', 
                                            lineHeight: '1.3333',
                                            fontFamily: 'inherit',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            }}>
                            mutual friends
                        </Typography>
                    </Tooltip>}
                </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', '&>:not(:first-of-type)': {ml: 0}, pt:0 }}>
                {addButton}
                {removeButton}
            </CardActions>
        </Card>
        </>
    )

}

export default Friend;