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

const user = {
  full_name: "Julian Read",
  profile_picture:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
  profile_background_picture:
    "https://image.geo.de/30145342/t/Cs/v4/w1440/r0/-/nationalpark-saechsische-schweiz-mauritius-reya43-jpg--82748-.jpg",
  bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid vel quod accusamus dolor dicta odio quia commodi vitae, rerum amet fugiat, beatae dolores reiciendis! Praesentium tempore voluptates distinctio libero numquam.",
};

// const StyledEditProfile = styled()({})
// const StyledEditProfile = styled()(({theme})=>({}))
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
const StyledEditedPartButton = styled(Button)(({ theme }) => ({
  color: theme.palette.accentColor.main,
  fontSize: "17px",
  padding: "2px",
  lineHeight: "100%",
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
  "&:hover": {
    backgroundColor: theme.palette.accentColor.secondary,
  },
}));

export default function EditProfileModal() {
  const dispatch = useDispatch();
  const editProfileModalIsOpen = useSelector(
    (state) => state.modal.editProfile.isOpen
  );
  const handleClose = () => dispatch(closeEditProfileModal());

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
              src={user.profile_picture}
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
              src={user.profile_background_picture}
              width={500}
              height={168}
            />
          </StyledEditedContentWrapper>
        </StyledEditedPart>
        <StyledEditedPart>
          <StyledEditedPartTitle>Bio</StyledEditedPartTitle>
          <StyledEditedPartButton>Edit</StyledEditedPartButton>
          <StyledEditedContentWrapper>
            <StyledEditedBio>{user.bio}</StyledEditedBio>
          </StyledEditedContentWrapper>
        </StyledEditedPart>
        <StyledEditedPart>
          <StyledEditProfileButton text={"Edit your About info"} />
        </StyledEditedPart>
      </StyledEditProfileModal>
    </Modal>
  );
}
