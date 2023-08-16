import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const PageBoxFriends = styled(Box)({
    width: '100%', 
    maxWidth: '1920px', 
    display: 'flex', 
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
    margin: 'auto',
    paddingBottom: 0,
})

export const PageBoxFriendsWrapper = styled(Box)(({theme}) => ({
    width: '100%', 
    display: 'flex', 
    minHeight: '90vh',
    height: 'calc(100vh - 64px)',
    justifyItem: 'center',
    backgroundColor: theme.palette.backgroundColor.page,
    paddingBottom: 0,
    fontFamily: theme.typography.fontFamily,
}))
