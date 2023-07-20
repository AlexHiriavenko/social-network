import { useEffect, useRef } from "react";
import styles from "./profileAbout.module.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import FriendsList from "../../../components/UserProfile/ProfileFriends/FriendsList";
import { ContentBlock } from "../../../components/UserProfile/StyledComponents/ContentBlock/StyledComponents";

export default function ProfileAbout() {
  const location = useLocation();
  const navRef = useRef(null);
  useEffect(() => {
    const locationName = location.pathname.slice(14);
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
    <section className={styles.profile_about}>
      <div className={styles.profile_about__container}>
        <ContentBlock className={styles.profile_about__block}>
          <nav className={styles.profile_about__nav} ref={navRef}>
            <h2 className={styles.profile_about__title}>About</h2>
            <Link
              to={"/profile/about/"}
              className={styles.profile_about__item}
              data-active={true}
              data-loc={"/"}
            >
              Overview
            </Link>
            <Link
              to={"/profile/about/employment"}
              className={styles.profile_about__item}
              data-loc={"/employment"}
            >
              Work and education
            </Link>
            <Link
              to={"/profile/about/places"}
              className={styles.profile_about__item}
              data-loc={"/places"}
            >
              Places lived
            </Link>
            <Link
              to={"/profile/about/contacts"}
              className={styles.profile_about__item}
              data-loc={"/contacts"}
            >
              Contact and basic info
            </Link>
          </nav>
          <div className={styles.profile_about__content}>
            <Outlet />
          </div>
        </ContentBlock>
        <FriendsList />
      </div>
    </section>
  );
}
