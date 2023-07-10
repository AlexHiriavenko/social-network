import styles from "./profilePosts.module.scss";
import ProfileIntro from "../../../components/Profile/ProfileIntro";
import ProfilePostsPhotos from "../../../components/Profile/ProfilePosts/PostsPhotos";
import ProfilePostsFriends from "../../../components/Profile/ProfilePosts/PostsFriends";
import { useEffect, useRef, useState } from "react";
import CreatePost from "../../../components/Posts/CreatePost";
import PostList from "../../../components/Posts/Post/PostList";

export default function ProfilePosts() {
  const userInfoRef = useRef(null);
  const [userInfoHeight, setUserInfoHeight] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setUserInfoHeight(userInfoRef.current.getBoundingClientRect().height);
    }, 500);
  }, [userInfoRef.current]);
  return (
    <section className={styles.profile_posts}>
      <div className={styles.profile_posts__container}>
        <section className={styles.user_profile} ref={userInfoRef}>
          <ProfileIntro />
          <ProfilePostsPhotos />
          <ProfilePostsFriends />
        </section>
        <section
          className={styles.publications}
          style={{
            maxHeight: userInfoHeight + "px",
          }}
        >
          <CreatePost />
          <PostList />
        </section>
      </div>
    </section>
  );
}
