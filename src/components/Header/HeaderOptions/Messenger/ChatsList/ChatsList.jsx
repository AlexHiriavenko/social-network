import { useSelector } from "react-redux";
import { Typography } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import { StyledMessagesList } from "../../headerOptionsStyled";
import { FlexCenter } from "../../../styledHeaderComponents";
import { Loader } from "../../../../PreLoader";
import ItemChatList from "./ItemChatList";

function ChatsList() {
    const theme = useTheme();
    const isLoading = useSelector((state) => state.chat.isLoading);

    const chatParticipants = useSelector(
        (state) => state.chat.chatsParticipants
    );

    return (
        <StyledMessagesList>
            {!chatParticipants?.length && !isLoading && (
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
                    <ItemChatList key={chat.id} chat={chat} />
                ))}
        </StyledMessagesList>
    );
}

export default ChatsList;
