import React from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Box } from "@mui/material";
import { default as AddOption } from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import { useTheme } from "@mui/material/styles";

function HeaderCreateOptions() {
    const theme = useTheme();
    const [anchorCreateMenu, setAnchorCreateMenu] = React.useState(null);

    const toggleMenu = () =>
        anchorCreateMenu
            ? setAnchorCreateMenu(null)
            : setAnchorCreateMenu(document.querySelector(".anchor-menu"));

    return (
        <>
            <Tooltip title="Create" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={toggleMenu}>
                    <Avatar
                        sx={{
                            bgcolor: theme.palette.hoverColor.dark,
                            minWidth: "40px",
                            minHeight: "40px",
                        }}
                    >
                        <AddOption style={{ color: theme.palette.textColor.content }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                autoFocus={false}
                sx={{ mt: "45px" }}
                anchorEl={anchorCreateMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                // keepMounted
                open={Boolean(anchorCreateMenu)}
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
                    p={2}
                    fontWeight={600}
                    sx={{ color: theme.palette.textColor.content }}
                >
                    Create
                </Typography>
                <MenuItem
                    onClick={toggleMenu}
                    sx={{
                        gap: 2,
                        mb: 1,
                        "&:hover": { backgroundColor: theme.palette.hoverColor.main },
                    }}
                >
                    <IconButton
                        sx={{
                            backgroundColor: "rgb(230, 228, 228)",
                            "&:hover": { backgroundColor: "rgb(230, 228, 228)" },
                        }}
                    >
                        <PostAddIcon />
                    </IconButton>
                    <Typography fontWeight={600} sx={{ color: theme.palette.textColor.content }}>
                        Post
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={toggleMenu}
                    sx={{
                        gap: 2,
                        mb: 1,
                        "&:hover": { backgroundColor: theme.palette.hoverColor.main },
                    }}
                >
                    <IconButton
                        sx={{
                            backgroundColor: "rgb(230, 228, 228)",
                            "&:hover": { backgroundColor: "rgb(230, 228, 228)" },
                        }}
                    >
                        <GroupsIcon />
                    </IconButton>
                    <Typography fontWeight={600} sx={{ color: theme.palette.textColor.content }}>
                        Group
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderCreateOptions;
