import React, { useEffect, useState } from "react";
import { IconButton, Typography, Menu, Avatar, Tooltip, Badge, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AvatarStyled, BtnNotifyStyled, MenuItemStyled } from "../headerOptionsStyled";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { openCreateCommentModal } from "../../../../redux/modal.slice/modal.slice";
import { getPost } from "../../../../redux/post.slice/post.slice";
import {
    addToAllNotifications,
    getNotificationsSize,
    getPagebleNotifications,
    setAllNotifications,
    setViewNotification,
} from "../../../../redux/notifications.slice/notifications.slice";

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
    const [isAllNotifications, setIsAllNotifications] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const toggleMenu = () =>
        anchorNotifyMenu
            ? setAnchorNotifyMenu(null)
            : setAnchorNotifyMenu(document.querySelector(".anchor-menu"));
    const newNotifications = useSelector((store) => store.notifications.newNotifications);
    const unreadedNotificationsSize = useSelector(
        (store) => store.notifications.unreadedNotificationsSize
    );
    const allNotifications = useSelector((store) => store.notifications.allNotifications);
    const isLoading = useSelector((store) => store.notifications.isLoading);
    const dispatch = useDispatch();

    function checkNotification(notification) {
        dispatch(getPost(notification.updatedEntityId)).then((data) => {
            if (notification.status === "pending") {
                dispatch(setViewNotification({ notificationId: notification.id }));
                dispatch(getNotificationsSize());
            }
            dispatch(openCreateCommentModal(data.payload));
        });
    }

    function handleScroll(e) {
        if (
            e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight) < 100 &&
            !isFetching
        ) {
            setIsFetching(true);
        }
    }

    function togleFilterNotification(isAllNotifications) {
        setIsAllNotifications(isAllNotifications);
        dispatch(setAllNotifications([]));
        setCurrentPage(0);
        setIsFetching(true);
    }

    useEffect(() => {
        if (isFetching && !isLoading) {
            const status = isAllNotifications ? "all" : "pending";
            dispatch(getPagebleNotifications({ page: currentPage, size: 5, status }));
            setCurrentPage(currentPage + 1);
        }
        setIsFetching(false);
    }, [isFetching]);

    useEffect(() => {
        dispatch(getNotificationsSize());
    }, []);

    useEffect(() => {
        if (newNotifications[0])
            dispatch(addToAllNotifications(newNotifications[newNotifications.length - 1]));
    }, [newNotifications]);

    return (
        <>
            <Tooltip title="Notifications" sx={{ p: { xs: "4px", sm: 1 } }}>
                <IconButton onClick={toggleMenu} sx={({ py: 1 }, { px: { xs: 0.5, sm: 1 } })}>
                    <Badge
                        badgeContent={unreadedNotificationsSize + newNotifications.length}
                        color="secondary"
                    >
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
                            backgroundColor: theme.palette.backgroundColor.section,
                            minHeight: "400px",
                        },
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
                    <BtnNotifyStyled onClick={() => togleFilterNotification(true)}>
                        <Typography fontSize={15} fontWeight={600}>
                            All
                        </Typography>
                    </BtnNotifyStyled>
                    <BtnNotifyStyled onClick={() => togleFilterNotification(false)}>
                        <Typography fontSize={15} fontWeight={600}>
                            Unread
                        </Typography>
                    </BtnNotifyStyled>
                </Box>
                {allNotifications.map((notification, index) => {
                    if (!isAllNotifications) {
                        if (notification.status === "pending") {
                            return (
                                <MenuItemStyled
                                    key={index}
                                    onClick={() => {
                                        toggleMenu();
                                        checkNotification(notification);
                                    }}
                                >
                                    <Avatar
                                        sx={{ minWidth: "40px", minHeight: "40px" }}
                                        alt="user icon"
                                        src={notification.sender.profilePicture}
                                    ></Avatar>
                                    <Typography
                                        fontSize={15}
                                        sx={{ color: theme.palette.textColor.content }}
                                    >
                                        <b>{notification.sender.fullName}</b> {notification.content}
                                    </Typography>
                                    {notification.status === "pending" && <StyledUnreadedPoint />}
                                </MenuItemStyled>
                            );
                        }
                    } else {
                        return (
                            <MenuItemStyled
                                key={index}
                                onClick={() => {
                                    toggleMenu();
                                    checkNotification(notification);
                                }}
                            >
                                <Avatar
                                    sx={{ minWidth: "40px", minHeight: "40px" }}
                                    alt="user icon"
                                    src={notification.sender.profilePicture}
                                ></Avatar>
                                <Typography
                                    fontSize={15}
                                    sx={{ color: theme.palette.textColor.content }}
                                >
                                    <b>{notification.sender.fullName}</b> {notification.content}
                                </Typography>
                                {notification.status === "pending" && <StyledUnreadedPoint />}
                            </MenuItemStyled>
                        );
                    }
                })}
            </Menu>
        </>
    );
}

export default HeaderNotifyOptions;
