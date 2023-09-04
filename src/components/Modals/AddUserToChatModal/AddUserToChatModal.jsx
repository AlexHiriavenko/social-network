import { Modal } from "@mui/material";
import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { closeAddUserToChatModal } from "../../../redux/modal.slice/modal.slice";
import SearchForHomePage from "../../Search/SearchForHomePage";
import UsersListGlobal from "./UsersListGlobal";

export default function AddUserToChatModal() {
    const [foundUser, setFoundUser] = useState([]);
    const dispatch = useDispatch();
    const addUserToChatModalIsOpen = useSelector((state) => state.modal.addUserToChat.isOpen);

    const handleClose = () => {
        dispatch(closeAddUserToChatModal());
    };

    return (
        <Modal
            open={addUserToChatModalIsOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ paddingLeft: "5px", paddingRight: "5px" }}
        >
            <StyledWrapModal>
                <StyledModalCloseButton onClick={handleClose}>
                    <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
                </StyledModalCloseButton>
                <StyledModalTitle>Add Participant</StyledModalTitle>
                <StyledModalSeparator></StyledModalSeparator>
                <StyledContentWrapper>
                    <SearchForHomePage setFoundUser={setFoundUser} />
                </StyledContentWrapper>
                <UsersListGlobal users={foundUser}></UsersListGlobal>
                <StyledBtnGroup>
                    <StyledButton text={"Cancel"} clickAction={handleClose} />
                </StyledBtnGroup>
            </StyledWrapModal>
        </Modal>
    );
}
