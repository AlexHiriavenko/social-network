import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
    createChat,
    deleteTemporaryParticipant,
    setCurrentChatCompanion,
    openChat,
    getChats,
} from "../../../../../redux/chat.slice/chat.slice";

function GlobalUsersList(props) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { setNewMessageModal } = props;

    function createNewChat(id, fullName, profilePicture) {
        const currentChatCompanion = {
            userId: id,
            fullName: fullName,
            profilePicture: profilePicture,
        };
        dispatch(deleteTemporaryParticipant());
        setNewMessageModal(false);
        // dispatch(setCurrentChatCompanion(currentChatCompanion));
        // dispatch(createChat(id)).then(({ payload }) => console.log(payload[0].id));

        // dispatch(openChat());
        // dispatch(getChats());
        alert("В стадии разработки");
    }

    return (
        <List sx={{ minHeight: "340px" }}>
            {props.users?.map((user) => (
                <ListItem
                    key={user.id}
                    sx={{
                        gap: 1,
                        "&:hover": {
                            backgroundColor: theme.palette.hoverColor.main,
                        },
                    }}
                    onClick={() => createNewChat(user.id, user.fullName, user.profilePicture)}
                >
                    <Link className="search__user-link">
                        <Avatar
                            className="search__user-avatar"
                            sx={{ minWidth: "40px", minHeight: "40px" }}
                            alt="user icon"
                            src={user.profilePicture}
                        ></Avatar>
                        <Typography
                            className="search__user-name"
                            color={theme.palette.textColor.content}
                        >
                            {user.fullName}
                        </Typography>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}

export default GlobalUsersList;
