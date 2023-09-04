import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import { StyledAvatar, StyledChatHeader, StyledLink } from "./StyledChatBody";
import { openAddUserToChatModal } from "../../../redux/modal.slice/modal.slice";
import { lookFriendPage } from "../helpers/chatsHelpers";

function ChatHeader({ closeMenu, setNewMessageDialog }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { fullName, profilePicture } = useSelector((state) => state.chat.currentChatCompanion);
    const authUser = useSelector((state) => state.user.authorizedUser);
    const currentChatCompanion = useSelector((state) => state.chat.currentChatCompanion);
    const { users } = useSelector((state) => state.chat.currentChat);

    return (
        <StyledChatHeader>
            <StyledLink
                onClick={() =>
                    lookFriendPage(dispatch, location, currentChatCompanion.id, authUser, closeMenu)
                }
                to="/profile"
            >
                <Avatar
                    className="search__user-avatar"
                    sx={{ minWidth: "40px", minHeight: "40px" }}
                    alt="user icon"
                    src={profilePicture}
                />
                <Typography sx={{ color: theme.palette.textColor.main }}>
                    {fullName}{" "}
                    {users.length > 2 && (
                        <Typography variant="span" sx={{ fontSize: "13px" }}>
                            & {users.length - 2} more
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
