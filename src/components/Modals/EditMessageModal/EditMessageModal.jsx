import React, { useRef } from "react";
import { Modal } from "@mui/material";
import {
    StyledWrapModal,
    StyledContentWrapper,
    StyledModalCloseButton,
    StyledModalCloseButtonLine,
    StyledModalSeparator,
    StyledModalTitle,
    StyledBtnGroup,
    StyledButton,
} from "../StyledModalComponents";
import { StyledTextField } from "../../../pages/Chats/styledChatComponents";
import { useDispatch, useSelector } from "react-redux";
import { closeEditMessageModal } from "../../../redux/modal.slice/modal.slice";
import { editMessage } from "../../../redux/message.slice/message.slice";
import { getChat } from "../../../redux/chat.slice/chat.slice";

export default function EditMessageModal() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const editMessageModalIsOpen = useSelector(
        (state) => state.modal.editMessage.isOpen
    );
    const editMessageId = useSelector(
        (state) => state.message.currentMessageId
    );
    const editMessageContent = useSelector(
        (state) => state.message.currentMessageContent
    );
    const currentChat = useSelector((state) => state.chat.currentChat);

    const handleKeyDown = (event, id = 0) => {
        if (event.key === "Enter" && inputRef.current.value.trim()) {
            event.preventDefault();
            const inputValue = inputRef.current.value.trim();
            const message = {
                id: id,
                content: inputValue,
                chatId: currentChat.id,
            };
            inputRef.current.value = "";
            dispatch(editMessage(message))
                .then(() => {
                    dispatch(closeEditMessageModal());
                })
                .then(() => dispatch(getChat(currentChat.id)));
        }
    };

    const handleClickEdit = (event, id = 0) => {
        if (inputRef.current.value.trim()) {
            const inputValue = inputRef.current.value.trim();
            const message = {
                id: id,
                content: inputValue,
                chatId: currentChat.id,
            };
            inputRef.current.value = "";
            dispatch(editMessage(message))
                .then(() => dispatch(getChat(currentChat.id)))
                .then(() => {
                    dispatch(closeEditMessageModal());
                });
        }
    };

    const handleClose = () => dispatch(closeEditMessageModal());

    return (
        <Modal
            open={editMessageModalIsOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ paddingLeft: "5px", paddingRight: "5px" }}>
            <StyledWrapModal>
                <StyledModalCloseButton onClick={handleClose}>
                    <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
                </StyledModalCloseButton>
                <StyledModalTitle>Change message</StyledModalTitle>
                <StyledModalSeparator />
                <StyledContentWrapper>
                    <StyledTextField
                        label="your message"
                        variant="outlined"
                        inputRef={inputRef}
                        onFocus={(e) =>
                            e.currentTarget.setSelectionRange(
                                e.currentTarget.value.length,
                                e.currentTarget.value.length
                            )
                        }
                        defaultValue={editMessageContent}
                        onKeyDown={(event) =>
                            handleKeyDown(event, editMessageId)
                        }
                        multiline
                        autoFocus
                    />
                </StyledContentWrapper>
                <StyledBtnGroup>
                    <StyledButton
                        text={"Edit"}
                        clickAction={(event) =>
                            handleClickEdit(event, editMessageId)
                        }
                    />
                </StyledBtnGroup>
            </StyledWrapModal>
        </Modal>
    );
}
