import styled from "@emotion/styled";
import { Button, Box } from "@mui/material";

export const ButtonStyled = styled(Box)(/* ({bgColor, color, bgColorHover, bgColorActive}) => ( */{
    fontFamily: 'inherit',
    width: '100%',
/*     backgroundColor: {bgColor},
    color: {color},
    '&:hover': {backgroundColor: {bgColorHover}},
    '&:active': {backgroundColor: {bgColorActive}}, */
    paddingLeft: '12px',
    paddingRight: '12px',
    fontWeight: 600,
    fontSize: '.9375rem',
    lineHeight: 1.3333,
    cursor: 'pointer',
    textAlign: 'center',
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 4,
})/* ) */

export const GreyButton = styled(Button)(/* (props) => ( */{
    fontFamily: 'inherit',
    variant: 'contained',
    width: '100%',
    backgroundColor: /* props.bgColor */'#E4E6EB', 
    color:  'black',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#cdcfd3'/* backgroundColor: props.hoverBgColor */},
})/* ) */;

export const BlueButton = styled(Button)({
    fontFamily: 'inherit',
    variant: 'contained',
    width: '100%',
    backgroundColor: '#E7F3FF', 
    color: '#1877F2',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#cfdae5', boxShadow: 'none'},
    boxShadow: 'none',
});

export const StandardButton = styled(Button)({
        fontFamily: 'inherit',
        variant: 'contained',
        width: '100%',
        textTransform: 'none',
        paddingLeft: '8px',
        paddingRight: '8px',
        boxShadow: 'none',
        '&:hover': {boxShadow: 'none'},
    });