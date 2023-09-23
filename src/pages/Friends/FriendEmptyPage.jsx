import { SVGNoFrienSelected } from '../../components/SVG/svg';
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';

function FriendEmptyPage(props) {

    const EmptyPage = styled(Box)({
        width: '100%',
        height: '89vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    })

    const MessageOnPage = styled(Typography)(({theme}) => ({
        color: theme.palette.textColor.secondary,
        fontFamily: 'inherit',
        fontSize: '1.25rem',
        fontWight: 700,
        lineHeight: 1.2,
    }))

    return(
        <EmptyPage>
            <Box sx={{width: 112}}>
                <SVGNoFrienSelected />
            </Box>
            <MessageOnPage>{props.children}</MessageOnPage>
        </EmptyPage>
    )
}

FriendEmptyPage.propTypes = {
    children: PropTypes.node,
  };
  
FriendEmptyPage.defaultProps = {
    children: <></>,
  };

export default FriendEmptyPage;