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
  getUserImages,
  setAuthorizedUser,
  setUser,
  uploadPhotos,
} from "../../../redux/user.slice/user.slice.js";
import {
  setPictures,
  showPictures,
} from "../../../redux/pictures.slice/picture.slice";
import {editUser} from "../../../editUser.js";

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
  const [images,setImages] = useState([])
  const dispatch = useDispatch();

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
      <StyledPhotosList>
        {images?.map((image, index) => {
          return (
            <StyledPhotosImage
              src={image.imgUrl}
              alt="foto"
              width={213}
              height={photoHeight}

              key={index}
              onClick={() => handleShowPictures(images, image)}
            />
          );
        })}
      </StyledPhotosList>
    </ContentBlock>
  );
}
