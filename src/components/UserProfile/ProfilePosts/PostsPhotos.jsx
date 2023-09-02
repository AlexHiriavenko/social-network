import { useEffect, useRef, useState } from "react";
import {
  ContentBlock,
  ContentBlockHeader,
  ContentBlockLink,
  ContentBlockList,
  ContentBlockTitel,
} from "../StyledComponents/ContentBlock/StyledComponents";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { setPictures, showPictures } from "../../../redux/pictures.slice/picture.slice";
const mockImg = [
  "https://www.ictputovanja.hr/data/public/slike-za-novosti/Island-kucica.jpg",
  "https://i.pinimg.com/564x/15/f0/e0/15f0e0372d1e04df5f325d00e5899069.jpg",
  "https://i.pinimg.com/564x/3a/9c/41/3a9c41eb3c6d070cb0b5a942788f6c26.jpg",
  "https://i.pinimg.com/564x/75/fb/f3/75fbf3465ac90ad4a7ea4a4d9c7bb1de.jpg",
  "https://i.pinimg.com/564x/76/cf/b5/76cfb53eba85fcf8889bdb97467f156b.jpg",
  "https://i.pinimg.com/564x/db/df/ef/dbdfef585fb2b33ac8d04890a57d212b.jpg",
  "https://i.pinimg.com/564x/4f/f9/19/4ff91923790c8ffe4424eb74f05bfecd.jpg",
  "https://i.pinimg.com/564x/8e/d0/2d/8ed02daed42b64b471af335418476f6f.jpg",
];

const StyledPostPagePhoto = styled("img")({
  objectFit: "cover",
  cursor: "pointer",
  transitionDuration: "500ms",
  "&:hover": {
    transform: "scale(0.98)",
  },
});
export default function ProfilePostsPhotos() {
  const photosRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(213);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("resize", resizePhotoHeigh);
    return function () {
      window.removeEventListener("resize", resizePhotoHeigh);
    };
  }, [photosRef]);

  useEffect(() => {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }, []);

  function resizePhotoHeigh() {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }
  const handleShowPictures = (allPictures, selected) => {
    dispatch(showPictures());
    dispatch(setPictures({ allPictures, selected, pathName: "imageUrl" }));
  };
  return (
    <ContentBlock style={{ maxWidth: "680px" }}>
      <ContentBlockHeader>
        <ContentBlockTitel>Photos</ContentBlockTitel>
        <ContentBlockLink to={"/profile/photos"}>
          See all photos
        </ContentBlockLink>
      </ContentBlockHeader>
      <ContentBlockList>
        {user?.userImages?.map((image, index) => {
          return (
            <StyledPostPagePhoto
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
      </ContentBlockList>
    </ContentBlock>
  );
}
