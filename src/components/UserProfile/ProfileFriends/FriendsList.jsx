import { useRef, useState } from "react";
import { useEffect } from "react";
import FriendItem from "./FriendItem";
import SearchIcon from "@mui/icons-material/Search";
import {
  ContentBlock,
  ContentBlockHeader,
  ContentBlockTitel,
} from "../StyledComponents/ContentBlock/StyledComponents";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

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

const StyledFriendsSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "36px",
  backgroundColor: theme.palette.buttonColor.background,
  paddingLeft: "10px",
  borderRadius: "50px",
  marginRight: "16px",
  marginTop: "20px",
}));
const StyledFriendsSearchInput = styled("input")(({ theme }) => ({
  border: "none",
  backgroundColor: "transparent",
  height: "100%",
  fontFamily: "sans-serif",
  color: theme.palette.textColor.main,
  "&:focus": {
    outline: "none",
  },
}));
const StyledFriendsList = styled(Box)({
  marginTop: "20px",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "5px",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingBottom: "20px",
  "@media (max-width: 680px)": {
    gridTemplateColumns: "1fr",
  },
});

const StyledFriendsNoResult = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  width: "100%",
  paddingTop: "16px",
  paddingBottom: "36px",
  fontSize: "20px",
  color: theme.palette.textColor.secondary,
  fontWeight: 700,
}));

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
    setFiltredFriends(newFriends);
  }
  useEffect(() => {
    if (mockInfo) {
      setFiltredFriends(mockInfo);
    }
  }, []);

  return (
    <ContentBlock>
      <ContentBlockHeader>
        <ContentBlockTitel>Friends</ContentBlockTitel>
        <StyledFriendsSearch>
          <SearchIcon sx={{ color: "#767676" }} />
          <StyledFriendsSearchInput
            type="text"
            placeholder="Search"
            onChange={(e) => filterFriends(e)}
            ref={searchRef}
          />
        </StyledFriendsSearch>
      </ContentBlockHeader>

      {filtredFriends &&
        (filtredFriends.length > 0 ? (
          <StyledFriendsList>
            {filtredFriends.map((friend, index) => (
              <FriendItem {...friend} key={index} />
            ))}
          </StyledFriendsList>
        ) : (
          <StyledFriendsNoResult>
            No results for: {searchRef.current && searchRef.current.value}
          </StyledFriendsNoResult>
        ))}
    </ContentBlock>
  );
}
