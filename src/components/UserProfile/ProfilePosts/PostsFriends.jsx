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
import { setUser } from "../../../redux/user.slice/user.slice";
const mockFriends = [
  {
    userPhoto:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
    userName: "Garry Potter",
  },
  {
    userPhoto: "https://myhero.com/images/guest/g282317/hero105677/image2.jpg",
    userName: "Hermione Granger",
  },
  {
    userPhoto:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
    userName: "Ron Weasley",
  },
];

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
  const [photoHeight, setPhotoHeight] = useState(204);
  const allUsers = useSelector((state) => state.user.allUsers);
  const authUser = useSelector((state) => state.user.authorizedUser);
  const dispatch = useDispatch();
  // State
  const [friends, setFriends] = useState([]);
  // UseEffect
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (photosRef.current) setPhotoHeight(photosRef.current.width);
    });
  }, [photosRef]);

  useEffect(() => {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }, [photosRef.current]);

  useEffect(() => {
    if (!allUsers) return;
    setFriends(allUsers);
  }, [allUsers]);
  // Functions
  function lookFriendPage(friend) {
    dispatch(setUser(friend));
    localStorage.setItem("user", JSON.stringify(friend));
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {friends.length} friends
      </StyledPostFriendsSubtitle>
      <StyledPostFriendsList>
        {friends.map((friend, index) => {
          return (
            <StyledPostFriendItem
              key={index}
              onClick={() => lookFriendPage(friend)}
            >
              <StyledPostFriendImage
                src={
                  friend.profilePicture ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
                }
                alt="foto"
                width={204}
                height={photoHeight}
                ref={photosRef}
              />
              <StyledPostFriendName>{friend.fullName}</StyledPostFriendName>
            </StyledPostFriendItem>
          );
        })}
      </StyledPostFriendsList>
    </ContentBlock>
  );
}
