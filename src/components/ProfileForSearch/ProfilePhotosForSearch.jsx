import { useEffect, useRef, useState } from "react";
import { useParams} from "react-router-dom";
import {
    ContentBlock,
    ContentBlockTitel, ProfileContainer,
} from "../UserProfile/StyledComponents/ContentBlock/StyledComponents"
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import {getUser} from "../../redux/user.slice/user.slice.js";
import {useDispatch} from "react-redux";
import Photos from "../UserProfile/ProfilePhotos/index.jsx";




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
const StyledPhotosPage = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.backgroundColor.page,
    paddingTop: "20px",
    paddingBottom: "20px",
}));
export default  function ProfilePhotosForSearch (){
    const photosRef = useRef(null);
    const [photoHeight, setPhotoHeight] = useState(213);
    const dispatch = useDispatch();
    const [user,setUser] = useState(null)

    let {id} = useParams()




    console.log(user)
    useEffect(()=>{


        (async()=>{

            const user =  await dispatch(getUser(id))
            console.log(user.payload)
            setUser(user.payload)

        })()


    },[id])


    return (
        <> <StyledPhotosPage>
            <ProfileContainer>

                <ContentBlock>
                    <ContentBlockTitel>Photos</ContentBlockTitel>

                    <StyledPhotosList>
                        {user?.userImages?.map((image, index) => {
                            return (
                                <StyledPhotosImage
                                    src={image.imageUrl}
                                    alt="foto"
                                    width={213}
                                    height={photoHeight}
                                    ref={photosRef}
                                    key={index}
                                />
                            );
                        })}
                    </StyledPhotosList>
                </ContentBlock>


            </ProfileContainer>
        </StyledPhotosPage>

        </>
    );
}