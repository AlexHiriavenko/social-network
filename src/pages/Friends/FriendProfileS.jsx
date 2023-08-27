import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { Box, SwipeableDrawer } from "@mui/material";
import { Profile } from '../index';
import { setCurrentFriend, } from '../../redux/friends/friends.slise';
import { SVGArrowBack } from '../../components/SVG/svg';
import { SubTitleStyled, ArrowBackStyled,} from './SideBarStyledComponents';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';


function FriendProfileS(props) {

    const { drawerOpen, setDrawerOpen, currentFriend, subtitleText } = props;
    const dispatch = useDispatch();
    const theme = useTheme();

    const SectionWraper = styled(Box)(({theme}) => ({
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
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

    return(
            <SwipeableDrawer
                    anchor={'right'}
                    open={drawerOpen}
                    onClose={() => {}}
                    onOpen={() => {}}
                    variant="persistent"
                    sx={{[theme.breakpoints.up('sm')]: {display: 'none'},}}
                >
                <SectionWraper>
                    {
                        !(currentFriend.id === undefined) && 
                        <>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', py: 1,}}>
                                <ArrowBackStyled onClick={() => {setDrawerOpen(false); dispatch(setCurrentFriend({}));}}>
                                    <SVGArrowBack />
                                </ArrowBackStyled>
                                <Box sx={{ display: 'flex', gap: 1 / 2, flexDirection: 'column' }}>
                                    <SubTitleStyled onClick={() => {setDrawerOpen(false); dispatch(setCurrentFriend({}));}}>
                                        {subtitleText}
                                    </SubTitleStyled>
                                </Box>
                            </Box>
                            <Profile/>
                        </>
                    }
                </SectionWraper>
            </SwipeableDrawer>
    )
}

FriendProfileS.propTypes = {
    drawerOpen: PropTypes.bool,
    setDrawerOpen: PropTypes.func,
    currentFriend: PropTypes.object,
    subtitleText: PropTypes.string,
  };
  
FriendProfileS.defaultProps = {
    drawerOpen: false,
    setDrawerOpen: () => {},
    currentFriend: {},
    subtitleText: '',
  };

export default FriendProfileS;
