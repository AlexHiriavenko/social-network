import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import styled from "@emotion/styled";
import { ProfileContainer } from "../StyledComponents/ContentBlock/StyledComponents";
import ProfilePageButton from "../ProfilePageButton/ProfilePageButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openEditProfileModal } from "../../../redux/modal.slice/modal.slice";

const StyledProfileBackgroundWrapper = styled(Box)({
  maxHeight: "450px",
  overflow: "hidden",
  borderBottomRightRadius: " 12px",
  borderBottomLeftRadius: " 12px",
  position: "relative",
});
const StyledProfileBackgroundWButtonsWrapper = styled(Box)({
  position: "absolute",
  right: "25px",
  bottom: "15px",
  maxWidth: "317px",
});
const StyledProfileBackgroundWButtonText = styled(Typography)({
  "@media (max-width: 850px)": {
    display: "none",
  },
});
const StyledProfileHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.section,
}));
const StyledProfileShowMutualFriend = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.buttonColor.background,
  transitionDuration: "500ms",
  height: "34px",
  width: "48px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.buttonColor.backgroundHover,
  },
}));
const StyledProfileShowButtonLine = styled("span")(({ theme }) => ({
  "&::before": {
    content: '""',
    display: "block",
    width: "10px",
    height: "3px",
    backgroundColor: theme.palette.textColor.main,
    transform: "rotate(30deg)",
    borderRadius: "1px",
    position: "relative",
    top: "1px",
    right: "4px",
  },
  "&::after": {
    content: '""',
    display: "block",
    width: "10px",
    height: "3px",
    backgroundColor: theme.palette.textColor.main,
    transform: "rotate(-30deg)",
    position: "relative",
    borderRadius: "1px",
    top: "-2px",
    right: "-3px",
  },
}));
const StyledProfileShowButtonLineOpen = styled("span")(({ theme }) => ({
  "&::before": {
    content: '""',
    display: "block",
    width: "10px",
    height: "3px",
    backgroundColor: theme.palette.textColor.main,
    transform: "rotate(-30deg)",
    borderRadius: "1px",
    position: "relative",
    top: "1px",
    right: "4px",
  },
  "&::after": {
    content: '""',
    display: "block",
    width: "10px",
    height: "3px",
    backgroundColor: theme.palette.textColor.main,
    transform: "rotate(30deg)",
    position: "relative",
    borderRadius: "1px",
    top: "-2px",
    right: "-3px",
  },
}));
const StyledProfileBackgroundButton = styled(ProfilePageButton)({
  color: "#ffffff",
  backgroundColor: "rgba(0, 0, 0, 0.53)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.63)",
  },
});
const StyledProfileUserInfoSection = styled(Box)({
  display: "flex",
  paddingLeft: "198px",
  paddingRight: "16px",
  position: "relative",
  "@media (max-width: 850px)": {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "16px",
  },
});
const StyledProfileUserPictureWrapper = styled(Box)({
  marginRight: "16px",
  borderRadius: "50%",
  position: "absolute",
  minWidth: "168px",
  left: "16px",
  top: "-40px",
  "@media (max-width: 850px)": {
    left: "50%",
    transform: "translateX(-84px)",
    top: "-84px",
  },
});
const StyledProfileUserInfo = styled(Box)({
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingTop: "18px",
  paddingBottom: "15px",
  "@media (max-width: 850px)": {
    paddingTop: "84px",
    marginRight: "0",
    alignItems: "center",
    rowGap: "10px",
  },
});
const StyledProfileButtonsWrapper = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  paddingBottom: "15px",
  columnGap: "5px",
});
const StyledProfileUserPicture = styled("img")(({ theme }) => ({
  objectFit: "cover",
  borderRadius: "50%",
  border: `5px solid ${theme.palette.backgroundColor.section}`,
  cursor: "pointer",
  "&:active": {
    transform: "scale(0.95)",
  },
}));
const StyledProfileUserPictureButton = styled("button")(({ theme }) => ({
  position: "absolute",
  bottom: "17px",
  right: "2px",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: theme.palette.buttonColor.background,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.textColor.main,
}));
const StyledProfileUserName = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "32px",
  fontWeight: "900",
}));
const StyledProfileUserFriends = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.secondary,
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "5px",
}));

export default function ProfileHeader() {
  const [mutualFriendsIsOpen, setMutualFriendsStatus] = useState(true);
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(openEditProfileModal());

  const user = useSelector((state) => state.user.user);

  return (
    <StyledProfileHeader>
      <ProfileContainer>
        <StyledProfileBackgroundWrapper>
          <img
            src={user ? user.profileBackgroundPicture : ""}
            alt="profile_background_picture"
          />
          <StyledProfileBackgroundWButtonsWrapper>
            <StyledProfileBackgroundButton
              text={
                <StyledProfileBackgroundWButtonText>
                  Edit cover photo
                </StyledProfileBackgroundWButtonText>
              }
              icon={<CameraAltIcon fontSize="small" />}
            />
          </StyledProfileBackgroundWButtonsWrapper>
        </StyledProfileBackgroundWrapper>
        <StyledProfileUserInfoSection>
          <StyledProfileUserPictureWrapper>
            <StyledProfileUserPicture
              src={user ? user.profilePicture : ""}
              alt="profile_picture"
              width={168}
              height={168}
            />
            <StyledProfileUserPictureButton>
              <CameraAltIcon />
            </StyledProfileUserPictureButton>
          </StyledProfileUserPictureWrapper>
          <StyledProfileUserInfo>
            <StyledProfileUserName>
              {user ? user.fullName : ""}
            </StyledProfileUserName>
            <StyledProfileUserFriends href="#">
              Friends: {user && user.friends ? user.friends.length : 0}
            </StyledProfileUserFriends>
            <AvatarGroup
              max={6}
              sx={{ cursor: "pointer", justifyContent: "flex-end" }}
            >
              <Avatar alt="Remy Sharp" src="#" />
              <Avatar alt="Travis Howard" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Trevor Henderson" src="#" />
            </AvatarGroup>
          </StyledProfileUserInfo>
          <StyledProfileButtonsWrapper>
            <ProfilePageButton
              text={<Typography>Edit profile</Typography>}
              icon={<ModeEditOutlineIcon />}
              clickAction={handleOpen}
            />
            <StyledProfileShowMutualFriend
              onClick={() => setMutualFriendsStatus(!mutualFriendsIsOpen)}
            >
              {mutualFriendsIsOpen ? (
                <StyledProfileShowButtonLineOpen></StyledProfileShowButtonLineOpen>
              ) : (
                <StyledProfileShowButtonLine></StyledProfileShowButtonLine>
              )}
            </StyledProfileShowMutualFriend>
          </StyledProfileButtonsWrapper>
        </StyledProfileUserInfoSection>
      </ProfileContainer>
    </StyledProfileHeader>
  );
}
