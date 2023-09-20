import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material/";
import ChatsListItem from "./ChatsListItem";
import { StyledMessagesList } from "./StyledChatsList";
import { Loader } from "../../../components/PreLoader";
import { FlexCenter } from "../../../components/Header/styledHeaderComponents";

function ChatsList({ setNewMessageDialog }) {
    const theme = useTheme();

    const isLoading = useSelector((state) => state.chat.isLoading);
    const chatParticipants = useSelector(
        (state) => state.chat.chatsParticipants
    );

    return (
        <StyledMessagesList>
            {!chatParticipants.length && !isLoading && (
                <Typography p={2} color={theme.palette.textColor.content}>
                    No history yet
                </Typography>
            )}
            {isLoading && (
                <FlexCenter sx={{ p: 1, minHeight: "200px" }}>
                    <Loader />
                </FlexCenter>
            )}
            {!!chatParticipants.length &&
                !isLoading &&
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
