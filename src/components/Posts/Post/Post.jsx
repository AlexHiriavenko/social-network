import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { BlockUserImage } from "../../UserProfile/StyledComponents/ContentBlock/StyledComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  likePost,
  removeLikePost,
} from "../../../redux/post.slice/post.slice";
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "../../../redux/user.slice/user.slice";
import {
  openCreateCommentModal,
  openCreateModal,
  setRepostToModal,
} from "../../../redux/modal.slice/modal.slice";

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
  cursor: "pointer",
}));
const StyledPostDate = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: theme.palette.textColor.secondary,
}));
const StyledPostContent = styled(Box)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "15px",
  paddingRight: "16px",
  paddingLeft: "16px",
  fontFamily: "sans-serif",
}));
const StyledPostContentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "15px",
  marginBottom: "10px",
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
const StyledPostButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.secondary,
  fontSize: "15px",
  fontWeight: 600,
  "@media (max-width: 450px)": {
    display: "none",
  },
}));
// Repost
const StyledRePostWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "12px",
  border: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
  overflow: "hidden",
}));

export default function Post(props) {
  // Constats
  const {
    user,
    likes,
    comments,
    reposts,
    content,
    postImages,
    createdDate,
    parentId,
    id,
    inModal,
  } = props;
  console.log(likes);
  const photosRef = useRef(null);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user?.authorizedUser);
  const navigate = useNavigate();
  // State
  const [photoHeight, setPhotoHeight] = useState(195);
  const [repost, setRepost] = useState({});
  const [isLiked, setLikedStatus] = useState(false);
  const [likesAmount, setLikesAmount] = useState(likes?.length);
  // Functions
  const handleOpenComment = () => {
    dispatch(openCreateCommentModal(props));
    // dispatch(setPost(props));
  }
  function getPostDate(postDate) {
    const date = new Date(postDate);
    let month;

    switch (date.getMonth()) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Feb";
        break;
      case 2:
        month = "Mar";
        break;
      case 3:
        month = "Apr";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "Jun";
        break;
      case 6:
        month = "Jul";
        break;
      case 7:
        month = "Aug";
        break;
      case 8:
        month = "Sep";
        break;
      case 9:
        month = "Oct";
        break;
      case 10:
        month = "Nov";
        break;
      case 11:
        month = "Dec";
        break;
      default:
        month = "Invalid month number";
    }

    return month + " " + date.getDate();
  }
  function like() {
    dispatch(likePost(id));
    setLikedStatus(true);
    setLikesAmount(likesAmount + 1);
  }
  function removeLike() {
    dispatch(removeLikePost(id));
    setLikedStatus(false);
    setLikesAmount(likesAmount - 1);
  }
  function repostPost() {
    dispatch(setRepostToModal(props));
    dispatch(openCreateModal());
  }
  function lookUser(id) {
    if (id === authUser?.id) {
      dispatch(setUser(authUser));
      navigate("/profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const userResponse = dispatch(getUser(id));
      userResponse
        .then((data) => {
          dispatch(setUser(data.payload));
          navigate("/profile");
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => error.message);
    }
  }
  // UseEffect
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (photosRef.current) setPhotoHeight(photosRef.current.width);
    });
  }, [photosRef]);

  useEffect(() => {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }, []);
  useEffect(() => {
    if (!parentId) return;
    const parentPostResponse = dispatch(getPost(parentId?.id));
    parentPostResponse
      .then((data) => setRepost(data.payload))
      .catch((error) => console.log(error.message));
  }, [parentId]);
  useEffect(() => {
    if (!authUser) return;


    if (likes.find((like) => like?.id === authUser?.id)) {

      setLikedStatus(true);
    } else {
      setLikedStatus(false);
    }
  }, [likes]);
  return (
    <StyledPost>
      <StyledPostAuthor>
        <BlockUserImage
          src={
            user?.profilePicture ||
            "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
          }
          alt="Author image"
          width={40}
          height={40}
          onClick={() => lookUser(user?.id)}
        />
        <Box>
          <StyledPostAuthorName onClick={() => lookUser(user?.id)}>
            {user?.fullName}
          </StyledPostAuthorName>
          <StyledPostDate>{getPostDate(createdDate)}</StyledPostDate>
        </Box>
      </StyledPostAuthor>

      <StyledPostContent>
        <StyledPostContentText>{content}</StyledPostContentText>

        {parentId && (
          <StyledRePostWrapper>
            <StyledPostImages>
              {repost?.postImages && repost?.postImages?.length > 0 && (
                <StyledPostImage
                  src={repost?.postImages[0]?.imgUrl}
                  alt="post image"
                />
              )}
              <StyledPostExtraImages>
                {repost?.postImages &&
                  repost?.postImages?.length > 0 &&
                  repost?.postImages?.map((postImage, index) => {
                    if (index === 0) return;
                    if (index > 3) return;
                    if (index === 3) {
                      return (
                        <StyledPostImageItem key={index}>
                          <StyledPostLastShowedItem>
                            +{repost?.postImages?.length - 3}
                          </StyledPostLastShowedItem>
                          <StyledPostImage
                            src={postImage?.imgUrl}
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
                            src={postImage?.imgUrl}
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
            <StyledPostAuthor style={{ paddingTop: "16px" }}>
              <BlockUserImage
                src={
                  (repost?.user && repost?.user.profilePicture) ||
                  "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                }
                alt="Author image"
                width={40}
                height={40}
                onClick={() => lookUser(repost?.user.id)}
              />
              <Box>

                <StyledPostAuthorName onClick={() => lookUser(repost?.user?.id)}>
                  {repost?.user && repost?.user?.fullName}

                </StyledPostAuthorName>
                <StyledPostDate>
                  {getPostDate(repost && repost?.createdDate)}
                </StyledPostDate>
              </Box>
            </StyledPostAuthor>
            <StyledPostContentText style={{ paddingLeft: "16px" }}>
              {repost && repost?.content}
            </StyledPostContentText>
          </StyledRePostWrapper>
        )}
      </StyledPostContent>

      {!parentId && (
        <StyledPostImages>
          {postImages?.length > 0 && (
            <StyledPostImage src={postImages[0].imgUrl} alt="post image" />
          )}
          <StyledPostExtraImages>
            {postImages?.length > 0 &&
              postImages?.map((postImage, index) => {
                if (index === 0) return;
                if (index > 3) return;
                if (index === 3) {
                  return (
                    <StyledPostImageItem key={index}>
                      <StyledPostLastShowedItem>
                        +{postImages?.length - 3}
                      </StyledPostLastShowedItem>
                      <StyledPostImage
                        src={postImage?.imgUrl}
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
                        src={postImage?.imgUrl}
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
      )}

      <StyledPostReach>
        <StyledPostReachItem>
          {likes?.length > 0 ? `${likesAmount} likes` : null}
        </StyledPostReachItem>
        <StyledPostReachItem>

          {comments?.length > 0 ? `${comments?.length} comments` : null}
        </StyledPostReachItem>
        <StyledPostReachItem>
          {reposts?.length > 0 ? `${reposts?.length} shares` : null}

        </StyledPostReachItem>
      </StyledPostReach>
      {!inModal && (
        <StyledPostButtons>
          <StyledPostButton onClick={isLiked ? removeLike : like}>
            {isLiked ? (
              <ThumbUpAltIcon sx={{ color: "#65676b" }} />
            ) : (
              <ThumbUpOffAltIcon sx={{ color: "#65676b" }} />
            )}
            <StyledPostButtonText>Like</StyledPostButtonText>
          </StyledPostButton>
          <StyledPostButton onClick={handleOpenComment}>
            <ChatBubbleOutlineIcon sx={{ color: "#65676b" }} />{" "}
            <StyledPostButtonText>Comment</StyledPostButtonText>
          </StyledPostButton>
          <StyledPostButton onClick={repostPost}>
            <ReplyIcon sx={{ color: "#65676b" }} />{" "}
            <StyledPostButtonText>Share</StyledPostButtonText>
          </StyledPostButton>
        </StyledPostButtons>
      )}
    </StyledPost>
  );
}

Post.defaultProps = {
  inModal: false,
};
