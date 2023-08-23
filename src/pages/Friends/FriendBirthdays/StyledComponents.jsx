import styled from "@emotion/styled";
import { Box, Typography, Tooltip, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledItemsContainer = styled(Box)({
    display: 'flex', 
    flexDirection: 'column', 
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
})

export const ContemtWraper = styled(Box)(({theme}) => ({
    width:  '500px',
    backgroundColor: theme.palette.backgroundColor.section,
    padding: '16px',
    borderRadius: 8,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
}))

export const CardMediaStyled = styled(CardMedia)({
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    '&:hover': { width: '102%', height: '102%', transitionDuration: '100ms'}
})

export const StyledLink = styled(Link)({
    width:  '60px',
    height:  '60px',
})

export const StyledTooltip = styled(Tooltip)({
    width:  '60px',
    height:  '60px',
})

export const StyledHeader = styled(Typography)(({theme}) => ({
    color: theme.palette.textColor.main, 
    fontFamily: 'inherit',
    fontSize: '1.25rem',
    textAlign: 'left',
    lineHeight: 1.2,
    fontWeight: 700,
    paddingBottom: 8,
}))

export const StyledDescription = styled(Typography)(({theme}) => ({
    fontFamily: 'inherit',
    fontSize: '.9375rem',
    textAlign: 'left',
    lineHeight: 1.3333,
    fontWeight: 300,
    color: theme.palette.textColor.main, 
}))

export const FriendName = styled(Link)({
    textDecoration: 'none',
    '&:hover': {textDecoration: 'underline', cursor: 'pointer', },
    color: 'inherit',
    fontWeight: 500,
})

export const BirthdayDate = styled(Typography)(({theme}) => ({
    display: 'flex',
    color: theme.palette.textColor.secondary, 
    fontSize: '.9375rem', 
    fontWeight: 'fontWeightRegular', 
    lineHeight: '1.3333',
    fontFamily: 'inherit',
    alignItems: 'center',
}))

export const CardContentStyled = styled(CardContent)({
    display: 'flex', 
    padding: 0,
    '&:last-child' : {paddingBottom:0}
})