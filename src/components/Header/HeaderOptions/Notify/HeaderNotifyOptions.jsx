import React, { useEffect, useRef, useState } from "react";
import {
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    Badge,
    Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mockInfo } from "../../HeaderSearch/SeacrhComponents/mockData";
import {
    AvatarStyled,
    BtnNotifyStyled,
    MenuItemStyled,
} from "../headerOptionsStyled";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { openCreateCommentModal } from "../../../../redux/modal.slice/modal.slice";
import { getPost } from "../../../../redux/post.slice/post.slice";
import { getPagebleNotifications } from "../../../../redux/notifications.slice/notifications.slice";

const StyledUnreadedPoint = styled("div")(({ theme }) => ({
    width: "13px",
    height: "13px",
    backgroundColor: theme.palette.accentColor.main,
    borderRadius: "100%",
    position: "absolute",
    right: "20px",

}));

function HeaderNotifyOptions() {
    const theme = useTheme();
    const [anchorNotifyMenu, setAnchorNotifyMenu] = React.useState(null);
    const toggleMenu = () =>
        anchorNotifyMenu
            ? setAnchorNotifyMenu(null)
            : setAnchorNotifyMenu(document.querySelector(".anchor-menu"));
    const [isAllNotifications, setIsAllNotifications] = useState(true);
    const newNotifications = useSelector(store => store.notifications.newNotifications);
    const allNotifications = useSelector(store => store.notifications.allNotifications);
    const [isFetching, setIsFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef(null);
    console.log(allNotifications);
    const box = document.querySelector("#notifications-menu-box");
    console.log(box);
    const dispatch = useDispatch();

    function checkNotification(postId) {
        dispatch(getPost(postId)).then(data => {
            dispatch(openCreateCommentModal(data.payload));
        })
    }

    useEffect(() => {
        box?.addEventListener("sroll", handleScroll);
        return box?.removeEventListener("sroll", handleScroll);
    }, [])

    function handleScroll(e) {
        // console.log(e.target.scrollTop);
        console.log(isFetching);
        console.log(e.target.scrollHeight)
        if (
            e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight) < 50 && !isFetching
        ) {
            setIsFetching(true);
        }
    }

    useEffect(() => {
        console.log(isFetching);
        if (isFetching) {
            dispatch(getPagebleNotifications({ page: currentPage, size: 10 }))
            console.log(currentPage);
            setCurrentPage(currentPage + 1);
            setIsFetching(false);
        }
    }, [isFetching]);

    // useEffect(() => {
    //     // if (anchorNotifyMenu) {
    //     const container = containerRef.current;
    //     console.log(container);
    //     container.addEventListener("scroll", handleScroll);
    //     // }
    // }, [anchorNotifyMenu])


    // function handleScroll(e) {
    //     console.log(e.target.documentElement.scrollHeight);
    //     console.log(e.target.documentElement.scrollTop);
    //     console.log(window.innerHeight);
    //     if (
    //         e.target.documentElement.scrollHeight -
    //         (e.target.documentElement.scrollTop + window.innerHeight) <
    //         e.target.documentElement.scrollHeight / 2
    //     ) {
    //         setFetching(true);
    //     }
    // }
    // useEffect(() => {
    //     if (fetching) {
    //         dispatch(getPagebleNotifications({ page: currentPage, size: 6 }))
    //         setCurrentPage(currentPage + 1);
    //         setFetching(false);
    //         const container = containerRef.current;
    //         console.log(menu);
    //         container.addEventListener("scroll", handleScroll);
    //     }
    // }, [fetching]);
    // const menu = document.querySelector("#notifications-menu");

    // useEffect(() => {

    //     // return () => {
    //     //     menu.removeEventListener("scroll", handleScroll);
    //     // };
    // }, [containerRef]);

    return (
        <>
            <Tooltip title="Notifications" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton
                    onClick={toggleMenu}
                    sx={({ py: 1 }, { px: { xs: 0.5, sm: 1 } })}>
                    <Badge badgeContent={newNotifications.length} color="secondary">
                        <AvatarStyled>
                            <NotificationsIcon
                                style={{
                                    color: theme.palette.textColor.content,
                                }}
                            />
                        </AvatarStyled>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Box id="notifications-menu-box" sx={{ maxHeight: "20px", overflowY: "auto" }}>
                <Menu
                    id="notifications-menu"
                    sx={{ mt: "45px", height: "40vh" }}
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
                            onScroll: handleScroll,
                            className: "header__options-drop-menu",
                            style: {
                                backgroundColor:
                                    theme.palette.backgroundColor.section,
                            },
                        },
                    }}
                    ref={containerRef}
                >
                    <Typography
                        variant="h5"
                        component={"h4"}
                        px={2}
                        py={1}
                        fontWeight={600}
                        sx={{ color: theme.palette.textColor.content }}>
                        Notifications
                    </Typography>
                    <Box display={"flex"} gap={1} mb={2} px={2}>
                        <BtnNotifyStyled onClick={() => setIsAllNotifications(true)}>
                            <Typography fontSize={15} fontWeight={600}>
                                All
                            </Typography>
                        </BtnNotifyStyled>
                        <BtnNotifyStyled onClick={() => setIsAllNotifications(false)}>
                            <Typography fontSize={15} fontWeight={600}>
                                Unread
                            </Typography>
                        </BtnNotifyStyled>
                    </Box>
                    {allNotifications.map((notification, index) => {
                        if (!isAllNotifications) {
                            if (notification.status === "pending") return (
                                <MenuItemStyled key={index} onClick={() => {
                                    toggleMenu();
                                    checkNotification(notification.updatedEntityId);
                                }}>
                                    <Avatar
                                        sx={{ minWidth: "40px", minHeight: "40px" }}
                                        alt="user icon"
                                        src={notification.sender.profilePicture}></Avatar>
                                    <Typography
                                        fontSize={15}
                                        sx={{ color: theme.palette.textColor.content }}>
                                        <b>{notification.sender.fullName}</b> {notification.content}
                                    </Typography>
                                    {notification.status === "pending" && <StyledUnreadedPoint />}
                                </MenuItemStyled>
                            )
                        }
                        return (
                            <MenuItemStyled key={index} onClick={() => {
                                toggleMenu();
                                checkNotification(notification.updatedEntityId);
                            }}>
                                <Avatar
                                    sx={{ minWidth: "40px", minHeight: "40px" }}
                                    alt="user icon"
                                    src={notification.sender.profilePicture}></Avatar>
                                <Typography
                                    fontSize={15}
                                    sx={{ color: theme.palette.textColor.content }}>
                                    <b>{notification.sender.fullName}</b> {notification.content}
                                </Typography>
                                {notification.status === "pending" && <StyledUnreadedPoint />}
                            </MenuItemStyled>
                        )
                    })}

                    {/* {mockInfo.map((user) => {
                    return (
                        <MenuItemStyled key={user.userID} onClick={toggleMenu}>
                            <Avatar
                                sx={{ minWidth: "40px", minHeight: "40px" }}
                                alt="user icon"
                                src={user.userPhoto}></Avatar>
                            <Typography
                                fontSize={15}
                                sx={{ color: theme.palette.textColor.content }}>
                                <b>{user.userName}</b> added a new post
                            </Typography>
                        </MenuItemStyled>
                    );
                })} */}
                </Menu>
            </Box>
        </>
    );
}

export default HeaderNotifyOptions;
