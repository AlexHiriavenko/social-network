import styles from "./post.module.scss";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import { useEffect, useRef, useState } from "react";

export default function Post(props) {
  const { author, authorImage, likes, comments, reposts, content, images } =
    props;
  const photosRef = useRef(null);
  const [photoHeight, setPhotoHeight] = useState(195);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (photosRef.current) setPhotoHeight(photosRef.current.width);
    });
  }, [photosRef]);
  useEffect(() => {
    console.log(photosRef.current.width);
    if (photosRef.current) setPhotoHeight(photosRef.current.width);
  }, []);
  return (
    <li className={styles.post}>
      <div className={styles.post__author}>
        <img
          src={authorImage}
          alt="Author image"
          width={40}
          height={40}
          className={styles.post__author_image}
        />
        <p className={styles.post__author_name}>{author}</p>
      </div>

      <p className={styles.post__content}>{content}</p>

      <div className={styles.post__images}>
        {images && (
          <img
            src={images[0]}
            alt="post image"
            className={`${styles.post__image} ${styles.post__image_first}`}
          />
        )}
        <ul className={styles.post__images_extra}>
          {images.map((imgUrl, index) => {
            if (index === 0) return;
            if (index > 3) return;
            if (index === 3) {
              return (
                <li className={styles.post__image_item} key={index}>
                  <span className={styles.post__last_show_image}>
                    +{images.length - 3}
                  </span>
                  <img
                    src={imgUrl}
                    alt="post image"
                    className={styles.post__image}
                    ref={photosRef}
                    width={195}
                    height={photoHeight}
                  />
                </li>
              );
            } else {
              return (
                <li className={styles.post__image_item} key={index}>
                  <img
                    src={imgUrl}
                    alt="post image"
                    className={styles.post__image}
                    ref={photosRef}
                    width={195}
                    height={photoHeight}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className={styles.post__reach}>
        <a href="#" className={styles.post__reach_item}>
          {likes ? `${likes} likes` : null}
        </a>
        <a href="#" className={styles.post__reach_item}>
          {comments.length ? `${comments.length} comments` : null}
        </a>
        <a href="#" className={styles.post__reach_item}>
          {reposts ? `${reposts} shares` : null}
        </a>
      </div>
      <div className={styles.post__buttons}>
        <button className={styles.post__btn}>
          <ThumbUpOffAltIcon sx={{ color: "#65676b" }} /> Like
        </button>
        <button className={styles.post__btn}>
          <ChatBubbleOutlineIcon sx={{ color: "#65676b" }} /> Comment
        </button>
        <button className={styles.post__btn}>
          <ReplyIcon sx={{ color: "#65676b" }} /> Share
        </button>
      </div>
    </li>
  );
}
