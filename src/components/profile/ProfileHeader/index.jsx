import { Avatar, AvatarGroup } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import styles from "./profile-header.module.scss";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const user = {
  full_name: "Julian Read",
  profile_picture:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
  profile_background_picture:
    "https://image.geo.de/30145342/t/Cs/v4/w1440/r0/-/nationalpark-saechsische-schweiz-mauritius-reya43-jpg--82748-.jpg",
};

export default function ProfileHeader() {
  return (
    <section className={styles.profile__header}>
      <div className={styles.profile__container}>
        <section className={styles.profile__background}>
          <img
            src={user.profile_background_picture}
            alt="profile_background_picture"
            className={styles.profile__background_picture}
          />
          <div className={styles.profileBgBtnWrap}>
            {/* <button className={styles.profile__bg_btn}>
              <PermMediaIcon fontSize="small" />
              <p className={styles.profile__btnText}>
                Создать фото обложки с аватаром
              </p>
            </button> */}
            <button className={styles.profile__bg_btn}>
              <CameraAltIcon fontSize="small" />
              <p className={styles.profile__btnText}>
                Редактировать фото обложки
              </p>
            </button>
          </div>
        </section>
        <section className={styles.profile__user__info}>
          <div className={styles.profile__picture}>
            <img
              src={user.profile_picture}
              alt="profile_picture"
              width={168}
              height={168}
              className={styles.profile__user_image}
            />
            <button className={styles.profile__change_user_picture}>
              <CameraAltIcon color="dark" />
            </button>
          </div>
          <div className={styles.profile__user_info}>
            <p className={styles.profile__user_name}>{user.full_name}</p>
            <a href="#" className={styles.profile__user_friends}>
              Друзья: {54}
            </a>
            <AvatarGroup max={6} className={styles.profile_avatar_group}>
              <Avatar alt="Remy Sharp" src="#" />
              <Avatar alt="Travis Howard" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Trevor Henderson" src="#" />
            </AvatarGroup>
          </div>
          <div className={styles.profile_buttons}>
            <button
              className={`${styles.profile__edit_btn} ${styles.profile__bg_btn}`}
            >
              <ModeEditOutlineIcon sx={{ color: "#050505" }} />
              Редактировать профиль
            </button>
            <button className={`${styles.profile__show_btn} ${styles.profile__show_btn_active} `}>
              <span className={styles.profile__show_line}></span>
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
