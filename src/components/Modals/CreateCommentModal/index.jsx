import { Button, Modal, Typography, keyframes } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateCommentModal } from "../../../redux/modal.slice/modal.slice";
import styled from "@emotion/styled";
import Post from "../../Posts/Post/Post";
import { StyledModalCloseButton, StyledModalCloseButtonLine } from "../StyledModalComponents";
import { BlockUserImage } from "../../UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { useFormik } from "formik";
import SendIcon from '@mui/icons-material/Send';
import Comment from "../../Comment";
import { commentPost } from "../../../redux/post.slice/post.slice";

const mockUser = {
  image:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  firstName: "Viktor",
  lastName: "Ostapenko",
};


const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled("span")({
  width: "48px",
  height: "48px",
  border: "5px solid #FFF",
  borderBottomColor: "transparent",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: `${rotation} 1s linear infinite`,
});

const StyledTitleWrraper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60px",
  borderBottom: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.25rem",
  color: theme.palette.textColor.main,
  fontWeight: 600,
}))

const StyledModalBlock = styled("div")(({ theme }) => ({
  position: "absolute",
  maxWidth: "680px",
  maxHeight: "95vh",

  backgroundColor: theme.palette.backgroundColor.section,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
}));

const StyledPostWrraper = styled("div")(({ theme }) => ({
  position: "relative",
  maxHeight: "75vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const StyledPostCommentsWrraper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "13px",
}));

const StyledPostCommentWrraper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  gap: "5px",
  padding: "16px",
  borderTop: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
}));

const StyledPostModalCreateCommentArea = styled("form")(({ theme }) => ({

}));

const StyledPostModalTextArea = styled("textarea")(({ theme }) => ({
  color: theme.palette.textColor.main,
  backgroundColor: theme.palette.input.mainBackground,
  width: "100%",
  resize: "none",
  border: "none",
  padding: "10px",
  fontFamily: theme.typography.fontFamily,
  borderRadius: "15px",
  outline: "none",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));

const StyledPostModalButton = styled("button")(({ theme }) => ({
  position: "absolute",
  right: "25px",
  bottom: "25px",
  cursor: "pointer",
}));





export default function CreateCommentModal() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.commentPost.isOpen);
  const post = useSelector((state) => state.modal.commentPost.post);

  // const postId = useSelector((state) => state.modal.commentPost.openedPostId);
  const authUser = useSelector((state) => state.user.authorizedUser);
  const handleClose = () => dispatch(closeCreateCommentModal());

  function comment(id, content) {
    dispatch(commentPost(id, content));
  }


  console.log(post);
  //Formik
  const formik = useFormik({
    initialValues: {
      content: "",
      userName: `${mockUser.firstName} ${mockUser.lastName}`,
    },
    onSubmit: (values) => {
      values.content = "";
      //Comment
      comment(post.id, values.content)
      handleClose();
    },
  });

  if (!post) {
    return (<Loader />)
  }
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
          <StyledTitle>{post.user.fullName}`s post</StyledTitle>
        </StyledTitleWrraper>
        <StyledPostWrraper>
          <Post {...post} />
          <StyledPostCommentsWrraper>
            {
              post.comments.map((comment, index) => (
                <Comment {...comment} key={index} />
              ))}
          </StyledPostCommentsWrraper>
        </StyledPostWrraper>
        <StyledPostCommentWrraper>
          <BlockUserImage src={
            authUser.profilePicture ||
            "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
          }
            alt=""
            width={40}
            height={40} />
          <StyledPostModalCreateCommentArea onSubmit={formik.handleSubmit}>
            <StyledPostModalTextArea
              cols="80"
              rows="3"
              placeholder="Write a comment..."
              onChange={formik.handleChange}
              value={formik.values.content}
              name="content"
              id="content"
            >
            </StyledPostModalTextArea>
            <StyledPostModalButton onClick={formik.handleSubmit}>
              <SendIcon sx={{ color: "#65676b", }} />
            </StyledPostModalButton>
          </StyledPostModalCreateCommentArea>
        </StyledPostCommentWrraper>
      </StyledModalBlock>
    </Modal>
  );
}