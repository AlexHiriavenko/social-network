import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import styles from "./profile-header.module.scss";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import styled from "@emotion/styled";
import {
  ProfileContainer,
  StyledProfileButton,
} from "../StyledComponents/ContentBlock/StyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../../../redux/ThemeSlice/theme.slice";

const user = {
  full_name: "Julian Read",
  profile_picture:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
  profile_background_picture:
    "https://image.geo.de/30145342/t/Cs/v4/w1440/r0/-/nationalpark-saechsische-schweiz-mauritius-reya43-jpg--82748-.jpg",
};

export default function ProfileHeader() {
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const StyledProfileHeader = styled(Box)(({ theme }) => ({
    backgroundColor: (themeMode === "light"
      ? theme.palette.light
      : theme.palette.dark
    ).backgroundSection,
  }));
  const StyledProfileShowMutualFriend = styled("button")(({ theme }) => ({
    backgroundColor: (themeMode === "light"
      ? theme.palette.light
      : theme.palette.dark
    ).buttonBackground,
    "&:hover": {
      backgroundColor: (themeMode === "light"
        ? theme.palette.light
        : theme.palette.dark
      ).buttonBackgroundHover,
    },
  }));
  const StyledProfileShowButtonLine = styled("span")(({ theme }) => ({
    "&::before": {
      backgroundColor: (themeMode === "light"
        ? theme.palette.light
        : theme.palette.dark
      ).textColor,
    },
    "&::after": {
      backgroundColor: (themeMode === "light"
        ? theme.palette.light
        : theme.palette.dark
      ).textColor,
    },
  }));
  const StyledProfileBackgroundButton = styled(StyledProfileButton)({
    color: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.53)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.63)",
    },
  });
  const StyledProfileUserPicture = styled("img")(({ theme }) => ({
    objectFit: "cover",
    borderRadius: "50%",
    border: `5px solid ${
      (themeMode === "light" ? theme.palette.light : theme.palette.dark)
        .backgroundSection
    }`,
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
    backgroundColor: (themeMode === "light"
      ? theme.palette.light
      : theme.palette.dark
    ).buttonBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: (themeMode === "light" ? theme.palette.light : theme.palette.dark)
      .textColor,
  }));
  const StyledProfileUserName = styled("p")(({ theme }) => ({
    color: (themeMode === "light" ? theme.palette.light : theme.palette.dark)
      .textColor,
    fontSize: "32px",
    fontWeight: "900",
  }));
  const StyledProfileUserFriends = styled("a")(({ theme }) => ({
    color: (themeMode === "light" ? theme.palette.light : theme.palette.dark)
      .textColorAdditional,
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "5px",
  }));

  return (
    <StyledProfileHeader>
      <ProfileContainer>
        <Box className={styles.profile__background_picture_wrapper}>
          <img
            src={user.profile_background_picture}
            alt="profile_background_picture"
            className={styles.profile__background_picture}
          />
          <Box className={styles.profileBgBtnWrap}>
            <StyledProfileBackgroundButton className={styles.profile__bg_btn}>
              <CameraAltIcon fontSize="small" />
              <Typography className={styles.profile__btnText}>
                Edit cover photo
              </Typography>
            </StyledProfileBackgroundButton>
          </Box>
        </Box>
        <Box className={styles.profile__user_info_section}>
          <Box className={styles.profile__picture}>
            <StyledProfileUserPicture
              src={user.profile_picture}
              alt="profile_picture"
              width={168}
              height={168}
              className={styles.profile__user_image}
            />
            <StyledProfileUserPictureButton
              className={styles.profile__change_user_picture}
            >
              <CameraAltIcon />
            </StyledProfileUserPictureButton>
          </Box>
          <Box className={styles.profile__user_info}>
            <StyledProfileUserName>{user.full_name}</StyledProfileUserName>
            <StyledProfileUserFriends href="#">
              Friends: {54}
            </StyledProfileUserFriends>
            <AvatarGroup max={6} className={styles.profile__avatar_group}>
              <Avatar alt="Remy Sharp" src="#" />
              <Avatar alt="Travis Howard" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Trevor Henderson" src="#" />
            </AvatarGroup>
          </Box>
          <div className={styles.profile_buttons}>
            <StyledProfileButton className={styles.profile__bg_btn}>
              <ModeEditOutlineIcon />
              Edit profile
            </StyledProfileButton>
            <StyledProfileShowMutualFriend
              className={`${styles.profile__show_btn} ${styles.profile__show_btn_active} `}
              onClick={() => {
                themeMode === "light"
                  ? dispatch(darkMode())
                  : dispatch(lightMode());
              }}
            >
              <StyledProfileShowButtonLine
                className={styles.profile__show_line}
                
              ></StyledProfileShowButtonLine>
            </StyledProfileShowMutualFriend>
          </div>
        </Box>
      </ProfileContainer>
    </StyledProfileHeader>
  );
}

