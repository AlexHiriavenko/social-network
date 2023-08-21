import styled from "@emotion/styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {setAuthorizedUser,setUser,uploadAvatar,uploadCoverPhoto,getProfile} from '../../../redux/user.slice/user.slice.js'

import {
  StyledEditedPartButton,
  StyledModalBlock,
  StyledModalCloseButton,
  StyledModalCloseButtonLine,
  StyledModalSeparator,
  StyledModalTitle,
} from "../StyledModalComponents";
import UploadIcon from "@mui/icons-material/Upload";
import ProfilePageButton from "../../UserProfile/ProfilePageButton/ProfilePageButton";
import { useTheme } from "@emotion/react";

const StyledSelectButton = styled("label")(({ theme }) => ({
  width: "100%",
  height: "76px",
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
  transitionDuration: "300ms",
  borderRadius: "6px",
  paddingLeft: "16px",
  paddingRight: "16px",
  "&:hover": {
    backgroundColor: theme.palette.buttonColor.backgroundHover,
  },
}));
const StyledSelectButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "15px",
  fontWeight: 600,
}));
const StyledSelectButtonIcon = styled(Box)(({ theme }) => ({
  width: "60px",
  height: "60px",
  backgroundColor: theme.palette.buttonColor.background,
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledSelectButtons = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  paddingLeft: "16px",
  paddingRight: "16px",
  columnGap: "10px",
});
export default function EditChildModal(props) {
  // Constants
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { title } = props;
  const fileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [multipartFile,setMultipartFile] = useState(null)
  const theme = useTheme();
  //   Functions
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };
  function showChoosingPicture() {
    let file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append("multipartFile", file);
    setMultipartFile(formData)
    setSelectedImage(URL.createObjectURL(file));
  }
  function savePicture() {
    let id = JSON.parse(localStorage.getItem('authorizedUser')).id
       console.log(multipartFile.get("multipartFile"))
    if(title === "Select profile picture"){
      dispatch(uploadAvatar({multipartFile: multipartFile, id:id}))
    }
    else if(title === "Select cover picture"){
      dispatch(uploadCoverPhoto({multipartFile: multipartFile, id:id}))
    }
    const editUser =  dispatch(getProfile())
    editUser.then(result =>{
      console.log(result.payload)
      localStorage.setItem("authorizedUser",JSON.stringify(result.payload))
      localStorage.setItem("user",JSON.stringify(result.payload))
      dispatch(setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser"))))
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))))

    })
  }
  return (
    <>
      <StyledEditedPartButton onClick={handleOpen}>Edit</StyledEditedPartButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <StyledModalBlock style={{ maxHeight: "450px" }}>
          <StyledModalCloseButton onClick={handleClose}>
            <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
          </StyledModalCloseButton>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledModalSeparator></StyledModalSeparator>
          <Box sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {selectedImage ? (
              <img src={selectedImage} alt="Selected image" />
            ) : (
              <StyledSelectButton type={"file"}>
                <StyledSelectButtonIcon>
                  <UploadIcon sx={{ fontSize: 40 + "px" }} />
                </StyledSelectButtonIcon>
                <StyledSelectButtonText>Upload picture</StyledSelectButtonText>
                <input
                  type="file"
                  name="select"
                  id="selectPicture"
                  style={{ display: "none" }}
                  ref={fileRef}
                  onChange={showChoosingPicture}
                />
              </StyledSelectButton>
            )}
          </Box>
          <StyledModalSeparator></StyledModalSeparator>

          {selectedImage && (
            <StyledSelectButtons>
              <ProfilePageButton
                text="Cancel"
                clickAction={() => setSelectedImage(null)}
              />
              <ProfilePageButton
                text="Save"
                style={{
                  backgroundColor: theme.palette.buttonColor.primary,
                  color: "#ffffff",
                }}
                clickAction={savePicture}
              />
            </StyledSelectButtons>
          )}
        </StyledModalBlock>
      </Modal>
    </>
  );
}

EditChildModal.defaultProps = {
  title: "Child modal",
};
