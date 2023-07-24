import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge, Box } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { mockInfo } from "../../HeaderSearch/SeacrhComponents/mockData";
import { useTheme } from "@mui/material/styles";

function HeaderMessageOptions() {
    const theme = useTheme();
    const [anchorMessageMenu, setAnchorMessageMenu] = React.useState(null);
    const toggleMenu = () =>
        anchorMessageMenu
            ? setAnchorMessageMenu(null)
            : setAnchorMessageMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton
                    onClick={toggleMenu}
                    sx={({ pt: 1, pb: 1 }, { pl: { xs: 0.5, sm: 1 }, pr: { xs: 0.5, sm: 1 } })}
                >
                    <Badge badgeContent={4} color="secondary">
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.hoverColor.dark,
                                minWidth: "40px",
                                minHeight: "40px",
                            }}
                        >
                            <ForumIcon style={{ color: theme.palette.textColor.content }} />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorMessageMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorMessageMenu)}
                onClose={toggleMenu}
                slotProps={{
                    paper: {
                        className: "header__options-drop-menu",
                        style: { backgroundColor: theme.palette.backgroundColor.section },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        component={"h4"}
                        fontWeight={600}
                        sx={{ color: theme.palette.textColor.content }}
                    >
                        Chats
                    </Typography>
                    <Box>
                        <Tooltip title="See all in Messenger">
                            <IconButton
                                sx={{
                                    "&:hover": { backgroundColor: theme.palette.hoverColor.main },
                                }}
                            >
                                <ZoomOutMapIcon sx={{ color: theme.palette.textColor.content }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New Message" sx={{ ml: 0.5 }}>
                            <IconButton
                                sx={{
                                    "&:hover": { backgroundColor: theme.palette.hoverColor.main },
                                }}
                            >
                                <EditNoteIcon sx={{ color: theme.palette.textColor.content }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
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
                            <Box>
                                <Typography
                                    fontSize={15}
                                    fontWeight={600}
                                    sx={{ color: theme.palette.textColor.content }}
                                >
                                    {user.userName}
                                </Typography>
                                <Typography
                                    fontSize={14}
                                    noWrap
                                    sx={{ color: theme.palette.textColor.content }}
                                >
                                    {user.message}
                                </Typography>
                            </Box>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}

export default HeaderMessageOptions;
