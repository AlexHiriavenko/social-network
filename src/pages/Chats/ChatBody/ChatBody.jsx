import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { resetCurrentChat } from "../../../redux/chat.slice/chat.slice";
import ChatHeader from "./ChatHeader";
import ListMessages from "./ListMessages";
import ChatFooter from "./ChatFooter";
import NewMessageDialog from "../NewMessageDialog/NewMessageDialog";
import { EmptyChatPage, ChatContainer } from "../styledChatComponents";
import { Loader } from "../../../components/PreLoader";
import { FlexCenter } from "../../../components/Header/styledHeaderComponents";

const ChatBody = (props) => {
    const { newMessageDialog, setNewMessageDialog } = props;
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.chat.currentChat) || [];
    const isLoading = useSelector((state) => state.chat.isLoadingChat);
    const chatFormRef = useRef(null);

    // в конец чата
    useEffect(() => {
        if (chatFormRef.current) {
            chatFormRef.current.scrollTop = chatFormRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => () => dispatch(resetCurrentChat()), []);

    const showChat = messages && messages[0]?.createdBy;

    return (
        <>
            {showChat && !isLoading && (
                <Box ref={chatFormRef} pb={2} className="chat-body">
                    <ChatHeader
                        closeMenu={() => null}
                        setNewMessageDialog={setNewMessageDialog}
                    />
                    <Box sx={{ maxWidth: "1000px", height: "100%" }}>
                        <ChatContainer>
                            <ListMessages />
                            <ChatFooter />
                        </ChatContainer>
                    </Box>
                </Box>
            )}
            {newMessageDialog && (
                <NewMessageDialog setNewMessageModal={setNewMessageDialog} />
            )}
            {!showChat && !newMessageDialog && !isLoading && (
                <EmptyChatPage>
                    Select a chat or start a new conversation
                </EmptyChatPage>
            )}
            {isLoading && (
                <FlexCenter sx={{ width: "100%", mb: 20 }}>
                    <Loader />
                </FlexCenter>
            )}
        </>
    );
};

export default ChatBody;
