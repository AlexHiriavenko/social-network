import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useParams} from "react-router-dom";
import FriendsList from "../UserProfile/ProfileFriends/FriendsList.jsx";
import {
    ContentBlock,
    ContentBlockTitel,
    ProfileContainer,
} from "../UserProfile/StyledComponents/ContentBlock/StyledComponents.js";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const StyledAboutSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.backgroundColor.page,
    paddingTop: "20px",
    paddingBottom: "20px",
}));
const StyledAboutContainer = styled(ProfileContainer)({
    paddingRight: "16px",
    paddingLeft: "16px",
    display: "flex",
    flexDirection: "column",
    rowGap: "16px",
});
const StyledAboutNavigation = styled("nav")(({ theme }) => ({
    flex: 1,
    paddingRight: "6px",
    paddingLeft: "6px",
    paddingBottom: "16px",
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
    borderRight: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
}));
const StyledAboutNavigationItem = styled(Link)(({ theme }) => ({
    color: theme.palette.textColor.secondary,
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: "sans-serif",
    padding: "12px 10px",
    borderRadius: "10px",
    transitionDuration: "300ms",
    "&:hover": {
        backgroundColor: theme.palette.buttonColor.backgroundHover,
    },
    "&[data-active]": {
        color: theme.palette.accentColor.main,
        backgroundColor: theme.palette.accentColor.secondary,
        cursor: "auto",
    },
}));
const StyledAboutContent = styled(Box)({
    flex: 2,
    display: "flex",
    flexDirection: "column",
    rowGap: "24px",
    padding: "20px 32px 20px 16px",
});
export default function SearchProfileAbout() {
    // Constants
    const location = useLocation();
    const navRef = useRef(null);
    let id =1
    // State
    const [locationNameNavigation, setLocationNameNavigation] = useState("");
    // Functions

    function whatLocation(locationArray) {
        if (locationArray[1] === "search") {
            setLocationNameNavigation(`search/${id}`);
        }
        if (locationArray[1] === "friends") {
            setLocationNameNavigation(`friends/${locationArray[2]}`);
        }
    }
    // UseEffect
    useEffect(() => {
        const locationNameArray = location.pathname.split("/");
        whatLocation(locationNameArray);
        const locationName = "/" + locationNameArray[locationNameArray.length - 1];

        const links = Array.prototype.slice.call(navRef.current.children);
        const newRoute = links.find((link) => {
            if (locationName === "" && link.dataset.loc === "/") return link;
            if (link.dataset.loc === locationName) return link;
        });
       // if (!newRoute) return;
        links.find((link) => link.dataset.active).removeAttribute("data-active");
        newRoute.setAttribute("data-active", true);
    }, [location]);

    return (
        <StyledAboutSection>
            <StyledAboutContainer>
                <ContentBlock>
                    <StyledAboutNavigation ref={navRef}>
                        <ContentBlockTitel>About</ContentBlockTitel>
                        <StyledAboutNavigationItem
                            to={`/${locationNameNavigation}/about/`}
                            data-active={true}
                            data-loc={"/"}
                        >
                            Overview
                        </StyledAboutNavigationItem>
                        <StyledAboutNavigationItem
                            to={`/${locationNameNavigation}/about/employment`}
                            data-loc={"/employment"}
                        >
                            Work and education
                        </StyledAboutNavigationItem>
                        <StyledAboutNavigationItem
                            to={`/${locationNameNavigation}/about/places`}
                            data-loc={"/places"}
                        >
                            Places lived
                        </StyledAboutNavigationItem>
                        <StyledAboutNavigationItem
                            to={`/${locationNameNavigation}/about/contacts`}
                            data-loc={"/contacts"}
                        >
                            Contact and basic info
                        </StyledAboutNavigationItem>
                    </StyledAboutNavigation>
                    <StyledAboutContent>
                        <Outlet />
                    </StyledAboutContent>
                </ContentBlock>
                <FriendsList />
            </StyledAboutContainer>
        </StyledAboutSection>
    );
}
