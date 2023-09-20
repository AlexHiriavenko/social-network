import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const SideBarWrapper = styled(Box)({
    width: '100%',
    paddingLeft: '8px',
    paddingRight: '8px',
})

export const SectorTitle = styled(Typography)(({theme}) => ({
    padding: '16px 4px',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.2,
    textAlign: 'left',
    color: theme.palette.textColor.content
}))

export const SectorHeader = styled(Box)({
    width:'100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const FriendsContainer = styled(Box)({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
}) 

export const SectionWraper = styled(Box)(({theme}) => ({
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: 0,
    height: '100%',
    boxSizing: 'content-box',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.backgroundColor.page,
    "&::-webkit-scrollbar": {
        width: 0,
      },
    [theme.breakpoints.down('sm')]: {backgroundColor: theme.palette.backgroundColor.section,}
}))

export const H1Styled = styled('h1')(({theme}) => ({
    fontWeight: 900,
    fontSize: '1.5rem',
    fontFamily: 'inherit',
    color: theme.palette.textColor.content,
}))

export const LinkStyled = styled(NavLink)(({theme}) => ({
    fontFamily: 'inherit',
    fontSize: '1.0625rem',
    fontWeight: 400,
    lineHeight: 1.1765,
    paddingBottom: 1,
    color: theme.palette.textColor.blueLink,
    textDecoration: 'none'
}))
