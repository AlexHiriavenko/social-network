import styled from "@emotion/styled";
import { Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeCheckRepostsModal } from "../../../redux/modal.slice/modal.slice";
import Post from "../../Posts/Post/Post";

const StyledModalBlock = styled("div")(({ theme }) => ({
    position: "absolute",
    maxWidth: "680px",
    minWidth: "300px",
    maxHeight: "95vh",
    width: "100%",

    backgroundColor: theme.palette.backgroundColor.section,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
}));

export const StyledModalCloseButton = styled("button")(({ theme }) => ({
    minWidth: "none",
    width: "36px",
    height: "36px",
    backgroundColor: theme.palette.buttonColor.background,
    transitionDuration: "300ms",
    borderRadius: "50%",
    position: "absolute",
    top: "8px",
    right: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        backgroundColor: theme.palette.buttonColor.backgroundHover,
    },
}));

export const StyledModalCloseButtonLine = styled("span")(({ theme }) => ({
    "&::before": {
        content: "''",
        display: "block",
        backgroundColor: theme.palette.textColor.secondary,
        width: "2px",
        height: "25px",
        borderRadius: "1px",
        transform: "rotate(45deg)",
        position: "relative",
        top: "12px",
    },
    "&::after": {
        content: "''",
        display: "block",
        backgroundColor: theme.palette.textColor.secondary,
        width: "2px",
        height: "25px",
        borderRadius: "1px",
        transform: "rotate(135deg)",
        position: "relative",
        bottom: "13px",
    },
}));

export const StyledTitleWrraper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60px",
    borderBottom: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
}))

export const StyledTitle = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    fontSize: "1.25rem",
    color: theme.palette.textColor.main,
    fontWeight: 600,
}))

export const StyledPostItemsWrraper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "13px",
    position: "relative",
    maxHeight: "75vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        display: "none",
    },
}));

const StyledRepostWrraper = styled("div")(({ theme }) => ({
    padding: "10px",
    borderRadius: "12px",
    border: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
}))


export default function CheckRepostsModal() {
    const dispatch = useDispatch();

    const modalIsOpen = useSelector((state) => state.modal.checkReposts.isOpen);
    const reposts = useSelector(state => state.modal.checkReposts.reposts);
    const parentPost = useSelector(state => state.modal.checkReposts.parentPost);
    const handleClose = () => dispatch(closeCheckRepostsModal());
    console.log(reposts);

    return (
        <Modal
            open={modalIsOpen}
            onClose={handleClose}
        >
            <StyledModalBlock>
                <StyledModalCloseButton onClick={handleClose}>
                    <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
                </StyledModalCloseButton>
                <StyledTitleWrraper>
                    <StyledTitle>{parentPost.user?.fullName}`s reposts</StyledTitle>
                </StyledTitleWrraper>
                <StyledPostItemsWrraper>
                    {reposts.map((repost, index) => {
                        return (
                            <StyledRepostWrraper key={index}>
                                <Post showAttachmentBtn={true} {...repost} key={index} />
                            </StyledRepostWrraper>
                        );
                    })}
                </StyledPostItemsWrraper>
            </StyledModalBlock>
        </Modal>
    );
}