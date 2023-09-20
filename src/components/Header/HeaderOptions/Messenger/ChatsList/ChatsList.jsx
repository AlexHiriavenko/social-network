import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatsParticipants } from "../../../../../redux/chat.slice/chat.slice";
import { Typography } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import { StyledMessagesList } from "../../headerOptionsStyled";
import { FlexCenter } from "../../../styledHeaderComponents";
import { Loader } from "../../../../PreLoader";
import ItemChatList from "./ItemChatList";

function ChatsList() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isLoading = useSelector((state) => state.chat.isLoading);

    useEffect(() => {
        dispatch(getChatsParticipants());
    }, [dispatch]);

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
                <FlexCenter sx={{ p: 1 }}>
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
