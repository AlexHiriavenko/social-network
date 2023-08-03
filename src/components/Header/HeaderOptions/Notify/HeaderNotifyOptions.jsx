import React from "react";
import {
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    Badge,
    Box,
    Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mockInfo } from "../../HeaderSearch/SeacrhComponents/mockData";

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
                <IconButton
                    onClick={toggleMenu}
                    sx={({ pt: 1, pb: 1 }, { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })}
                >
                    <Badge badgeContent={3} color="secondary">
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.hoverColor.dark,
                                minWidth: "40px",
                                minHeight: "40px",
                            }}
                        >
                            <NotificationsIcon style={{ color: theme.palette.textColor.content }} />
                        </Avatar>
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
                    pl={2}
                    pr={2}
                    pt={1}
                    pb={1}
                    fontWeight={600}
                    sx={{ color: theme.palette.textColor.content }}
                >
                    Notifications
                </Typography>
                <Box display={"flex"} gap={1} mb={2} pl={2} pr={2}>
                    <Button
                        color="inherit"
                        sx={{
                            width: "80px",
                            p: 0.5,
                            borderRadius: "12px",
                            backgroundColor: "rgb(240, 242, 245)",
                            textTransform: "capitalize",
                            "&:hover": { backgroundColor: "rgb(215, 220, 220)" },
                        }}
                    >
                        <Typography fontSize={15} fontWeight={600}>
                            All
                        </Typography>
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            width: "80px",
                            p: 0.5,
                            borderRadius: "12px",
                            backgroundColor: "rgb(240, 242, 245)",
                            textTransform: "capitalize",
                            "&:hover": { backgroundColor: "rgb(215, 220, 220)" },
                        }}
                    >
                        <Typography fontSize={15} fontWeight={600}>
                            Unread
                        </Typography>
                    </Button>
                </Box>
                {mockInfo.map((user) => {
                    return (
                        <MenuItem
                            key={user.userID}
                            onClick={toggleMenu}
                            sx={{
                                display: "flex",
                                gap: 1,
                                whiteSpace: "normal",
                                mb: 1,
                                "&:hover": { backgroundColor: theme.palette.hoverColor.main },
                            }}
                        >
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
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}

export default HeaderNotifyOptions;
