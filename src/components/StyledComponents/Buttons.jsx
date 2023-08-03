import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ButtonStyled = styled(Button)({
    fontFamily: 'inherit',
    width: '100%',
    variant: 'contained',
    cursor: 'pointer',
    textTransform: 'none',
    boxShadow: 'none',
    touchAction: 'manipulation',
    paddingLeft: '8px',
    paddingRight: '8px',
    '&:hover': {boxShadow: 'none'},
})
