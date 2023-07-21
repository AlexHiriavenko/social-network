import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const GreyButton = styled(Button)({
    fontFamily: 'inherit',
    variant: 'contained',
    width: '100%',
    backgroundColor: '#E4E6EB', 
    color: 'black',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#cdcfd3',}
});

export const BlueButton = styled(Button)({
    fontFamily: 'inherit',
    variant: 'contained',
    width: '100%',
    backgroundColor: '#E7F3FF', 
    color: '#1877F2',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#cfdae5',}
});

export const StandardButton = styled(Button)({
        fontFamily: 'inherit',
        variant: 'contained',
        width: '100%',
        textTransform: 'none',
    });