import { useState, useEffect } from "react";
import { Drawer, List, Divider, Box, ListItem, Button, Typography, Avatar } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function ListRecentSearches(props) {
    const onClick = props.onClick;

    const mockInfo = [
        {
            userPhoto:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SX9B49bv1yhPTT3zTSerDv4-jDoT2SN975WZ_dEEGqHaI9U09woZkiJej2vxeqUypeY&usqp=CAU",
            userName: "Garry Potter",
            mutualFriends: 3,
            userID: 13241,
        },
        {
            userPhoto: "https://myhero.com/images/guest/g282317/hero105677/image2.jpg",
            userName: "Hermione Granger",
            mutualFriends: 2,
            userID: 13242,
        },
        {
            userPhoto:
                "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
            userName: "Ron Weasley",
            userID: 13243,
        },
    ];

    const [recentUsersList, setRecentUsersList] = useState(mockInfo);

    const handleRemoveUser = (event) => {
        const target = event.target.closest(".search__user-remove");
        if (target) {
            const id = parseInt(target.id);
            setRecentUsersList((prevList) => prevList.filter((user) => user.userID !== id));
        }
    };

    return (
        <List>
            {!recentUsersList.length && (
                <Typography sx={{ p: 2 }}>No search history yet</Typography>
            )}
            {recentUsersList.map((friend) => (
                <ListItem key={friend.userID} sx={{ gap: 1 }} className="search__list-item">
                    <Link
                        to={`./user-page/${friend.userID}`}
                        onClick={onClick}
                        className="search__user-link"
                    >
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={friend.userPhoto}
                        ></Avatar>
                        <Typography className="search__user-name">{friend.userName}</Typography>
                    </Link>
                    <CloseIcon
                        id={friend.userID}
                        onClick={handleRemoveUser}
                        className="search__user-remove"
                    ></CloseIcon>
                </ListItem>
            ))}
        </List>
    );
}

export default ListRecentSearches;
