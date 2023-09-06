import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material/";
import ChatsListItem from "./ChatsListItem";
import { StyledMessagesList } from "./StyledChatsList";

function ChatsList({ setNewMessageDialog }) {
    const theme = useTheme();

    const chatParticipants = useSelector((state) => state.chat.chatsParticipants);

    return (
        <StyledMessagesList>
            {!chatParticipants.length && (
                <Typography p={2} color={theme.palette.textColor.content}>
                    No history yet
                </Typography>
            )}
            {!!chatParticipants.length &&
                chatParticipants.map((chat) => (
                    <ChatsListItem
                        key={chat.id}
                        chat={chat}
                        setNewMessageDialog={setNewMessageDialog}
                    />
                ))}
        </StyledMessagesList>
    );
}

export default ChatsList;
