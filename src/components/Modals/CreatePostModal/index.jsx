import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreateModal,
  resetRepostToModal,
} from "../../../redux/modal.slice/modal.slice";
import { BlockUserImage } from "../../UserProfile/StyledComponents/ContentBlock/StyledComponents";
import {
  StyledModalBlock,
  StyledModalCloseButton,
  StyledModalCloseButtonLine,
  StyledModalSeparator,
  StyledModalTitle,
} from "../StyledModalComponents";
import Post from "../../Posts/Post/Post";
import {
  createPost,
  repostPost,
  setVisiblePosts,
} from "../../../redux/post.slice/post.slice";

const StyledPostModalUser = styled(Box)({
  display: "flex",
  marginLeft: "16px",
  marginRight: "16px",
  marginTop: "10px",
});
const StyledPostModalUserName = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "15px",
  fontWeight: 600,
  marginLeft: "15px",
}));
const StyledPostModalCreateArea = styled("form")({
  paddingLeft: "16px",
  paddingRight: "16px",
  marginTop: "16px",
});
const StyledPostModalTextArea = styled("textarea")(({ theme }) => ({
  color: theme.palette.textColor.main,
  backgroundColor: theme.palette.backgroundColor.section,
  width: "100%",
  resize: "none",
  border: "none",
  outline: "none",
  fontSize: "24px",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));
const StyledPostModalImage = styled("img")({
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "10px",
  borderRadius: "10px",
  width: "80%",
});
const StyledPostModalAddFiles = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  border: `1px solid ${theme.palette.textColor.main}`,
  borderRadius: "12px",
  marginBottom: "16px",
}));
const StyledPostModalAddFilesText = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "15px",
  fontWeight: 600,
  marginRight: "auto",
  lineHeight: "56px",
}));
const StyledPostModalAddFilesButton = styled("label")(({ theme }) => ({
  display: "block",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  transitionDuration: "300ms",
  "&:hover": {
    backgroundColor: theme.palette.buttonColor.backgroundHover,
  },
}));
const StyledPostModalButton = styled(Button)({
  textAlign: "center",
  fontWeight: 600,
  paddingLeft: "12px",
  paddingRight: "12px",
  height: "36px",
  borderRadius: "5px",
  transitionDuration: "300ms",
  width: "100%",
  backgroundColor: "#1b74e4",
  color: "#fff",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#156ad1",
  },
});

export default function CreatePostModal() {
  // Constants
  const dispatch = useDispatch();
  const createModalIsOpen = useSelector(
    (state) => state.modal.createPost.isOpen
  );
  const repost = useSelector((state) => state.modal.createPost.repost);
  const fileRef = useRef(null);
  const authUser = useSelector((state) => state.user.authorizedUser);
  const visiblePosts = useSelector((state) => state.post.visiblePosts);
  const basicPost = {
    postType: "post",
    parentId: null,
    repostsUsers: [],
    reposts: [],
    createdBy: null,
    updatedBy: null,
    comments: [],
    user: authUser,
    likes: [],
  };
  // State
  const [imgUrls, setImgUrls] = useState([]);
  const [files, setFiles] = useState([]);
  // Functions
  const handleClose = () => {
    dispatch(closeCreateModal());
    dispatch(resetRepostToModal());
    formik.values.content = "";
    setImgUrls([]);
  };

  function showChoosingPicture() {
    let filesList = fileRef?.current.files;
    const files = [];
    for (let i = 0; i < filesList?.length; i++) {
      files.push(filesList[i]);
    }
    setFiles(files);
    setImgUrls(files.map((file) => URL.createObjectURL(file)));
  }

  // Formik
  const formik = useFormik({
    initialValues: {
      content: "",
      userName: `${authUser && authUser?.fullName} `,
    },
    onSubmit: (values) => {
      const actualDate = new Date();
      const updatedPosts = [...visiblePosts];

      if (repost) {
        const repostResponse = dispatch(
          repostPost({ id: repost?.id, content: values.content })
        );

        // Add Post to page top before reload
        repostResponse
          .then((response) => {
            console.log(response);
            updatedPosts.unshift({
              ...basicPost,
              content: response.meta.arg.content,
              createdDate: actualDate,
              updatedDate: actualDate,
              postImages: imgUrls.map((url) => ({ imgUrl: url })),
              id: actualDate.getSeconds(),
              parentId: repost,
            });
            dispatch(setVisiblePosts(updatedPosts));
          })
          .catch((error) => console.log(error));

        // Reset Form
        values.content = "";
        setImgUrls([]);
        handleClose();
      } else {
        const formData = new FormData();
        formData.append("content", values.content);
        if (imgUrls.length !== 0) {
          files.forEach((el) => {
            formData.append(`files`, el);
          });
        }
        const createPostResponse = dispatch(
          createPost({ multipartFiles: formData })
        );

        // Add Post to page top before reload
        createPostResponse
          .then(() => {
            updatedPosts.unshift({
              ...basicPost,
              content: values.content,
              createdDate: actualDate,
              updatedDate: actualDate,
              postImages: imgUrls.map((url) => ({ imgUrl: url })),
              id: actualDate.getSeconds(),
            });
            dispatch(setVisiblePosts(updatedPosts));
          })
          .catch((e) => console.log(e));

        // Reset Form
        values.content = "";
        setImgUrls([]);
        handleClose();
      }
    },
  });
  if (!authUser) return;
  return (
    <Modal
      open={createModalIsOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ paddingLeft: "5px", paddingRight: "5px" }}
    >
      <StyledModalBlock>
        <StyledModalCloseButton onClick={handleClose}>
          <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
        </StyledModalCloseButton>
        <StyledModalTitle>Create post</StyledModalTitle>
        <StyledModalSeparator></StyledModalSeparator>
        <StyledPostModalUser>
          <BlockUserImage
            src={
              authUser?.profilePicture ||
              "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
            }
            alt=""
            width={40}
            height={40}
          />
          <StyledPostModalUserName>
            {authUser?.fullName}
          </StyledPostModalUserName>
        </StyledPostModalUser>
        <StyledPostModalCreateArea onSubmit={formik.handleSubmit}>
          <StyledPostModalTextArea
            cols="30"
            rows="5"
            placeholder="What`s on your mind?"
            onChange={formik.handleChange}
            value={formik.values.content}
            name="content"
            id="content"
          ></StyledPostModalTextArea>

          {imgUrls.map((url, index) => (
            <StyledPostModalImage src={url} alt="" width={450} key={index} />
          ))}

          {!repost ? (
            <StyledPostModalAddFiles>
              <StyledPostModalAddFilesText>
                Add to your post
              </StyledPostModalAddFilesText>
              <StyledPostModalAddFilesButton>
                <input
                  type="file"
                  ref={fileRef}
                  onChange={showChoosingPicture}
                  style={{ display: "none" }}
                  multiple
                />
                <AddPhotoAlternateIcon
                  sx={{ color: "#45bd62", width: "36px", height: "36px" }}
                />
              </StyledPostModalAddFilesButton>
            </StyledPostModalAddFiles>
          ) : (
            <Post {...repost} inModal={true} />
          )}

          <StyledPostModalButton onClick={formik.handleSubmit}>
            POST
          </StyledPostModalButton>
        </StyledPostModalCreateArea>
      </StyledModalBlock>
    </Modal>
  );
}
