import { useEffect, useRef, useState } from "react";
import {
  ContentBlock,
  ContentBlockHeader,
  ContentBlockLink,
  ContentBlockList,
  ContentBlockTitel,
} from "../StyledComponents/ContentBlock/StyledComponents";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  getUser,
  setFriends,
  setUser,
} from "../../../redux/user.slice/user.slice";

const StyledPostFriendsSubtitle = styled(Typography)(({ theme }) => ({
  width: "100%",
  color: theme.palette.textColor.secondary,
  paddingLeft: "16px",
}));

const StyledPostFriendsList = styled(ContentBlockList)({
  gap: "11px",
});

const StyledPostFriendItem = styled(Box)({
  cursor: "pointer",
  "&:hover img": {
    transform: "scale(0.98)",
  },
});
const StyledPostFriendImage = styled("img")({
  objectFit: "cover",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "204px",
  transitionDuration: "500ms",
});
const StyledPostFriendName = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "sans-serif",
}));
export default function ProfilePostsFriends() {
  // Constants
  const photosRef = useRef(null);
  const authUser = useSelector((state) => state.user.authorizedUser);
  const userFriends = useSelector((state) => state.user.friends);
  const dispatch = useDispatch();

  // State
  const [photoHeight, setPhotoHeight] = useState(204);

  // UseEffect
  // Photo size
  useEffect(() => {
    window.addEventListener("resize", resizePhotoHeigh);
    return function () {
      window.removeEventListener("resize", resizePhotoHeigh);
    };
  }, [photosRef]);
  useEffect(() => {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }, [photosRef.current]);

  // Functions
  function resizePhotoHeigh() {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }

  function lookFriendPage(friend) {
    // get user friends
    const userFriendsResponse = dispatch(getFriends(friend.id));
    userFriendsResponse
      .then((data) => {
        dispatch(setFriends(data.payload));
        localStorage.setItem("friends", JSON.stringify(data.payload));
      })
      .catch((error) => console.log(error.message));

    if (friend.id === authUser.id) {
      dispatch(setUser(authUser));
      localStorage.setItem("user", JSON.stringify(authUser));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const lookedFriend = dispatch(getUser(friend.id));
      lookedFriend
        .then((data) => {
          dispatch(setUser(data.payload));
          localStorage.setItem("user", JSON.stringify(data.payload));
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => console.log(error.message));
    }
  }
  return (
    <ContentBlock style={{ maxWidth: "680px" }}>
      <ContentBlockHeader>
        <ContentBlockTitel>Friends</ContentBlockTitel>
        <ContentBlockLink to={"/profile/friends"}>
          See all friends
        </ContentBlockLink>
      </ContentBlockHeader>
      <StyledPostFriendsSubtitle>
        {userFriends.length} friends
      </StyledPostFriendsSubtitle>
      <StyledPostFriendsList>
        {userFriends.map((friend, index) => {
          return (
            <StyledPostFriendItem
              key={index}
              onClick={() => lookFriendPage(friend.friend)}
            >
              <StyledPostFriendImage
                src={
                  friend.friend.profilePicture ||
                  "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                }
                alt="foto"
                width={204}
                height={photoHeight}
                ref={photosRef}
              />
              <StyledPostFriendName>
                {friend.friend.fullName}
              </StyledPostFriendName>
            </StyledPostFriendItem>
          );
        })}
      </StyledPostFriendsList>
    </ContentBlock>
  );
}
