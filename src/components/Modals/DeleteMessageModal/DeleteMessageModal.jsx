import { useEffect } from "react";
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
    StyledQuestionModal,
} from "../StyledModalComponents";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteMessageModal } from "../../../redux/modal.slice/modal.slice";
import { deleteMessage } from "../../../redux/message.slice/message.slice";
import { getChat } from "../../../redux/chat.slice/chat.slice";

export default function DeleteMessageModal() {
    const dispatch = useDispatch();
    const deleteMessageModalIsOpen = useSelector((state) => state.modal.deleteMessage.isOpen);
    const deleteMessageId = useSelector((state) => state.message.currentMessageId);
    const currentChat = useSelector((state) => state.chat.currentChat);

    const handleDelete = () => {
        dispatch(closeDeleteMessageModal());
        dispatch(deleteMessage(deleteMessageId)).then(() => dispatch(getChat(currentChat.id)));
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && deleteMessageModalIsOpen) {
            dispatch(deleteMessage(deleteMessageId))
                .then(() => dispatch(getChat(currentChat.id)))
                .then(() => {
                    dispatch(closeDeleteMessageModal());
                });
        }
    };

    const handleClose = () => {
        dispatch(closeDeleteMessageModal());
    };

    useEffect(() => {
        if (deleteMessageModalIsOpen) {
            document.addEventListener("keydown", handleKeyPress);
        } else {
            document.removeEventListener("keydown", handleKeyPress);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [deleteMessageModalIsOpen]);

    return (
        <Modal
            open={deleteMessageModalIsOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ paddingLeft: "5px", paddingRight: "5px" }}
        >
            <StyledWrapModal>
                <StyledModalCloseButton onClick={handleClose}>
                    <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
                </StyledModalCloseButton>
                <StyledModalTitle>Delete mesage</StyledModalTitle>
                <StyledModalSeparator></StyledModalSeparator>

                <StyledContentWrapper>
                    <StyledQuestionModal>
                        Do you really want to delete this message ?
                    </StyledQuestionModal>
                </StyledContentWrapper>
                <StyledBtnGroup>
                    <StyledButton text={"Yes"} clickAction={handleDelete} />
                    <StyledButton text={"No"} clickAction={handleClose} />
                </StyledBtnGroup>
            </StyledWrapModal>
        </Modal>
    );
}
