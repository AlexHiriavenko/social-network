import React, { useEffect, useRef, useState } from "react";
import {
  ContentBlock,
  ContentBlockTitel,
} from "../StyledComponents/ContentBlock/StyledComponents";
import styled from "@emotion/styled";
import {Box, Button, Modal} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserImage,
  getUserImages,
  uploadPhotos,
} from "../../../redux/user.slice/user.slice.js";
import {
  setPictures,
  showPictures,
} from "../../../redux/pictures.slice/picture.slice";
import {editUser} from "../../../editUser.js";
import EditPhotoSvg from "../../SVG/EditPhotoSvg.jsx";
import {
  StyledModalBlock,
  StyledModalCloseButton,
  StyledModalCloseButtonLine, StyledModalSeparator,
  StyledModalTitle
} from "../../Modals/StyledModalComponents.js";



export const StyledAddPhotoButton = styled("label")(({ theme }) => ({
  fontSize: "15px",
  color: "#1877f2",
  fontWeight: 600,
  borderRadius: "10px",
  transitionDuration: "300ms",
  paddingLeft: "12px",
  paddingRight: "12px",
  marginTop: "20px",
  marginRight: "16px",
  lineHeight: "36px",
  fontFamily: "sans-serif",
  "&:hover": {
    backgroundColor: theme.palette.accentColor.secondary,
  },
}));
const StyledEditPhotoButton = styled("label")(({ theme }) => ({
  fontSize: "15px",
  color: "#1877f2",
  borderRadius: "5px",
  marginBottom: "-25px",
  width:"50px",
  height:"20px",
  paddingRight:"10px",
  lineHeight: "16px",
  fontFamily: "sans-serif",
  cursor:"pointer",
  zIndex:"10"

}));
const StyledPhotosList = styled(Box)({
  display: "grid",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingBottom: "20px",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "5px",
  width: "100%",
  marginTop: "15px",
  "@media (max-width: 910px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  "@media (max-width: 750px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@media (max-width: 560px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (max-width: 390px)": {
    gridTemplateColumns: "1fr",
  },
});
const StyledPhotosImage = styled("img")({
  borderRadius: "10px",
  width: "100%",
  objectFit: "cover",
  transitionDuration: "300ms",

  "&:hover": {
    transform: "scale(0.99)",

  },
});

const DeletePhotosButton = styled(Button)({

  width: "50%",
  fontSize:"10px",
  display:"block",
  border:"0.7px solid grey",
  marginLeft:"-30px",
  marginBottom:"-30px",
  zIndex:"10",
  backgroundColor:"white",
  opacity:0.5,
  color:"black",
  "&:hover": {
    backgroundColor:"white",
  },
});
const StyledEditProfileModal = styled(StyledModalBlock)({
  maxWidth: "710px",


});
const StyledEditedPart = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  padding: "20px 16px 20px 16px",
});
const StyledEditedPartTitle = styled("h2")(({ theme }) => ({
  color: theme.palette.textColor.main,
  fontSize: "20px",
  fontWeight: 400,
}));

export default function Photos() {
  const photosRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(213);
  const [isAuthorized, setAuthorized] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [images,setImages] = useState([])
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false)
  const [modalOpen,setModalOpen] = useState(false)
  const [imgIndex,setIndex] = useState(0)
  const [imgId,setId] = useState(0)
  const toggleOpenMenu = (index) =>{
    open && index === imgIndex
        ? setOpen(false)
        : setOpen(true);}

  const editProfileModalIsOpen = useSelector(
      (state) => state.modal.editProfile.isOpen
  );
  //useEffect(() => {

  // window.addEventListener("resize", () => {
  //    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  //  });
  // }, [photosRef.current]);
  // useEffect(() => {
  //    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  // }, [photosRef.current]);
  useEffect(() => {
    setAuthorized(user.isAuthorized);
    (async ()=>{
      const images =await dispatch(getUserImages(user.id));
      console.log(images.payload)
      setImages(images.payload)
    })()
  }, [user]);
  async function showChoosingPicture() {

    let filesList = photosRef?.current.files;
    const files = [];
    for (let i = 0; i < filesList?.length; i++) {
      files.push(filesList[i]);
    }
    let id = JSON.parse(localStorage.getItem('authorizedUser')).id
    const formData = new FormData();

    files.forEach(el => {
      formData.append(`multipartFiles`, el);
    })

    await dispatch(uploadPhotos({multipartFiles: formData, id:id}))

    const images =await dispatch(getUserImages(user.id));

    setImages(images.payload)
    editUser(dispatch);

  }
  const handleShowPictures = (allPictures, selected) => {
    dispatch(showPictures());
    dispatch(setPictures({ allPictures, selected, pathName: "imgUrl" }));
  };
  return (
      <ContentBlock>
        <ContentBlockTitel>Photos</ContentBlockTitel>
        {isAuthorized && (
            <StyledAddPhotoButton>
              <input type="file"
                     style={{ display: "none" }}
                     ref={photosRef}
                     onChange={showChoosingPicture}
                     multiple
              />
              Add new photo
            </StyledAddPhotoButton>
        )}
        <StyledPhotosList  >
          {images?.map((image, index) => {
            return (
                <>


                  <Box    key={index}     style={{ width:"213px",height:"250px" }}>
                    {isAuthorized && (

                        <>
                          <Box    key={index}  style={{display:"flex",flexDirection:"raw",width:"213px"
                          }}>

                            <StyledEditPhotoButton
                                key={index}
                                onClick={()=>{
                                  toggleOpenMenu(index)
                                  setIndex(index)

                                }}>
                              <EditPhotoSvg/>

                            </StyledEditPhotoButton>
                            { open && index === imgIndex  &&
                                (
                                    <DeletePhotosButton
                                        onClick={()=>{
                                          setModalOpen(true)
                                          setId(image.id)

                                        }}
                                    >Delete photo</DeletePhotosButton>

                                )
                            }
                          </Box>
                          <Modal
                              open={modalOpen}
                              onClose={() => {
                                setModalOpen(false);
                              }}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              sx={{ paddingLeft: "5px", paddingRight: "5px",backgroundColor:"white",opacity:"0.65" }}
                          >
                            <StyledEditProfileModal>
                              <StyledModalCloseButton
                                  onClick={() => {
                                    setModalOpen(false);
                                  }}
                              >
                                <StyledModalCloseButtonLine></StyledModalCloseButtonLine>
                              </StyledModalCloseButton>
                              <StyledModalTitle>Delete image</StyledModalTitle>
                              <StyledModalSeparator></StyledModalSeparator>

                              <StyledEditedPart>
                                <StyledEditedPartTitle>
                                  Are you sure You want to delete this image?
                                </StyledEditedPartTitle>
                                <Button
                                    onClick={async()=>{
                                     await dispatch(deleteUserImage(imgId))
                                      editUser(dispatch)
                                      setModalOpen(false)

                                    }}
                                >Yes</Button>
                              </StyledEditedPart>
                            </StyledEditProfileModal>
                          </Modal>
                        </>

                    )}
                    <Box style={{width:"213px"}}>

                      <StyledPhotosImage
                          src={image.imgUrl}
                          alt="foto"
                          width={213}
                          height={photoHeight}

                          key={index}
                          onClick={() => handleShowPictures(images, image)}
                      />

                    </Box>
                  </Box>
                </>

            );
          })}
        </StyledPhotosList>
      </ContentBlock>
  );
}
