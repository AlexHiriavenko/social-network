import React from "react";
import { useDispatch } from "react-redux";
import {
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
} from "@mui/material";
import { default as AddOption } from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useTheme } from "@mui/material/styles";
import { openCreateModal } from "../../../../redux/modal.slice/modal.slice";
import {
    AvatarStyled,
    MenuItemStyled,
    BtnCreate,
} from "../headerOptionsStyled";

function HeaderCreateOptions() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorCreateMenu, setAnchorCreateMenu] = React.useState(null);

    const toggleMenu = () =>
        anchorCreateMenu
            ? setAnchorCreateMenu(null)
            : setAnchorCreateMenu(document.querySelector(".anchor-menu"));

    const handleOpen = () => {
        toggleMenu();
        dispatch(openCreateModal());
    };

    return (
        <>
            <Tooltip title="Create" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={toggleMenu}>
                    <AvatarStyled>
                        <AddOption
                            style={{ color: theme.palette.textColor.content }}
                        />
                    </AvatarStyled>
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
                        style: {
                            backgroundColor:
                                theme.palette.backgroundColor.section,
                        },
                    },
                }}>
                <Typography
                    variant="h5"
                    component={"h4"}
                    p={2}
                    fontWeight={600}
                    color={theme.palette.textColor.content}>
                    Create
                </Typography>
                <MenuItemStyled onClick={handleOpen}>
                    <BtnCreate>
                        <PostAddIcon />
                    </BtnCreate>
                    <Typography
                        fontWeight={600}
                        sx={{ color: theme.palette.textColor.content }}>
                        Post
                    </Typography>
                </MenuItemStyled>
            </Menu>
        </>
    );
}

export default HeaderCreateOptions;
