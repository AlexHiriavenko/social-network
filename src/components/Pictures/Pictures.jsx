import styled from "@emotion/styled";
import CloseBtn from "../SVG/CloseBtn";
import SvgFacebook from "../SVG/FaceBook";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { closePictures } from "../../redux/pictures.slice/picture.slice";
import { useEffect, useState } from "react";
import {Box, Button, Typography} from '@mui/material'
import Comment from "../Comment/index.jsx";
import SendIcon from "@mui/icons-material/Send.js";
import {useFormik} from "formik";
import {addImgComment, getImageComments, getUser} from "../../redux/user.slice/user.slice.js";
import {useTheme} from "@emotion/react";
import {BlockUserImage} from "../UserProfile/StyledComponents/ContentBlock/StyledComponents.js";

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
const StyledPictureWrap = styled("div")(({ theme })=>({

  display: "flex",
  columnGap: "20px",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));
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
const StyledPicture = styled("img")(({ theme })=>({
  maxWidth: "70%",
  maxHeight: "100vh",
  minWidth: "50%",
  objectFit: "cover",
}));
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
const StyledCommentSection = styled(Box)(({ theme }) => ({
  width:"30%",
  backgroundColor:` ${theme.palette.backgroundColor.section}`,
  zIndex:"10"
}));

const StyledPostModalButton = styled("button")(({ theme }) => ({
  marginLeft:"-23px",
  cursor: "pointer",
}));
const StyledCommentWrraper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
  marginTop:"10px",
  marginLeft:"10px"
}));

const StyledCommentContent = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.input.mainBackground,
  padding: "8px 12px",
  borderRadius: "18px",
}));


const StyledCommentName = styled(Typography)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  color: theme.palette.textColor.main,
  fontWeight: 600,
  fontFamily: "sans-serif",
}));


export default function Pictures() {
  // Constants
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.pictures.isOpen);
  const authUser = useSelector((state) => state.user?.authorizedUser);
  const pictures = useSelector((state) => state.pictures.pictures);
  const [comments,setComments] = useState([])
  const[openComments,setOpenComments]=useState(false)
  const [owner,setOwner] = useState(null)
  const [title,setTitle] = useState('View all comments')
  const showComments = useSelector((state) => state.pictures.showComments);
  const theme = useTheme();
  // State
  const [showedPicture, setShowedPicture] = useState("");
  // Functions

  const showAllComments = () =>{
    setOpenComments(true)
    setTitle('Hide comments')
  }
  const hideComments = () =>{
    setOpenComments(false)
    setTitle('View all comments')
  }
  const toggleComments = () =>{
    openComments
        ? hideComments()
        : showAllComments();}
  function handleClose() {
    dispatch(closePictures());
  }
  function showPrev() {
    setComments([])
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
    setComments([])
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

      formik.setFieldValue("content", "");
    }
  });
  // useEffect
  useEffect(() => {

    pictures.allPictures?.forEach((item, index) => {
      if (item[pictures.pathName] === pictures?.selected[pictures.pathName]) {
        setShowedPicture({ ...pictures.selected, number: index });
      }
    });
  }, [pictures]);
  useEffect(() => {
    if(authUser ) {
      (async function () {

        const comments = await dispatch(getImageComments(showedPicture.id))
        setComments(comments.payload)
        if (showedPicture?.userId != authUser?.id) {
          const user = await dispatch(getUser(showedPicture.userId))
          setOwner(user.payload)
        } else {
          setOwner(authUser)
        }
      })()
    }
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

        <StyledPicture  src={showedPicture[pictures.pathName]} />

        {pictures?.allPictures?.length > 1 && (
          <StyledArrowBtn onClick={showNext}>
            <ArrowForwardIosIcon />
          </StyledArrowBtn>
        )}
      { showComments &&
        <StyledCommentSection sx={{[theme.breakpoints.down('md')]: {
          height:"100vh"
          },
          [theme.breakpoints.down('lg')]: {
            height:"100vh"
          },
              [theme.breakpoints.down('xl')]: {
          height:"100vh"
        },[theme.breakpoints.down('md')]: {
          width: '100%',
          top:'61%',
          height:'39vh',
          position:'absolute'
        }
          ,[theme.breakpoints.down('sm')]: {
            width: '100%',
            top:'61%',
            height:'39vh',
            position:'absolute'
          }}} >

          <StyledCommentWrraper>
            <BlockUserImage src={
                owner?.profilePicture ||
                "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
            }
                            alt=""
                            width={40}
                            height={40} />
            <StyledCommentContent>
              <StyledCommentName>
                {owner?.fullName}

              </StyledCommentName>

            </StyledCommentContent>

          </StyledCommentWrraper>

          <Box style={{width:"100%",height:"0.7px",backgroundColor:"grey",marginTop:"10px"}}></Box>
         <Box style={{marginLeft:"10px"}}>
          {  comments?.reverse().map((comment,index) => {

            return <>
            {
                index <3 &&
              <Box key={index} style={{marginTop: "10px"}}>
                <Comment key={index} user={comment.author} content={comment.content} createdDate={comment.createdDate}/>
              </Box>}
            </>

          })

          }
  {
    comments?.reverse().map((comment,index) => {

    return <>
      {
        openComments &&  index >=3 &&
          <Box key={index} style={{marginTop: "10px"}}>
            <Comment key={index} user={comment.author} content={comment.content} createdDate={comment.createdDate}/>
          </Box>}
    </>

  })

  }
  {
    comments?.length > 3 &&
    <Button onClick={toggleComments}>{title}</Button>

}
        </Box >

          <StyledPostModalCreateCommentArea onSubmit={formik.handleSubmit}>
            <Box style={{display:"flex",margin:"7px"}}>

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
        </StyledCommentSection>
      }
      </StyledPictureWrap>
    </StyledPictureSection>
        </>
  );
}
