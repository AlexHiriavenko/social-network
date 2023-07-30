import styled from "@emotion/styled";
import {SVGpersonGo, SVGpersonPlus, SVGPeople, SVGFriendsList, SVGBirthdays, SVGNext} from '../../components/SVG/svg';
import { NavLink } from "react-router-dom";
import { ListItem, Typography, Box, List } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function SideBarList() {

    const theme = useTheme();

    const MenuItem = styled(NavLink)(({theme}) => ({
        display: 'flex',
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 8,
        paddingRight: 8,
/*         color: '#050505',
        '&:hover': {backgroundColor: '#F0F2F5',},
        '&:active': {backgroundColor: '#E4E6EB',}, */
        color: theme.palette.textColor.main,
        '&:hover': {backgroundColor: theme.palette.backgroundColor.page,},
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

    const IconContainer = styled(Box)({
        width: 36,
        height: 36,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
    })

    const MenuItemName = styled(Typography)({
        fontWeight: 600,
        fontSize: '1.0625rem',
        lineHeight: 1.1765,
    })
    
    const ListItemStyled = styled(ListItem)({
        padding: 0
    })

    return(
        <List sx={{padding: 0}}>
            <ListItemStyled>
                <MenuItem to="/friends/home"
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="Home" sx={{bgcolor: theme.palette.backgroundColor.activeIcon}}>
                            <SVGPeople color={'#FFF'} sx={{height: 36}}/>
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
                        <IconContainer data-path="requests" sx={{bgcolor: theme.palette.buttonColor.background}}>
                            <SVGpersonGo/>
                        </IconContainer>
                        <MenuItemName>
                            Friend requests
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.backgroundColor.iconFill}/>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to={"/friends/suggestions"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="suggestions" sx={{bgcolor: theme.palette.buttonColor.background}}>
                            <SVGpersonPlus/>
                        </IconContainer>
                        <MenuItemName>
                            Suggestions
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.backgroundColor.iconFill}/>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to={"/friends/allfriends"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="allfriends" sx={{bgcolor: theme.palette.buttonColor.background}}>
                            <SVGFriendsList/>
                        </IconContainer>
                        <MenuItemName>
                            All Friends
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.backgroundColor.iconFill}/>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to={"/friends/birthdays"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="birthdays" sx={{bgcolor: theme.palette.buttonColor.background}}>
                            <SVGBirthdays/>
                        </IconContainer>
                        <MenuItemName>
                            Birthdays
                        </MenuItemName>
                    </MenuItemContent>
                </MenuItem>
            </ListItemStyled>
            <ListItemStyled>
                <MenuItem to={"/friends/customlists"} 
                        style={({ isActive }) => {return{backgroundColor: isActive 
                        ? theme.palette.backgroundColor.page 
                        : null}}}>
                    <MenuItemContent>
                        <IconContainer data-path="customlists" sx={{bgcolor: theme.palette.buttonColor.background/* '#E4E6EB' */}}>
                            <SVGFriendsList/>
                        </IconContainer>
                        <MenuItemName>
                            Custom lists
                        </MenuItemName>
                    </MenuItemContent>
                    <SVGNext color={theme.palette.backgroundColor.iconFill /* '#8D949E' */}/>
                </MenuItem>
            </ListItemStyled>
        </List>
    )
}

export default SideBarList;