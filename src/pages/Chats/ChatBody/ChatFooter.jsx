import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledTextField } from "../styledChatComponents";
import {
    ChatFooterContainer,
    AddImgsIcon,
    BtnSendMessage,
    WrapperAddImgs,
} from "./StyledChatBody";
import SendIcon from "@mui/icons-material/Send";
import { handleClickSend, handleKeyDown } from "../helpers/sendMessage";
import { showChoosingPicture } from "../helpers/showChoosingPicture";

function ChatFooter() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const currentChat = useSelector((state) => state.chat.currentChat);
    const [imgUrls, setImgUrls] = useState([]);
    const [files, setFiles] = useState([]);

    const args = [dispatch, inputRef, currentChat, files, setFiles, setImgUrls];

    const setFocus = () => inputRef.current.focus();

    return (
        <ChatFooterContainer>
            <StyledTextField
                label="your message"
                variant="outlined"
                multiline
                inputRef={inputRef}
                onKeyDown={(event) => handleKeyDown(event, args)}
                InputProps={{
                    sx: {
                        pr: 5,
                        pt: 2,
                        pb: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        minHeight: "70px",
                    },
                    endAdornment: (
                        <>
                            <WrapperAddImgs>
                                <input
                                    type="file"
                                    ref={fileRef}
                                    onChange={() =>
                                        showChoosingPicture(
                                            fileRef,
                                            setFiles,
                                            setImgUrls
                                        )
                                    }
                                    onClick={setFocus}
                                    style={{ display: "none" }}
                                    multiple
                                />
                                <AddImgsIcon fontSize="large" />
                            </WrapperAddImgs>
                            {imgUrls.map((url, index) => (
                                <img
                                    src={url}
                                    alt=""
                                    height={100}
                                    key={index}
                                />
                            ))}
                        </>
                    ),
                }}></StyledTextField>
            <BtnSendMessage onClick={(event) => handleClickSend(event, args)}>
                <SendIcon fontSize="large" color="primary" />
            </BtnSendMessage>
        </ChatFooterContainer>
    );
}

export default ChatFooter;
