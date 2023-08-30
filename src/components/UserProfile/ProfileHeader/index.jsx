import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import styled from "@emotion/styled";
import { ProfileContainer } from "../StyledComponents/ContentBlock/StyledComponents";
import ProfilePageButton from "../ProfilePageButton/ProfilePageButton";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { openEditProfileModal } from "../../../redux/modal.slice/modal.slice";
import {
  getFriends,
  getUser,
  setFriends,
  setUser,
} from "../../../redux/user.slice/user.slice";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { updateFriendship, createFriendship, getFriendshipRequests } from '../../../redux/friends/actionCreators';
import { setCurrentFriend } from '../../../redux/friends/friends.slise';

const StyledProfileBackgroundWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "450px",
  minHeight: "150px",
  overflow: "hidden",
  borderBottomRightRadius: " 12px",
  borderBottomLeftRadius: " 12px",
  position: "relative",
  backgroundColor: theme.palette.backgroundColor.pageSeparator,
  width: "100%",
}));
const StyledProfileBackgroundPicture = styled("img")({
  width: "100%",
  objectFit: "cover",
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
  minHeight: "147px",
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
  // Constants
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.user.user);
  const authUser = useSelector((state) => state.user.authorizedUser);
  const userFriends = useSelector((state) => state.user.friends);
  const friendsRequests = useSelector((store)=>store.friends.friendsRequests, shallowEqual);
  const friendRecord = userFriends?.filter(el => el.friend.id === authUser.id);
  const reqauestRecord = friendsRequests?.filter(el =>  el.status==='pending' && ( el.friend.id === user.id || el.user.id === user.id));
  const buttonText = friendRecord.length > 0 && friendRecord[0].status === "accepted" 
      ? "Remove from friends" 
      : reqauestRecord?.length > 0 && reqauestRecord[0].user.id === user.id
        ? "Confirm request" 
        : reqauestRecord?.length > 0 && reqauestRecord[0].friend.id === user.id
        ? "Cancel request" : "Add to friends"; 

  // State
  const [mutualFriendsIsOpen, setMutualFriendsStatus] = useState(true);
  const [isAuthorized, setAuthorized] = useState(false);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  // Functions
  const handleOpen = () => dispatch(openEditProfileModal());
  function lookUser(id) {
    // get user friends
    const userFriendsResponse = dispatch(getFriends(id));
    userFriendsResponse
      .then((data) => {
        if(data.payload){
          dispatch(setFriends(data.payload));
          localStorage.setItem("friends", JSON.stringify(data.payload));
        }

      })
      .catch((error) => console.log(error.message));
    // checking if the user is authorized
    if (id === authUser?.id) {
      dispatch(setUser(authUser));
      localStorage.setItem("user", JSON.stringify(authUser));
      navigate("/profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const userResponse = dispatch(getUser(id));
      userResponse
        .then((data) => {
          if(data.payload){
            dispatch(setUser(data.payload));
            localStorage.setItem("user", JSON.stringify(data.payload));
          }

          navigate("/profile");
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => error.message);
    }
    dispatch(getFriendshipRequests());
  }

  const handleAddFriendClick = (id) => {
    if (buttonText === 'Remove from friends') {
      const payload = {id: friendRecord[0].id, status: "unfriended"};
      dispatch(updateFriendship(payload));
    } else if (buttonText === 'Confirm request') {
      const payload = {id: reqauestRecord[0].id, status: "accepted"};
      dispatch(updateFriendship(payload));
    } else if (buttonText === 'Cancel request') {
      const payload = {id: reqauestRecord[0].id, status: "canceled"};
      dispatch(updateFriendship(payload));
    } else if (buttonText === 'Add to friends') {
      dispatch(setCurrentFriend({}));
      dispatch(createFriendship({friendId: id}));
    } 
  }
  // UseEffect
  useEffect(() => {
    if(user){
      setAuthorized(user?.isAuthorized);
    }

  }, [user]);
  useEffect(() => {
    const acceptedFriendsArray =  userFriends.length>0 ? userFriends.filter(
      (friendItem) => friendItem?.status === "accepted"
    ) :[];
    setAcceptedFriends(acceptedFriendsArray);
  }, [userFriends]);

  return (
    <StyledProfileHeader>
      <ProfileContainer>
        <StyledProfileBackgroundWrapper>
          {user && user?.profileBackgroundPicture && (
            <StyledProfileBackgroundPicture
              src={user?.profileBackgroundPicture}
              alt="profile_background_picture"
            />
          )}
          {isAuthorized && (
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
          )}
        </StyledProfileBackgroundWrapper>
        <StyledProfileUserInfoSection>
          <StyledProfileUserPictureWrapper>
            <StyledProfileUserPicture
              src={
                user && user?.profilePicture
                  ? user?.profilePicture
                  : "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
              }
              alt="profile_picture"
              width={168}
              height={168}
            />
            {isAuthorized && (
              <StyledProfileUserPictureButton>
                <CameraAltIcon />
              </StyledProfileUserPictureButton>
            )}
          </StyledProfileUserPictureWrapper>
          <StyledProfileUserInfo>
            <StyledProfileUserName>
              {user ? user?.fullName : ""}
            </StyledProfileUserName>
            <StyledProfileUserFriends href="#">
              Friends: {acceptedFriends.length}
            </StyledProfileUserFriends>
            <AvatarGroup
              max={6}
              sx={{ cursor: "pointer", justifyContent: "flex-end" }}
            >
              {acceptedFriends.map((friendItem, index) => {
                return (
                  <Avatar
                    alt={friendItem?.friend?.fullName}
                    src={friendItem?.friend?.profilePicture}
                    key={friendItem?.id}
                    title={friendItem?.friend?.fullName}
                    onClick={() => lookUser(friendItem?.friend?.id)}
                  />
                );
              })}
            </AvatarGroup>
          </StyledProfileUserInfo>
          <StyledProfileButtonsWrapper>
            {isAuthorized && (
              <>
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
              </>
            )}
            {!isAuthorized && (
              <ProfilePageButton
                text={
                  <Typography style={{ color: friendRecord.length > 0 ? theme.palette.textColor.content : theme.palette.backgroundColor.section, fontWeight: 600 }}>
                    {buttonText}
                  </Typography>
                }
                clickAction={() => handleAddFriendClick(user.id)}
                style={{
                  backgroundColor: friendRecord.length > 0 ? theme.palette.buttonColor.background : theme.palette.buttonColor.primary,
                }}
              />
            )}
          </StyledProfileButtonsWrapper>
        </StyledProfileUserInfoSection>
      </ProfileContainer>
    </StyledProfileHeader>
  );
}
