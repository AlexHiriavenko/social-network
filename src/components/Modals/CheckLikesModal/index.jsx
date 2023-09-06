import { Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeCheckLikesModal } from "../../../redux/modal.slice/modal.slice";
import styled from "@emotion/styled";
import { StyledModalCloseButton, StyledModalCloseButtonLine, StyledTitle, StyledTitleWrraper } from "../CheckRepostsModal";
import { BlockUserImage } from "../../UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { getUser, setUser } from "../../../redux/user.slice/user.slice";
import { useNavigate } from "react-router-dom";

const StyledModalBlock = styled("div")(({ theme }) => ({
    position: "absolute",
    maxWidth: "680px",
    minWidth: "320px",
    maxHeight: "500px",
    width: "100%",

    backgroundColor: theme.palette.backgroundColor.section,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
}));

export const StyledPostItemsWrraper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "13px",
    position: "relative",
    maxHeight: "320px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        display: "none",
    },
}));

const StyledLikeAuthor = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "15px",
}));

const StyledLikeAuthorName = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    color: theme.palette.textColor.main,
    fontWeight: 600,
    cursor: "pointer",
}));

export default function CheckLikesModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const modalIsOpen = useSelector(state => state.modal.checkLikes.isOpen);
    const userLikes = useSelector(state => state.modal.checkLikes.userLikes);
    const parentPost = useSelector(state => state.modal.checkLikes.parentPost);
    const authUser = useSelector((state) => state.user?.authorizedUser);


    const handleClose = () => dispatch(closeCheckLikesModal());

    function lookUser(id) {
        if (id === authUser?.id) {
            dispatch(setUser(authUser));
            navigate("/profile");
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const userResponse = dispatch(getUser(id));
            userResponse
                .then((data) => {
                    dispatch(setUser(data.payload));
                    navigate("/profile");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                })
                .catch((error) => error.message);
        }
        handleClose();
    }

    console.log(userLikes);
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
                    {userLikes.map((user, index) => {
                        return (
                            <StyledLikeAuthor key={index}>
                                <BlockUserImage
                                    src={
                                        user?.profilePicture ||
                                        "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                                    }
                                    alt="Author image"
                                    width={50}
                                    height={50}
                                    onClick={() => lookUser(user?.id)}
                                />
                                <StyledLikeAuthorName onClick={() => lookUser(user?.id)}>
                                    {user?.fullName}
                                </StyledLikeAuthorName>
                            </StyledLikeAuthor>);
                    })}
                </StyledPostItemsWrraper>
            </StyledModalBlock>
        </Modal>
    );
}