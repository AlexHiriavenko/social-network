import FriendsList from "../../../components/UserProfile/ProfileFriends/FriendsList";
import styles from "./profileFriends.module.scss";

export default function ProfileFriends() {
  return (
    <section className={styles.profile_friends}>
      <div className={styles.profile_friends__container}>
        <FriendsList />
      </div>
    </section>
  );
}
