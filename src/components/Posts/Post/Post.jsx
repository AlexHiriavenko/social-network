import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { BlockUserImage } from "../../UserProfile/StyledComponents/ContentBlock/StyledComponents";

// Post Styles
const StyledPost = styled("li")(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.section,
  borderRadius: "12px",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingTop: "16px",
  paddingBottom: "8px",
  maxWidth: "680px",
  fontFamily: "sans-serif",
}));
const StyledPostAuthor = styled(Box)({
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
  paddingRight: "16px",
  paddingLeft: "16px",
  marginBottom: "16px",
});
const StyledPostAuthorName = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: theme.palette.textColor.main,
  fontWeight: 600,
}));
const StyledPostContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "15px",
  paddingRight: "16px",
  paddingLeft: "16px",
  marginBottom: "16px",
  fontFamily: "sans-serif",
}));
const StyledPostImages = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  rowGap: "3px",
});
const StyledPostImage = styled("img")({
  objectFit: "cover",
  width: "100%",
  transitionDuration: "300ms",
  "&:hover": {
    opacity: "0.9",
  },
});
const StyledPostImageItem = styled("li")({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
});
const StyledPostLastShowedItem = styled("span")({
  position: "absolute",
  width: "100%",
  height: "100%",
  color: "#fff",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "45px",
  transitionDuration: "300ms",
  backgroundColor: "rgba(5, 5, 5, 0.489)",
  "&:hover": {
    backgroundColor: "rgba(5, 5, 5, 0.594)",
  },
});
const StyledPostExtraImages = styled("ul")({
  display: "flex",
  columnGap: "3px",
});
const StyledPostReach = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  columnGap: "10px",
  paddingRight: "16px",
  paddingLeft: "16px",
  paddingTop: "10px",
  paddingBottom: "10px",
});
const StyledPostReachItem = styled("a")(({ theme }) => ({
  color: theme.palette.textColor.secondary,
  fontSize: "15px",
  "&:nth-of-type(2)": {
    marginLeft: "auto",
  },
  "&:hover": {
    textDecoration: "underline",
  },
}));
const StyledPostButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingRight: "16px",
  paddingLeft: "16px",
  paddingTop: "2px",
  paddingBottom: "2px",
  borderTop: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
  borderBottom: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
}));
const StyledPostButton = styled(Button)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  columnGap: "5px",
  color: theme.palette.textColor.secondary,
  fontSize: "15px",
  fontWeight: 600,
  textTransform: "inherit",
  transitionDuration: "300ms",
  borderRadius: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  "&:hover": {
    backgroundColor: theme.palette.buttonColor.backgroundColor,
  },
}));

export default function Post(props) {
  const { user, likes, comments, reposts, content, postImages } = props;
  const photosRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(195);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (photosRef.current) setPhotoHeight(photosRef.current.width);
    });
  }, [photosRef]);
  useEffect(() => {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }, []);
  return (
    <StyledPost>
      <StyledPostAuthor>
        <BlockUserImage
          src={user.profilePicture}
          alt="Author image"
          width={40}
          height={40}
        />
        <StyledPostAuthorName>{user.fullName}</StyledPostAuthorName>
      </StyledPostAuthor>

      <StyledPostContent>{content}</StyledPostContent>

      <StyledPostImages>
        {postImages.length > 0 && (
          <StyledPostImage src={postImages[0].imgUrl} alt="post image" />
        )}
        <StyledPostExtraImages>
          {postImages.length > 0 &&
            postImages.map((postImage, index) => {
              if (index === 0) return;
              if (index > 3) return;
              if (index === 3) {
                return (
                  <StyledPostImageItem key={index}>
                    <StyledPostLastShowedItem>
                      +{postImages.length - 3}
                    </StyledPostLastShowedItem>
                    <StyledPostImage
                      src={postImage.imgUrl}
                      alt="post image"
                      ref={photosRef}
                      width={195}
                      height={photoHeight}
                    />
                  </StyledPostImageItem>
                );
              } else {
                return (
                  <StyledPostImageItem key={index}>
                    <StyledPostImage
                      src={postImage.imgUrl}
                      alt="post image"
                      ref={photosRef}
                      width={195}
                      height={photoHeight}
                    />
                  </StyledPostImageItem>
                );
              }
            })}
        </StyledPostExtraImages>
      </StyledPostImages>
      <StyledPostReach>
        <StyledPostReachItem>
          {likes.length > 0 ? `${likes.length} likes` : null}
        </StyledPostReachItem>
        <StyledPostReachItem>
          {comments.length > 0 ? `${comments.length} comments` : null}
        </StyledPostReachItem>
        <StyledPostReachItem>
          {reposts.length > 0 ? `${reposts.length} shares` : null}
        </StyledPostReachItem>
      </StyledPostReach>
      <StyledPostButtons>
        <StyledPostButton>
          <ThumbUpOffAltIcon sx={{ color: "#65676b" }} /> Like
        </StyledPostButton>
        <StyledPostButton>
          <ChatBubbleOutlineIcon sx={{ color: "#65676b" }} /> Comment
        </StyledPostButton>
        <StyledPostButton>
          <ReplyIcon sx={{ color: "#65676b" }} /> Share
        </StyledPostButton>
      </StyledPostButtons>
    </StyledPost>
  );
}
