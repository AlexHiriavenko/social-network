import Friend from "../../../components/Friends/Friend/Friend";
import { Box, Divider } from "@mui/material";
import { ButtonStyled } from '../../../components/StyledComponents/Buttons';
import SideBarList from '../SideBarList'
import SideBarHeader from '../../../components/Friends/SideBar/SideBarHeader';
import {SidebarStyled} from '../../../components/StyledComponents/SideBarFriends'
import { SectorTitle, SectorHeader, FriendsContainer, SectionWraper, H1Styled, LinkStyled, SideBarWrapper } from '../../../components/StyledComponents/FriendPageComponents';
import { useTheme } from '@mui/material/styles';
import {PageBoxFriends} from '../../../components/StyledComponents/PageBoxFriends';
import PropTypes from 'prop-types';


function FriendsHomeLM(props) {

    const { 
        friendsRequestsToUser, 
        friendSuggestions, 
        handleClickLinklocal, 
        handleClickConfirm, 
        handleClickRemove,
        handleClickAdd,
        handleClickRemoveSuggestion,
        handleScroll,
    } = props;

    const theme = useTheme();

    const friendsRequestsList = friendsRequestsToUser.map(fr => 
                            <Friend key={fr.id}
                                    referenseForLinks={"/friends/requests/"}
                                    handleLinkClick={() => handleClickLinklocal(fr.user)}
                                    mutualFriends={fr.mutualFriends}
                                    isAvatarMutualFriend={true}
                                    friend={fr.user} 
                                    addButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.primary}} 
                                                                    variant="contained" 
                                                            onClick={() => handleClickConfirm(fr)}>Confirm</ButtonStyled>}
                                    removeButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                                                                    color: theme.palette.textColor.content,
                                                                    '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover}}} 
                                                            onClick={() => handleClickRemove(fr)}>Remove</ButtonStyled>}
                            />)
                            
    const divider = friendSuggestions.length > 0 && friendsRequestsToUser.length > 0 
        ? <Divider sx={{ my: '12px', borderColor: theme.palette.border.card}}/>
        : null;

    const friedSuggestionsList = friendSuggestions.map(fr => 
                            <Friend 
                                key={fr.friend.id}
                                referenseForLinks={"/friends/suggestions/"}
                                handleLinkClick={() => handleClickLinklocal(fr.friend)}
                                mutualFriends={fr.mutualFriends}
                                isAvatarMutualFriend={true}
                                friend={fr.friend} 
                                addButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.blueLight,
                                                            '&:hover': {backgroundColor: theme.palette.buttonColor.blueLightHover,},
                                                            color: theme.palette.textColor.blueLink}} 
                                                        onClick={() => handleClickAdd( fr.friend.id)}>Add friend</ButtonStyled>}
                                removeButton={<ButtonStyled sx={{backgroundColor: theme.palette.buttonColor.background,
                                                            '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},
                                                            color: theme.palette.textColor.content}}
                                                    onClick={() =>  handleClickRemoveSuggestion(fr)}>Remove</ButtonStyled>}
                            />)

    return(
        <PageBoxFriends sx={{ display: 'flex', [theme.breakpoints.down('sm')]: {
            display: 'none',
        },}}>
            <SidebarStyled >
                <SideBarWrapper>
                    <SideBarHeader>
                        <H1Styled>Friends</H1Styled>
                    </SideBarHeader>
                    <SideBarList  activeItem={"Home"}/>
                </SideBarWrapper>
            </SidebarStyled>         
            <SectionWraper onScroll={handleScroll}>
                {friendsRequestsToUser.length > 0 && 
                <Box sx={{px: '16px'}}>
                    <SectorHeader>
                        <SectorTitle>Friend requests</SectorTitle>
                        <LinkStyled to="/friends/requests">See All</LinkStyled>
                    </SectorHeader>
                    <FriendsContainer>
                        {friendsRequestsList}
                    </FriendsContainer>
                </Box>
                }
                {divider}
                {friendSuggestions.length > 0 && 
                <Box sx={{px: '16px'}}>
                    <SectorHeader>
                        <SectorTitle>People you may know</SectorTitle>
                        <LinkStyled to="/friends/suggestions">See All</LinkStyled>
                    </SectorHeader>
                    <FriendsContainer>
                        {friedSuggestionsList}
                    </FriendsContainer>
                </Box>
                }
            </SectionWraper>
        </PageBoxFriends>
    )
}

FriendsHomeLM.propTypes = {
    friendsRequestsToUser: PropTypes.arrayOf(PropTypes.object),
    friendSuggestions: PropTypes.arrayOf(PropTypes.object),
    handleClickLinklocal: PropTypes.func,
    handleClickConfirm: PropTypes.func,
    handleClickRemove: PropTypes.func,
    handleClickAdd: PropTypes.func,
    handleClickRemoveSuggestion: PropTypes.func,
    handleScroll: PropTypes.func,
  };
  
  FriendsHomeLM.defaultProps = {
    friendsRequestsToUser: [],
    friendSuggestions: [],
    handleClickLinklocal: () => { },
    handleClickConfirm: () => { },
    handleClickRemove: () => { },
    handleClickAdd: () => { },
    handleClickRemoveSuggestion: () => { },
    handleScroll: () => { },
  };

export default FriendsHomeLM;