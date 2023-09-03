import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mockInfo } from "../../HeaderSearch/SeacrhComponents/mockData";
import { AvatarStyled, BtnNotifyStyled, MenuItemStyled } from "../headerOptionsStyled";

function HeaderNotifyOptions() {
    const theme = useTheme();
    const [anchorNotifyMenu, setAnchorNotifyMenu] = React.useState(null);
    const toggleMenu = () =>
        anchorNotifyMenu
            ? setAnchorNotifyMenu(null)
            : setAnchorNotifyMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip title="Notifications" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={toggleMenu} sx={({ py: 1 }, { px: { xs: 0.5, sm: 1 } })}>
                    <Badge badgeContent={3} color="secondary">
                        <AvatarStyled>
                            <NotificationsIcon style={{ color: theme.palette.textColor.content }} />
                        </AvatarStyled>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorNotifyMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorNotifyMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        className: "header__options-drop-menu",
                        style: { backgroundColor: theme.palette.backgroundColor.section },
                    },
                }}
            >
                <Typography
                    variant="h5"
                    component={"h4"}
                    px={2}
                    py={1}
                    fontWeight={600}
                    sx={{ color: theme.palette.textColor.content }}
                >
                    Notifications
                </Typography>
                <Box display={"flex"} gap={1} mb={2} px={2}>
                    <BtnNotifyStyled>
                        <Typography fontSize={15} fontWeight={600}>
                            All
                        </Typography>
                    </BtnNotifyStyled>
                    <BtnNotifyStyled>
                        <Typography fontSize={15} fontWeight={600}>
                            Unread
                        </Typography>
                    </BtnNotifyStyled>
                </Box>
                {mockInfo.map((user) => {
                    return (
                        <MenuItemStyled key={user.userID} onClick={toggleMenu}>
                            <Avatar
                                sx={{ minWidth: "40px", minHeight: "40px" }}
                                alt="user icon"
                                src={user.userPhoto}
                            ></Avatar>
                            <Typography
                                fontSize={15}
                                sx={{ color: theme.palette.textColor.content }}
                            >
                                <b>{user.userName}</b> added a new post
                            </Typography>
                        </MenuItemStyled>
                    );
                })}
            </Menu>
        </>
    );
}

export default HeaderNotifyOptions;
