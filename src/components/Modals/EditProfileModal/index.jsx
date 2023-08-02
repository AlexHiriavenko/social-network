import { Box, Button, Modal, Typography } from "@mui/material";
import {
  StyledModalBlock,
  StyledModalCloseButton,
  StyledModalCloseButtonLine,
  StyledModalSeparator,
  StyledModalTitle,
} from "../StyledModalComponents";
import { useDispatch, useSelector } from "react-redux";
import { closeEditProfileModal } from "../../../redux/modal.slice/modal.slice";
import styled from "@emotion/styled";
import ProfilePageButton from "../../UserProfile/ProfilePageButton/ProfilePageButton";
import IntroBio from "../../UserProfile/ProfileIntro/IntroBio";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledEditProfileModal = styled(StyledModalBlock)({
  maxWidth: "710px",
});
const StyledEditedPart = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  padding: "20px 16px 20px 16px",
});
const StyledEditedPartTitle = styled("h2")(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "20px",
  fontWeight: 700,
}));
const StyledEditedPartButton = styled("button")(({ theme }) => ({
  color: theme.palette.accentColor.main,
  fontSize: "17px",
  padding: "5px",
  borderRadius: "5px",
  lineHeight: "100%",
  transitionDuration: "300ms",
  "&:hover": {
    backgroundColor: theme.palette.accentColor.secondary,
  },
}));
const StyledEditedContentWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});
const StyledEditedUserPicture = styled("img")({
  borderRadius: "50%",
  objectFit: "cover",
  marginTop: "16px",
});
const StyledEditedCoverPicture = styled("img")({
  borderRadius: "10px",
  objectFit: "cover",
  marginTop: "16px",
});
const StyledEditedBio = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.secondary,
  fontSize: "17px",
  textAlign: "center",
  marginTop: "16px",
}));
const StyledEditProfileButton = styled(ProfilePageButton)(({ theme }) => ({
  width: "100%",
  color: theme.palette.accentColor.main,
  backgroundColor: theme.palette.accentColor.secondary,
  transitionDuration: "300ms",
  "&:hover": {
    backgroundColor: theme.palette.accentColor.secondary,
  },
}));

export default function EditProfileModal() {
  // Constants
  const dispatch = useDispatch();
  const editProfileModalIsOpen = useSelector(
    (state) => state.modal.editProfile.isOpen
  );
  const authUser = useSelector((state) => state.user.authorizedUser);
  const navigate = useNavigate();
  // States
  const [isEdit, setInputStatus] = useState(false);
  const [userAbout, setUserAbout] = useState("");
  // Functions
  function editBio() {
    setInputStatus(!isEdit);
  }
  const handleClose = () => dispatch(closeEditProfileModal());
  // UseEffect
  useEffect(() => {
    if (authUser && authUser.about) {
      setUserAbout(authUser.about);
    }
  }, [authUser]);
  return (
    <Modal
      open={editProfileModalIsOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ paddingLeft: "5px", paddingRight: "5px" }}
    >
      <StyledEditProfileModal>
        <StyledModalCloseButton onClick={handleClose}>
          <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
        </StyledModalCloseButton>
        <StyledModalTitle>Edit profile</StyledModalTitle>
        <StyledModalSeparator></StyledModalSeparator>
        <StyledEditedPart>
          <StyledEditedPartTitle>Profile picture</StyledEditedPartTitle>
          <StyledEditedPartButton>Edit</StyledEditedPartButton>
          <StyledEditedContentWrapper>
            <StyledEditedUserPicture
              src={authUser && authUser.profilePicture}
              width={168}
              height={168}
            />
          </StyledEditedContentWrapper>
        </StyledEditedPart>
        <StyledEditedPart>
          <StyledEditedPartTitle>Cover Photo</StyledEditedPartTitle>
          <StyledEditedPartButton>Edit</StyledEditedPartButton>
          <StyledEditedContentWrapper>
            <StyledEditedCoverPicture
              src={authUser && authUser.profileBackgroundPicture}
              width={500}
              height={168}
            />
          </StyledEditedContentWrapper>
        </StyledEditedPart>
        <StyledEditedPart>
          <StyledEditedPartTitle>Bio</StyledEditedPartTitle>
          <StyledEditedPartButton onClick={editBio}>
            Edit
          </StyledEditedPartButton>
          <StyledEditedContentWrapper>
            {!isEdit && <StyledEditedBio>{userAbout}</StyledEditedBio>}
            <IntroBio
              edit={isEdit}
              userAbout={userAbout}
              setEditState={editBio}
            />
          </StyledEditedContentWrapper>
        </StyledEditedPart>
        <StyledEditedPart>
          <StyledEditProfileButton
            text={"Edit your About info"}
            clickAction={() => {
              navigate("/profile/about");
              dispatch(closeEditProfileModal());
            }}
          />
        </StyledEditedPart>
      </StyledEditProfileModal>
    </Modal>
  );
}
