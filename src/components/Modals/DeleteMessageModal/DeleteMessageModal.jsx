import { Box, Modal, Typography } from "@mui/material";
import {
    StyledModalBlock,
    StyledModalCloseButton,
    StyledModalCloseButtonLine,
    StyledModalSeparator,
    StyledModalTitle,
} from "../StyledModalComponents";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteMessageModal } from "../../../redux/modal.slice/modal.slice";
import { deleteMessage } from "../../../redux/message.slice/message.slice";
import { getChat } from "../../../redux/chat.slice/chat.slice";
import styled from "@emotion/styled";
import ProfilePageButton from "../../UserProfile/ProfilePageButton/ProfilePageButton";

const StyledEditProfileModal = styled(StyledModalBlock)({
    maxWidth: "710px",
});

const StyledEditedContentWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    width: "100%",
});

const StyledEditedBio = styled(Typography)(({ theme }) => ({
    color: theme.palette.textColor.secondary,
    fontSize: "17px",
    textAlign: "center",
    marginTop: "16px",
}));
const StyledButton = styled(ProfilePageButton)(({ theme }) => ({
    width: "100px",
    marginTop: "16px",
    marginBottom: "16px",
    color: theme.palette.accentColor.main,
    backgroundColor: theme.palette.accentColor.secondary,
    transitionDuration: "300ms",
    "&:hover": {
        backgroundColor: theme.palette.accentColor.secondary,
    },
}));

const StyledBtnGroup = styled(Box)({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "16px",
});

export default function DeleteMessageModal() {
    const dispatch = useDispatch();
    const deleteMessageModalIsOpen = useSelector(
        (state) => state.modal.deleteMessage.isOpen
    );
    const deleteMessageId = useSelector(
        (state) => state.message.deleteMessageId
    );
    const currentChat = useSelector((state) => state.chat.currentChat);

    const handleDelete = () => {
        dispatch(deleteMessage(deleteMessageId))
            .then(() => dispatch(getChat(currentChat.id)))
            .then(() => {
                dispatch(closeDeleteMessageModal());
            });
    };

    const handleClose = () => {
        dispatch(closeDeleteMessageModal());
    };

    return (
        <Modal
            open={deleteMessageModalIsOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ paddingLeft: "5px", paddingRight: "5px" }}>
            <StyledEditProfileModal>
                <StyledModalCloseButton onClick={handleClose}>
                    <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
                </StyledModalCloseButton>
                <StyledModalTitle>Delete mesage</StyledModalTitle>
                <StyledModalSeparator></StyledModalSeparator>

                <StyledEditedContentWrapper>
                    <StyledEditedBio>
                        Do you really want to delete this message ?
                    </StyledEditedBio>
                </StyledEditedContentWrapper>
                <StyledBtnGroup>
                    <StyledButton text={"Yes"} clickAction={handleDelete} />
                    <StyledButton text={"No"} clickAction={handleClose} />
                </StyledBtnGroup>
            </StyledEditProfileModal>
        </Modal>
    );
}
