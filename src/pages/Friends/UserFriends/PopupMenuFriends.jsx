/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SVGThreeDots } from '../../../components/SVG/svg';
import styled from "@emotion/styled";
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PropTypes from 'prop-types';


function PopupMenuFriends(props) {

  const { handleClickUnfriend } = props; 

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const buttonRef = React.useRef(null);
  const isOpen = Boolean(anchorEl);

  const toggleMenu = () => {

    const getBoundingClientRect = () => {
      return buttonRef.current?.getBoundingClientRect();
    };

    setAnchorEl(anchorEl ? null : { getBoundingClientRect, nodeType: 1 });
  };    

  const MoreButton = styled(Box)(({theme}) => ({
    width: 24,
    height: 40,
    borderRadius: '50%',
    minWidth: 40,
    '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},
    '&:active': {backgroundColor: theme.palette.buttonColor.background},
    color: theme.palette.textColor.content,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'all',
    position: 'relative',
}));

const StyledAvatar = styled(Avatar)(({theme}) => ({
  width: 24,
  height: 40,
  borderRadius: '50%',
  minWidth: 40,
  backgroundColor: 'inherit',
  '&:hover': {backgroundColor: theme.palette.buttonColor.backgroundHover},
  '&:active': {backgroundColor: theme.palette.buttonColor.background},
  color: theme.palette.textColor.content,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
}));

  return (
    <>
        <MoreButton onClick={(e) => {e.stopPropagation(); toggleMenu()}} ref={buttonRef} id="friend-menu-button"
                                aria-controls={isOpen ? 'friend-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={isOpen ? 'true' : undefined}>
            <StyledAvatar>
              <SVGThreeDots color={theme.palette.textColor.content}/>
            </StyledAvatar>
              <Menu
                anchorEl={anchorEl}
                id="friend-menu-button"
                open={isOpen}
                onClose={toggleMenu}
                onClick={toggleMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    background: theme.palette.backgroundColor.card,
                    color: theme.palette.textColor.content,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    /* '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    }, */
                  },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
          <MenuItem sx={{width: '300px', }} onClick={(e) => {e.stopPropagation(); handleClickUnfriend(e); toggleMenu();}}>
            <PersonRemoveIcon sx={{margin: 1}}/>
            <Typography sx={{px: 2}}>Unfriend</Typography>
          </MenuItem>
        </Menu>
        </MoreButton>
    </>
  );
}

PopupMenuFriends.propTypes = {
  handleClickUnfriend: PropTypes.func,
};

PopupMenuFriends.defaultProps = {
  handleClickUnfriend: () => { },
};

export default React.memo(PopupMenuFriends);