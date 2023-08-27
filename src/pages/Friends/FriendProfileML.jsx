import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Profile } from '../index';
import FriendEmptyPage from  './FriendEmptyPage';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';


const SectionWraper = styled(Box)(({theme}) => ({
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    padding: 10, 
    backgroundColor: theme.palette.backgroundColor.page,
    height: '100%',
    boxSizing: 'content-box',
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingBottom: 0,
    paddingTop: 0,
    "&::-webkit-scrollbar": {
        width: "0",
      },
}))

function FriendProfileML(props) {

    const { currentFriend, textMessage } = props;
    const theme = useTheme();

    return(
        <SectionWraper sx={{[theme.breakpoints.down('sm')]: {display: 'none',},}}>
            { 
                currentFriend.id === undefined && <FriendEmptyPage>{textMessage}</FriendEmptyPage>
            }
            {
                !(currentFriend.id === undefined) && <Profile/>
            }
        </SectionWraper>
    )
}

FriendProfileML.propTypes = {
    currentFriend: PropTypes.object,
    textMessage: PropTypes.string,
  };
  
FriendProfileML.defaultProps = {
    currentFriend: {},
    textMessage: '',
  };

export default FriendProfileML;