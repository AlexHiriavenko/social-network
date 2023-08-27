import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { ProfileContainer } from "../UserProfile/StyledComponents/ContentBlock/StyledComponents";

const StyledNavigationSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.backgroundColor.section,
}));
const StyledNavigationContainer = styled(ProfileContainer)(({ theme }) => ({
    paddingTop: "3px",
    position: "relative",
    borderTop: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
    paddingLeft: "5px",
    paddingRight: "5px",
}));
const StyledNavigation = styled("nav")(({ theme }) => ({
    boxShadow: "0px 16px 27px -19px #8a8a8a",
    zIndex: 10,
    display: "flex",
    fontFamily: "sans-serif",
    backgroundColor: theme.palette.backgroundColor.section,
    "@media (max-width: 300px)": {
        display: "none",
        flexDirection: "column",
        position: "absolute",
        bottom: "-115px",
        left: "10px",
        width: "210px",
        borderRadius: "10px",
        boxShadow: "0px 0px 20px 0px #c5c5c5",
    },
}));
const StyledNavigationItem = styled(Link)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
    color: theme.palette.textColor.secondary,
    fontWeight: 600,
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "20px",
    paddingBottom: "20px",
    transitionDuration: "300ms",
    borderBottom: "1px solid transparent",
    borderRadius: "10px",
    marginBottom: "3px",
    "&:hover": {
        backgroundColor: theme.palette.buttonColor.backgroundHover,
    },
    "@media (max-width: 300px)": {
        paddingTop: "3px",
        paddingBottom: "3px",
    },
    "&[data-active]": {
        color: theme.palette.accentColor.main,
        borderBottom: `3px solid ${theme.palette.accentColor.main}`,
        borderRadius: "0",
        cursor: "auto",
        backgroundColor: "transparent",
        marginBottom: "0",
        "&:hover": {
            backgroundColor: "transparent",
        },
        "@media (max-width: 300px)": {
            borderBottom: "none",
            color: theme.palette.textColor.secondary,
            position: "relative",
            "&::before": {
                content: '""',
                display: "block",
                height: "2px",
                width: "10px",
                backgroundColor: theme.palette.accentColor.main,
                position: "absolute",
                top: "12px",
                right: "14px",
                borderRadius: "1px",
                transform: "rotate(130deg)",
            },
            "&::after": {
                content: '""',
                display: "block",
                height: "2px",
                width: "7px",
                backgroundColor: theme.palette.accentColor.main,
                position: "absolute",
                top: "13px",
                right: "20px",
                borderRadius: "1px",
                transform: "rotate(45deg)",
            },
        },
    },
}));
const StyledNavigationShowMoreButton = styled(Button)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    fontSize: "15px",
    color: theme.palette.textColor.secondary,
    fontWeight: 600,
    textTransform: "inherit",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "20px",
    paddingBottom: "20px",
    transitionDuration: "300ms",
    borderBottom: "1px solid transparent",
    borderRadius: "10px",
    maxWidth: "80px",
    "&:hover": {
        backgroundColor: theme.palette.buttonColor.backgroundHover,
    },
    "@media (max-width: 300px)": {
        display: "flex",
    },
}));


export default function ProfileNavigationForSearch(props) {

    // Constants
    const location = useLocation();
    const navRef = useRef(null);
    // State
    const [listStatus, setListStatus] = useState(false);
    const [locationNameNavigation, setLocationNameNavigation] = useState("notpage");


    let id =props.id

    // Functions
    function toggleList() {
        setListStatus(!listStatus);
    }
    // Find Location for right way
    function whatLocation(locationArray) {

        if (locationArray[1] === `search`) {
            setLocationNameNavigation(`search/${id}`);

        }
        if (locationArray[1] === "friends") {
            setLocationNameNavigation(`friends/${locationArray[2]}`);
        }
    }
    useEffect(() => {
        const locationNameArray = location.pathname.split("/");
        whatLocation(locationNameArray);
        const locationName = "/" + locationNameArray[locationNameArray.length - 1];

        const links = Array.prototype.slice.call(navRef.current.children);
        const newRoute = links.find((link) => {
            if (locationName === "" && link.dataset.loc === "/") return link;
            if (link.dataset.loc === locationName) return link;
        });

        if (!newRoute) return;

        links.find((link) => link.dataset.active).removeAttribute("data-active");
        newRoute.setAttribute("data-active", true);
        setListStatus(false);
    }, [location]);

    return (
        <StyledNavigationSection>
            <StyledNavigationContainer>
                <StyledNavigation
                    ref={navRef}
                    style={listStatus ? { display: "flex", width: "80%" } : null}
                >
                    <StyledNavigationItem
                        to={`/${locationNameNavigation}/`}
                        data-active={true}
                        data-loc="/"
                    >
                        Posts
                    </StyledNavigationItem>



                    <StyledNavigationItem
                        to={`/${locationNameNavigation}/friends`}
                        data-loc="/friends"
                    >
                        Friends
                    </StyledNavigationItem>
                    <StyledNavigationItem
                        to={`/${locationNameNavigation}/photos`}
                        data-loc="/photos"
                    >
                        Photos
                    </StyledNavigationItem>
                </StyledNavigation>
                <StyledNavigationShowMoreButton
                    href="#"
                    onClick={toggleList}
                    id="showMore"
                >
                    More
                    <ArrowDropDownIcon color="dark" />
                </StyledNavigationShowMoreButton>
            </StyledNavigationContainer>
        </StyledNavigationSection>
    );
}

/*<StyledNavigationItem
    to={`/${locationNameNavigation}/about`}
    data-loc="/about"
>
    About
</StyledNavigationItem>*/
