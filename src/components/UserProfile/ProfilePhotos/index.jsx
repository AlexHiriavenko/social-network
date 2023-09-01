import { useEffect, useRef, useState } from "react";
import {
  ContentBlock,
  ContentBlockTitel,
} from "../StyledComponents/ContentBlock/StyledComponents";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  setAuthorizedUser,
  setUser,
  uploadPhotos,
} from "../../../redux/user.slice/user.slice.js";
import {
  setPictures,
  showPictures,
} from "../../../redux/pictures.slice/picture.slice";

const StyledAddPhotoButton = styled("label")(({ theme }) => ({
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

export default function Photos() {
  const photosRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(213);
  const [isAuthorized, setAuthorized] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [multipartFiles, setMultipartFiles] = useState(null);
  const dispatch = useDispatch();
  console.log(user);
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

   setMultipartFiles(formData);
    console.log(formData.get("multipartFile"))
   await dispatch(uploadPhotos({multipartFiles: formData, id:id}))
   const editUser =  dispatch(getProfile())
   editUser.then(result =>{
     console.log(result.payload)
     if(result.payload) {
       localStorage.setItem("authorizedUser", JSON.stringify({...result.payload, isAuthorized: true}))
       localStorage.setItem("user", JSON.stringify({...result.payload, isAuthorized: true}))
       dispatch(setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser"))))
       dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
     }
   })
  }
  const handleShowPictures = (allPictures, selected) => {
    dispatch(showPictures());
    dispatch(setPictures({ allPictures, selected, pathName: "imageUrl" }));
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
      <StyledPhotosList>
        {user.userImages?.map((image, index) => {
          return (
            <StyledPhotosImage
              src={image.imageUrl}
              alt="foto"
              width={213}
              height={photoHeight}
              ref={photosRef}
              key={index}
              onClick={() => handleShowPictures(user.userImages, image)}
            />
          );
        })}
      </StyledPhotosList>
    </ContentBlock>
  );
}
