import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip, Badge } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { useTheme } from "@mui/material/styles";
import { AvatarStyled } from "../headerOptionsStyled";
import {
    getUnread,
    getChatsParticipants,
} from "../../../../redux/chat.slice/chatActions";

function HeaderChatIcon({ toggleMenu }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const unread = useSelector((state) => state.chat.unread);
    const { messages } = useSelector((state) => state.chat.currentChat);
    const chatParticipants = useSelector(
        (state) => state.chat.chatsParticipants
    );

    useEffect(() => {
        dispatch(getUnread());
    }, [messages, chatParticipants]);

    function getChats() {
        toggleMenu();
        dispatch(getChatsParticipants());
    }

    return (
        <Tooltip title="Messenger" sx={{ p: { xs: "4px", sm: 1 } }}>
            <IconButton
                onClick={getChats}
                sx={({ py: 1 }, { px: { xs: 0.5, sm: 1 } })}>
                <Badge
                    badgeContent={unread}
                    color="info"
                    sx={{ fontSize: "10px" }}>
                    <AvatarStyled>
                        <ForumIcon
                            style={{ color: theme.palette.textColor.content }}
                        />
                    </AvatarStyled>
                </Badge>
            </IconButton>
        </Tooltip>
    );
}

export default HeaderChatIcon;
