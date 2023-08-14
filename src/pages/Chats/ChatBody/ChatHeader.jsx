import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import {
    getFriends,
    setFriends,
    setUser,
    getUser,
} from "../../../redux/user.slice/user.slice";

function ChatHeader() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { fullName, profilePicture } = useSelector(
        (state) => state.chat.currentChatCompanion
    );
    const authUser = useSelector((state) => state.user.authorizedUser);
    const currentChatCompanion = useSelector(
        (state) => state.chat.currentChatCompanion
    );

    function lookFriendPage(id) {
        const userFriendsResponse = dispatch(getFriends(id));
        userFriendsResponse
            .then((data) => {
                dispatch(setFriends(data.payload));
                localStorage.setItem("friends", JSON.stringify(data.payload));
            })
            .catch((error) => console.log(error.message));

        if (id === authUser.id) {
            dispatch(setUser(authUser));
            localStorage.setItem("user", JSON.stringify(authUser));
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const lookedFriend = dispatch(getUser(id));
            lookedFriend
                .then((data) => {
                    dispatch(setUser(data.payload));
                    localStorage.setItem("user", JSON.stringify(data.payload));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                })
                .catch((error) => console.log(error.message));
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                zIndex: 2,
                backgroundColor: theme.palette.backgroundColor.section,
                p: 2,
            }}>
            <Link
                onClick={() => lookFriendPage(currentChatCompanion.userId)}
                to="/profile"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}>
                <Avatar
                    className="search__user-avatar"
                    sx={{ minWidth: "40px", minHeight: "40px" }}
                    alt="user icon"
                    src={profilePicture}
                />
                <Typography sx={{ color: theme.palette.textColor.main }}>
                    {fullName}
                </Typography>
            </Link>
            <Avatar
                sx={{
                    bgcolor: theme.palette.hoverColor.dark,
                    minWidth: "40px",
                    minHeight: "40px",
                    cursor: "pointer",
                    transitionDuration: "0.5s",
                    "&:hover": {
                        backgroundColor:
                            theme.palette.buttonColor.backgroundHover,
                    },
                }}
                onClick={() => dispatch(resetCurrentChat())}>
                <CloseIcon
                    sx={{
                        color: theme.palette.textColor.content,
                    }}
                />
            </Avatar>
        </Box>
    );
}

export default ChatHeader;
