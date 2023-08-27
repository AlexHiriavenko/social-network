import styled from "@emotion/styled";
import {SVGpersonGo, SVGpersonPlus, SVGPeople, SVGFriendsList, SVGBirthdays, SVGNext} from '../../components/SVG/svg';
import { NavLink } from "react-router-dom";
import { ListItem, Typography, Box, List } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

function SideBarList({activeItem}) {

    const theme = useTheme();
    const colorActiveSvg = theme.palette.accentColor.onDarkFone;
    const colorBaseSvg = theme.palette.textColor.content;

    const MenuItem = styled(NavLink)(({theme}) => ({
        display: 'flex',
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 8,
        paddingRight: 8,
        color: theme.palette.textColor.main,
        '&:hover': {backgroundColor: theme.palette.backgroundColor.hover,},
        '&:active': {backgroundColor: theme.palette.buttonColor.background}, 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
    }))

    const MenuItemContent = styled(Box)({
        display: 'flex',
        gap: 10,
        alignItems: 'center',
    })

    const IconContainer = styled(Box)(({activeelem}) => ({
        width: 36,
        height: 36,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: activeelem === "true" ? theme.palette.backgroundColor.activeIcon : theme.palette.buttonColor.background,
    }))

    const MenuItemName = styled(Typography)(({theme}) => ({
        fontWeight: 600,
        fontSize: '1.0625rem',
        lineHeight: 1.1765,
        color: theme.palette.textColor.content
    }))
    
    const ListItemStyled = styled(ListItem)({
        padding: 0
    })

    return(
        <List sx={{padding: 0}}>
            <ListItemStyled>
                <MenuItem to="/friends/home"
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.hover 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="Home" activeelem={activeItem ==="Home"? "true" : "false"}>
                            <SVGPeople color={activeItem ==="Home"? colorActiveSvg: colorBaseSvg} sx={{height: 36}}/>
                        </IconContainer>
                        <MenuItemName>
                            Home
                        </MenuItemName>
                    </MenuItemContent>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to="/friends/requests" 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="requests" activeelem={activeItem ==="requests"? "true" : "false"}>
                            <SVGpersonGo color={activeItem ==="requests" ? colorActiveSvg: colorBaseSvg}/>
                        </IconContainer>
                        <MenuItemName>
                            Friend requests
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.textColor.secondary}/>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to={"/friends/suggestions"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="suggestions" activeelem={activeItem ==="suggestions"? "true" : "false"}>
                            <SVGpersonPlus color={activeItem ==="suggestions" ? colorActiveSvg: colorBaseSvg}/>
                        </IconContainer>
                        <MenuItemName>
                            Suggestions
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.textColor.secondary}/>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to={"/friends/allfriends"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="allfriends" activeelem={activeItem ==="allfriends"? "true" : "false"}>
                            <SVGFriendsList color={activeItem ==="allfriends" ? colorActiveSvg: colorBaseSvg}/>
                        </IconContainer>
                        <MenuItemName>
                            All Friends
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.textColor.secondary}/>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to={"/friends/birthdays"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="birthdays" activeelem={activeItem ==="birthdays"? "true" : "false"}>
                            <SVGBirthdays color={activeItem ==="birthdays"? colorActiveSvg: colorBaseSvg}/>
                        </IconContainer>
                        <MenuItemName>
                            Birthdays
                        </MenuItemName>
                    </MenuItemContent>
                </MenuItem>
            </ListItemStyled>
{/*             <ListItemStyled>
                <MenuItem to={"/friends/customlists"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="customlists" sx={{bgcolor: theme.palette.buttonColor.background}}>
                            <SVGFriendsList color={activeItem ==="customlists"? colorActiveSvg: colorBaseSvg}/>
                        </IconContainer>
                        <MenuItemName>
                            Custom lists
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.textColor.secondary}/>
                </MenuItem>
            </ListItemStyled> */}
        </List>
    )
}

SideBarList.propTypes = {
    activeItem: PropTypes.string,

  };
  
SideBarList.defaultProps = {
    activeItem: '',

};

export default SideBarList;