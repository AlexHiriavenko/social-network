import styled from "@emotion/styled";
import { Box, Typography, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";


export const TitleStyled = styled('h1')(({theme}) => ({
    fontWeight: 900,
    fontSize: '1.5rem',
    fontFamily: 'inherit',
    color: theme.palette.textColor.content,
}))

export const LinkStyled = styled(NavLink)(({ theme }) => ({
    fontFamily: 'inherit',
    fontSize: '.8125rem',
    fontWeight: 400,
    lineHeight: 1.2308,
    paddingBottom: 1,
    color: theme.palette.textColor.secondary,
    textDecoration: 'none',
    '&:visited': { color: theme.palette.textColor.secondary },
    '&:hover': { textDecoration: 'underline' },
}))

export const SubTitleStyled = styled(Typography)(({ theme }) => ({
    paddingBottom: 10,
    fontWeight: 600,
    textAlign: 'left',
    lineHeight: 1.1765,
    fontSize: '1.0625rem',
    color: theme.palette.textColor.content,
    paddingTop: 10,
}))

export const MenuItem = styled(ListItemButton)(({ theme }) => ({
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

export const ArrowBackStyled = styled(NavLink)(({ theme }) => ({
    borderRadius: '50%',
    padding: '6px 8px',
    '&:hover': { backgroundColor: theme.palette.backgroundColor.hover, },
    width: '35px',
    height: '35px',
}))

export const SideBarWrapper = styled(Box)({
    width: '100%',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '100%',
    paddingTop: 0,
    marginTop: 0,
    position: 'relative',
    top:0
})

export const SideBarContentWrapper = styled(Box)({
    width: '100%',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: 'calc(100vh - 65px - 92px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    "&::-webkit-scrollbar": {
        width: "0",
      },
    display: 'flex',
    flexDirection: 'column',
})

