import { useDispatch, useSelector } from "react-redux";
import { IconButton, Typography, Tooltip, Box } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useTheme } from "@mui/material/styles";
import { setTemporaryParticipant } from "../../../redux/chat.slice/chat.slice";

function MessengerSidebarHeader(props) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);

    function addTemporaryNewChat() {
        if (chatParticipants[0].id) {
            dispatch(setTemporaryParticipant());
        }
    }

    return (
        <div className="messenger-sidebar-header">
            <Typography
                className="messenger-sidebar-header__title"
                variant="h5"
                component={"h4"}
                fontWeight={600}
                color={theme.palette.textColor.content}
            >
                Chats
            </Typography>
            <Box>
                <Tooltip title="New Chat" sx={{ ml: 0.5 }}>
                    <IconButton
                        className="messenger-sidebar-header__btn"
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.hoverColor.main,
                            },
                        }}
                        onClick={addTemporaryNewChat}
                    >
                        <EditNoteIcon
                            sx={{ color: theme.palette.textColor.content }}
                            fontSize="large"
                        />
                    </IconButton>
                </Tooltip>
            </Box>
        </div>
    );
}

export default MessengerSidebarHeader;
