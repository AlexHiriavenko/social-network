import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateModal } from "../../../redux/modal.slice/modal.slice";
import { BlockUserImage } from "../../UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { StyledModalBlock, StyledModalCloseButton, StyledModalCloseButtonLine, StyledModalSeparator, StyledModalTitle } from "../StyledModalComponents";

const mockUser = {
  image:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  firstName: "Viktor",
  lastName: "Ostapenko",
};

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
  cursor: "not-allowed",
  backgroundColor: "#1b74e4",
  color: "#fff",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#156ad1",
  },
});

export default function CreatePostModal() {
  const dispatch = useDispatch();
  const createModalIsOpen = useSelector(
    (state) => state.modal.createPost.isOpen
  );
  const fileRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const handleClose = () => dispatch(closeCreateModal());

  function showChoosingPicture() {
    let file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setImgUrl(URL.createObjectURL(file));
  }

  const formik = useFormik({
    initialValues: {
      content: "",
      userName: `${mockUser.firstName} ${mockUser.lastName}`,
    },
    onSubmit: (values) => {
      values.content = "";
      setImgUrl("");
      handleClose();
    },
  });

  
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
            src={mockUser.image}
            alt=""
            width={40}
            height={40}
          />
          <StyledPostModalUserName>
            {" "}
            {mockUser.firstName} {mockUser.lastName}
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
          <StyledPostModalImage src={imgUrl} alt="" width={450} />
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
              />
              <AddPhotoAlternateIcon
                sx={{ color: "#45bd62", width: "36px", height: "36px" }}
              />
            </StyledPostModalAddFilesButton>
          </StyledPostModalAddFiles>
          <StyledPostModalButton onClick={formik.handleSubmit}>
            POST
          </StyledPostModalButton>
        </StyledPostModalCreateArea>
      </StyledModalBlock>
    </Modal>
  );
}