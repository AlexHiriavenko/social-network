import { useEffect, useRef, useState } from "react";
import styles from "./profile-navigation.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { ProfileContainer } from "../StyledComponents/ContentBlock/StyledComponents";

const StyledNavigationSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.section,
}));
const StyledNavigationContainer = styled(ProfileContainer)(({ theme }) => ({
  paddingTop: "3px",
  position: "relative",
  borderTop: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
}));

export default function ProfileNavigation() {
  const [listStatus, setListStatus] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  function toggleList() {
    setListStatus(!listStatus);
  }

  useEffect(() => {
    const locationName = location.pathname.slice(8);
    const links = Array.prototype.slice.call(navRef.current.children);
    const newRoute = links.find((link) => {
      if (locationName === "" && link.dataset.loc === "/") return link;
      if (link.dataset.loc === locationName) return link;
    });
    if (!newRoute) return;
    links.find((link) => link.dataset.active).removeAttribute("data-active");
    newRoute.setAttribute("data-active", true);
  }, [location]);

  return (
    <StyledNavigationSection>
      <StyledNavigationContainer>
        <nav
          ref={navRef}
          className={`${styles.profile__nav} ${
            listStatus ? styles.profile__nav_open : ""
          }`}
        >
          <Link
            to={"/profile/"}
            data-active={true}
            className={styles.profile__nav_item}
            data-loc="/"
          >
            Posts
          </Link>
          <Link
            to={"/profile/about"}
            className={styles.profile__nav_item}
            data-loc="/about"
          >
            About
          </Link>
          <Link
            to={"/profile/friends"}
            className={styles.profile__nav_item}
            data-loc="/friends"
          >
            Friends
          </Link>
          <Link
            to={"/profile/photos"}
            className={styles.profile__nav_item}
            data-loc="/photos"
          >
            Photos
          </Link>
        </nav>
        <button
          href="#"
          className={styles.profile__more_btn}
          onClick={toggleList}
          id="showMore"
        >
          More
          <ArrowDropDownIcon color="dark" />
        </button>
      </StyledNavigationContainer>
    </StyledNavigationSection>
  );
}
