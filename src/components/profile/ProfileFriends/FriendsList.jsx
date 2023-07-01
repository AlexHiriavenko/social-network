import { useRef, useState } from "react";
import styles from "./friends.module.scss";
import { useEffect } from "react";
import FriendItem from "./FriendItem";
import SearchIcon from "@mui/icons-material/Search";
const mockInfo = [
  {
    userPhoto:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
    userName: "Garry Potter",
    mutualFriends: 3,
  },
  {
    userPhoto: "https://myhero.com/images/guest/g282317/hero105677/image2.jpg",
    userName: "Hermione Granger",
    mutualFriends: 2,
  },
  {
    userPhoto:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
    userName: "Ron Weasley",
  },
];

export default function FriendsList() {
  const [filtredFriends, setFiltredFriends] = useState(null);
  const searchRef = useRef(null);

  // Functions
  function filterFriends() {
    const newFriends = [];
    mockInfo.forEach((friend) => {
      const check = friend.userName
        .toLowerCase()
        .split(searchRef.current.value.toLowerCase());
      if (check.length > 1) {
        newFriends.push(friend);
      }
    });
    // if (newFriends.length === 0) {
    //   setFiltredFriends(false);
    // } else {
    setFiltredFriends(newFriends);
    // }
  }
  useEffect(() => {
    if (mockInfo) {
      setFiltredFriends(mockInfo);
    }
  }, []);
  // console.log(searchRef.current.value);
  return (
    <div className={styles.friends__block}>
      <h2 className={styles.friends__title}>Friends</h2>
      <div className={styles.friends__search}>
        <SearchIcon sx={{ color: "#767676" }} />
        <input
          type="text"
          placeholder="Search"
          className={styles.friends__search_input}
          onChange={(e) => filterFriends(e)}
          ref={searchRef}
        />
      </div>
      {filtredFriends &&
        (filtredFriends.length > 0 ? (
          <ul className={styles.friends__friends_list}>
            {filtredFriends.map((friend, index) => (
              <FriendItem {...friend} key={index} />
            ))}
          </ul>
        ) : (
          <p className={styles.friends__friends_list_no_results}>
            No results for: {searchRef.current && searchRef.current.value}
          </p>
        ))}
    </div>
  );
}
