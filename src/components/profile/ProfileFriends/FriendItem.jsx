import styles from "./friends.module.scss";

export default function FriendItem({ userPhoto, userName, mutualFriends }) {
  return (
    <li className={styles.friends__friend_item}>
      <img
        src={userPhoto}
        alt="userImage"
        width={80}
        height={80}
        className={styles.friends__friend_image}
      />
      <div className={styles.friends__friend_info}>
        <a href="#" className={styles.friends__friend_name}>{userName}</a>
        <p className={styles.friends__friend_text}>
          {mutualFriends && `${mutualFriends} mutual friends`}
        </p>
      </div>
    </li>
  );
}
