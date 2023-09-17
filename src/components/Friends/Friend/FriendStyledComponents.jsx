import styled from "@emotion/styled";
import { Card, CardContent, CardMedia, Typography, Box, CardActions } from "@mui/material";

export const CardStyled = styled(Card)(({horizontal, theme}) => ({
    maxWidth: horizontal ? "100%" : "250px",
    minWidth: horizontal ? '250px' : "200px",
    width: horizontal ? '100%' : null,
    display: "flex",
    flexDirection: horizontal ? "row" : "column",
    alignItems: horizontal ? 'center' : null,
    margin: "4px",
    flexShrink: 1,
    backgroundColor: horizontal ? 'inherit' : theme.palette.backgroundColor.card,
    '&:hover': horizontal ? 'inherit' : null,
    boxShadow:  horizontal ? 'none' : null,
    border: horizontal ? null: `solid 1px ${theme.palette.border.card}`,
    zIndex: 100,
    pointerEvents: horizontal ? 'none' : 'all',
}));

export const CardMediaStyled = styled(CardMedia)(({horizontal}) => ({
    width: horizontal ? '60px' : '100%',
    height: horizontal ? '60px' : null,
    borderRadius: horizontal ? '50%' : null,
    paddingTop: '100%',
}))

export const CardContentStyled = styled(CardContent)({
    display: 'flex', 
    flexDirection: 'column', 
    paddingBottom: 0,
})

export const FriendName = styled(Typography)(({theme, horizontal}) => ({
    color: theme.palette.textColor.main, 
    fontSize: '1.0625rem', 
    fontWeight: '600', 
    lineHeight: '1.1765',
    fontFamily: 'inherit',
    '&:hover': horizontal ? null : {textDecoration: 'underline' },
}))

export const MutualFriendsList = styled(Typography)(({theme}) => ({
    display: 'flex',
    color: theme.palette.textColor.secondary, 
    fontSize: '.9375rem', 
    fontWeight: 'fontWeightRegular', 
    lineHeight: '1.3333',
    fontFamily: 'inherit',
    alignItems: 'center',
    cursor: 'pointer',
}))

export const CardActionsStyled = styled(CardActions)(({horizontal}) => ({
    display: 'flex', 
    flexDirection: horizontal ? 'row' : 'column', 
    gap: '6px', 
    width: '100%', 
    '&>:not(:first-of-type)': {marginLeft: 0}, 
    paddingTop: 0 ,
}))

export const ContainerStyled = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'center',
})