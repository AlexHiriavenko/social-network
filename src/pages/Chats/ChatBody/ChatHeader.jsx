import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import { getFriends, setFriends, setUser, getUser } from "../../../redux/user.slice/user.slice";
import { StyledAvatar, StyledChatHeader, StyledLink } from "./StyledChatBody";
import { openAddUserToChatModal } from "../../../redux/modal.slice/modal.slice";

function ChatHeader({ closeMenu, setNewMessageDialog }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { fullName, profilePicture } = useSelector((state) => state.chat.currentChatCompanion);
    const quantityUsers = 0;
    const authUser = useSelector((state) => state.user.authorizedUser);
    const currentChatCompanion = useSelector((state) => state.chat.currentChatCompanion);

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
        dispatch(resetCurrentChat());
        if (location.pathname !== "/chats") {
            closeMenu();
        }
    }

    return (
        <StyledChatHeader>
            <StyledLink onClick={() => lookFriendPage(currentChatCompanion.id)} to="/profile">
                <Avatar
                    className="search__user-avatar"
                    sx={{ minWidth: "40px", minHeight: "40px" }}
                    alt="user icon"
                    src={profilePicture}
                />
                <Typography sx={{ color: theme.palette.textColor.main }}>
                    {fullName}{" "}
                    {quantityUsers > 0 && (
                        <Typography variant="span" sx={{ fontSize: "13px" }}>
                            & {quantityUsers} more
                        </Typography>
                    )}
                </Typography>
            </StyledLink>
            <Box sx={{ display: "flex", gap: 1 }}>
                <StyledAvatar onClick={() => dispatch(openAddUserToChatModal())}>
                    <PersonAddIcon
                        sx={{
                            color: theme.palette.textColor.content,
                        }}
                        alt="add participant"
                    />
                </StyledAvatar>
                <StyledAvatar onClick={() => dispatch(resetCurrentChat())}>
                    <CloseIcon
                        sx={{
                            color: theme.palette.textColor.content,
                        }}
                        alt="close"
                    />
                </StyledAvatar>
            </Box>
        </StyledChatHeader>
    );
}

export default ChatHeader;
