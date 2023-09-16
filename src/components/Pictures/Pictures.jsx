import styled from "@emotion/styled";
import CloseBtn from "../SVG/CloseBtn";
import SvgFacebook from "../SVG/FaceBook";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { closePictures } from "../../redux/pictures.slice/picture.slice";
import { useEffect, useState } from "react";
import {Box, Button} from '@mui/material'
import Comment from "../Comment/index.jsx";
import CreateCommentModal from "../Modals/CreateCommentModal/index.jsx";
import SendIcon from "@mui/icons-material/Send.js";
import {useFormik} from "formik";
import {commentPost, setVisiblePosts} from "../../redux/post.slice/post.slice.js";
import {addImgComment, getImageComments, updateUser} from "../../redux/user.slice/user.slice.js";
import {editUser} from "../../editUser.js";
import {useTheme} from "@emotion/react";
const StyledPictureSection = styled("section")({
  backgroundColor: "#000",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 2222,
  width: "100vw",
  height: "100vh",
  paddingRight: "20px",
  paddingLeft: "20px",
  display: "none",
});
const StyledPictureCloseWrap = styled("div")({
  display: "flex",
  columnGap: "20px",
  alignItems: "center",
  position: "absolute",
  top: "10px",
  left: "20px",
  cursor: "pointer",
});
const StyledPictureWrap = styled("div")({
  display: "flex",
  columnGap: "20px",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});
const StyledArrowBtn = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#e4e6eb9e",
  width: 48 + "px",
  height: 48 + "px",
  borderRadius: "50%",
  transitionDuration: "400ms",
  ":hover": {
    backgroundColor: "#e4e6eb",
    transform: "translateX(10px)",
  },
  ":first-of-type": {
    ":hover": { transform: "translateX(-10px)" },
  },
});
const StyledPicture = styled("img")({
  maxWidth: "70%",
  maxHeight: "100vh",
  minWidth: "50%",
  objectFit: "cover",
});
const StyledPostModalCreateCommentArea = styled("form")(({ theme }) => ({

}));

const StyledPostModalTextArea = styled("textarea")(({ theme }) => ({
  color: theme.palette.textColor.main,
  backgroundColor: theme.palette.input.mainBackground,
  width: "100%",
  resize: "none",
  border: "none",
  padding: "10px",
  marginTop:"10px",
  fontFamily: theme.typography.fontFamily,
  borderRadius: "15px",
  outline: "none",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));

const StyledPostModalButton = styled("button")(({ theme }) => ({
  marginLeft:"-20px",
  cursor: "pointer",
}));


export default function Pictures() {
  // Constants
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.pictures.isOpen);
  const authUser = useSelector((state) => state.user?.authorizedUser);
  const pictures = useSelector((state) => state.pictures.pictures);
  const [comments,setComments] = useState([])
  const theme = useTheme();
  // State
  const [showedPicture, setShowedPicture] = useState("");
  // Functions
  console.log(showedPicture)
  function handleClose() {
    dispatch(closePictures());
  }
  function showPrev() {
    if (showedPicture.number !== 0) {
      setShowedPicture({
        ...pictures.allPictures[showedPicture.number - 1],
        number: showedPicture.number - 1,
      });
    } else {
      setShowedPicture({
        ...pictures.allPictures[pictures.allPictures.length - 1],
        number: pictures.allPictures.length - 1,
      });
    }
  }

  function showNext() {
    if (pictures.allPictures.length - 1 !== showedPicture.number) {
      setShowedPicture({
        ...pictures.allPictures[showedPicture.number + 1],
        number: showedPicture.number + 1,
      });
      console.log(showedPicture)
    } else {
      setShowedPicture({
        ...pictures.allPictures[0],
        number: 0,
      });
    }
  }
  const formik = useFormik({
    initialValues: {
      content: "",
      userName: ``,
    },
    onSubmit: async() => {
      const newComment ={

        id: 0,
        authorId: authUser.id,
        content: formik.values.content,
        imageId: showedPicture.id

      }
     await dispatch(addImgComment(newComment))

        const comments = await dispatch(getImageComments(showedPicture.id))
        setComments(comments.payload)
    }
  });
  // useEffect
  useEffect(() => {
    console.log(pictures);
    pictures.allPictures?.forEach((item, index) => {
      if (item[pictures.pathName] === pictures?.selected[pictures.pathName]) {
        setShowedPicture({ ...pictures.selected, number: index });
      }
    });
  }, [pictures]);
  useEffect(() => {
    (async function(){
      const comments = await dispatch(getImageComments(showedPicture.id))
      console.log(comments)
      setComments(comments.payload)
    })(
    )
  }, [showedPicture]);
  return (
      <>
    <StyledPictureSection style={{ display: isOpen && "block" }}>
      <StyledPictureCloseWrap onClick={handleClose}>
        <CloseBtn />
        <SvgFacebook />
      </StyledPictureCloseWrap>

    <StyledPictureWrap>

        {pictures?.allPictures?.length > 1 && (
          <StyledArrowBtn onClick={showPrev}>
            <ArrowBackIosNewIcon />
          </StyledArrowBtn>
        )}

        <StyledPicture src={showedPicture[pictures.pathName]} />

        {pictures?.allPictures?.length > 1 && (
          <StyledArrowBtn onClick={showNext}>
            <ArrowForwardIosIcon />
          </StyledArrowBtn>
        )}
        <Box sx={{width:"30%",backgroundColor:"white",zIndex:"10",[theme.breakpoints.down('md')]: {
          height:"100vh"
          },
          [theme.breakpoints.down('lg')]: {
            height:"100vh"
          },
              [theme.breakpoints.down('xl')]: {
          height:"100vh"
        }
          ,[theme.breakpoints.down('sm')]: {
            width: '100%',
            top:'60%',
            height:'30vh',

            position:'absolute'
          }}} >

          {  comments?.reverse().map((comment,index) => {



            return <>
            {
                index <3 &&
              <Box style={{marginTop: "10px"}}>
                <Comment user={comment.author} content={comment.content} createdDate={comment.createdDate}/>
              </Box>}


            </>

          })

          }
          {
              comments.length > 3 &&
              <Button>View all comments</Button>

          }

          <StyledPostModalCreateCommentArea onSubmit={formik.handleSubmit}>
            <Box style={{display:"flex"}}>

            <StyledPostModalTextArea
                cols="80"
                rows={window.innerHeight < "850" ? "1" : "2"}
                placeholder="Write a comment..."
                onChange={formik.handleChange}
                value={formik.values.content}
                name="content"
                id="content"
            >
            </StyledPostModalTextArea>
            <StyledPostModalButton type="submit" onClick={formik.handleSubmit}>
              <SendIcon sx={{ color: "#65676b", }} />
            </StyledPostModalButton></Box>
          </StyledPostModalCreateCommentArea>
        </Box>
      </StyledPictureWrap>
    </StyledPictureSection>
        </>
  );
}
