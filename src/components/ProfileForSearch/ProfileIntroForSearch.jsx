import { useNavigate } from "react-router-dom";
import ProfilePageButton from "../UserProfile/ProfilePageButton/ProfilePageButton.jsx";
import IntroBio from "../UserProfile/ProfileIntro/IntroBio.jsx";
import { Box, Typography } from "@mui/material";
import {
    ContentBlock,
    ContentBlockTitel,
} from "../UserProfile/StyledComponents/ContentBlock/StyledComponents.js";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUser} from "../../redux/user.slice/user.slice.js";
const mockIntor = {
    city: "Dnipro",
    bio: "some bio",
};

const StyledIntroContentBlock = styled(ContentBlock)(({ theme }) => ({
    maxWidth: "680px",
    flexDirection: "column",
}));
const StyledIntroContentWrapper = styled(Box)({
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "20px",
});
const StyledIntroText = styled(Typography)(({ theme }) => ({
    color: theme.palette.textColor.main,
    textAlign: "center",
    marginRight: "50%",
    transform: "translateX(50%)",
    marginBottom: "10px",
}));
export default function ProfileIntroForSearch(props) {
    // Constants
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let id =props.id
    // States

    const [user, setUser] = useState(null);

    // Functions
    useEffect(()=>{

        const userPromise = dispatch(getUser(id))
        userPromise.then(result =>{
            setUser( result.payload)
            console.log(user)
        })

    },[])
    // UseEffect

    return (
        <StyledIntroContentBlock>
            <ContentBlockTitel>Intro</ContentBlockTitel>
            <StyledIntroContentWrapper>

                    <>
                        <StyledIntroText>{user?.about}</StyledIntroText>

                    </>


            </StyledIntroContentWrapper>
        </StyledIntroContentBlock>
    );
}
