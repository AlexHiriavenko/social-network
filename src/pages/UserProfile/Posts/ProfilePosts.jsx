import ProfileIntro from "../../../components/UserProfile/ProfileIntro";
import ProfilePostsPhotos from "../../../components/UserProfile/ProfilePosts/PostsPhotos";
import ProfilePostsFriends from "../../../components/UserProfile/ProfilePosts/PostsFriends";
import { useEffect, useRef, useState } from "react";
import CreatePost from "../../../components/Posts/CreatePost";
import PostList from "../../../components/Posts/Post/PostList";
import styled from "@emotion/styled";
import { ProfileContainer } from "../../../components/UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { Box } from "@mui/material";

const StyledPostsContainer = styled(ProfileContainer)({
  maxWidth: "1095px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "16px",
  paddingRight: "16px",
  display: "grid",
  alignItems: "start",
  gap: "15px",
  " @media (min-width: 925px)": {
    gridTemplateColumns: "1fr 1.5fr",
  },
});

const StyledPostsPage = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.page,
  paddingTop: "20px",
  paddingBottom: "20px",
}));

const StyledPostsLeftSide = styled(Box)({
  display: "flex",
  flexDirection: "column",
  rowGap: "11px",
});

const StyledPostsPublications = styled(Box)({
  display: "flex",
  flexDirection: "column",
  rowGap: "11px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0",
  },
});
export default function ProfilePosts() {
  const userInfoRef = useRef(null);
  const [userInfoHeight, setUserInfoHeight] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (userInfoRef.current !== null) {
        setUserInfoHeight(userInfoRef.current.getBoundingClientRect().height);
      }
    }, 500);
  }, [userInfoRef.current]);
  return (
    <StyledPostsPage>
      <StyledPostsContainer>
        <StyledPostsLeftSide ref={userInfoRef}>
          <ProfileIntro />
          <ProfilePostsPhotos />
          <ProfilePostsFriends />
        </StyledPostsLeftSide>
        <StyledPostsPublications
          style={{
            maxHeight: userInfoHeight + "px",
          }}
        >
          <CreatePost />
          <PostList />
        </StyledPostsPublications>
      </StyledPostsContainer>
    </StyledPostsPage>
  );
}
