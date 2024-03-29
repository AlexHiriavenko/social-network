import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Box } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useTheme } from "@mui/material/styles";
import { setTemporaryParticipant, resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import { BtnNewChat, ChatTitle, WrapSidebar } from "../styledChatComponents";

function MessengerSidebarHeader(props) {
    const { setNewMessageDialog } = props;
    const dispatch = useDispatch();
    const theme = useTheme();

    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);

    function addTemporaryNewChat() {
        if (chatParticipants[0].id) {
            dispatch(resetCurrentChat());
            dispatch(setTemporaryParticipant());
            setNewMessageDialog(true);
        }
    }

    return (
        <WrapSidebar>
            <ChatTitle
                variant="h5"
                component={"h4"}
                fontWeight={600}
                color={theme.palette.textColor.content}
            >
                Chats
            </ChatTitle>
            <Box>
                <Tooltip title="New Chat" sx={{ ml: 0.5 }}>
                    <BtnNewChat onClick={addTemporaryNewChat}>
                        <EditNoteIcon
                            sx={{ color: theme.palette.textColor.content }}
                            fontSize="large"
                        />
                    </BtnNewChat>
                </Tooltip>
            </Box>
        </WrapSidebar>
    );
}

export default MessengerSidebarHeader;
