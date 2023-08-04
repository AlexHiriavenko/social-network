import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const PageBoxFriends = styled(Box)({
    width: '100%', 
    maxWidth: '1920px', 
    display: 'flex', 
    minHeight: '93vh', 
    margin: 'auto',
})

export const PageBoxFriendsWrapper = styled(Box)(({theme}) => ({
    width: '100%', 
    display: 'flex', 
    minHeight: '93vh', 
    justifyItem: 'center',
    backgroundColor: theme.palette.backgroundColor.page
}))
