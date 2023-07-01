import { Link } from "react-router-dom";
import styles from "./profilePosts.module.scss";
import { useEffect, useRef, useState } from "react";
const mockFriends = [
  {
    userPhoto:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
    userName: "Garry Potter",
  },
  {
    userPhoto: "https://myhero.com/images/guest/g282317/hero105677/image2.jpg",
    userName: "Hermione Granger",
  },
  {
    userPhoto:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
    userName: "Ron Weasley",
  },
];
export default function ProfilePostsFriends() {
  const photosRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(204);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (photosRef.current) setPhotoHeight(photosRef.current.width);
    });
  }, [photosRef]);
  useEffect(() => {
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }, []);
  return (
    <section className={styles.profile_posts__block}>
      <h2 className={styles.profile_posts__block_title}>Friends</h2>
      <Link
        to={"/profile/friends"}
        className={styles.profile_posts__block_link}
      >
        See all friends
      </Link>
      <p className={styles.profile_posts__block_subtitle}>
        {mockFriends.length} friends
      </p>
      <ul
        className={`${styles.profile_posts__block_list} ${styles.friends_list}`}
      >
        {mockFriends.map((friend, index) => {
          return (
            <li className={styles.profile_posts__friend} key={index}>
              <img
                src={friend.userPhoto}
                alt="foto"
                width={204}
                height={photoHeight}
                className={styles.profile_posts__friend_image}
                ref={photosRef}
              />
              <p className={styles.profile_posts__friend_name}>
                {friend.userName}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
