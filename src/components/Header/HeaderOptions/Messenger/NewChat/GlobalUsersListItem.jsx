import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { createNewChat } from "../helpers";

function GlobalUsersListItem({ user, setNewMessageModal }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const authUser = useSelector((state) => state.user.authorizedUser);

    let args = [dispatch, authUser, setNewMessageModal];

    return (
        <ListItem
            sx={{
                gap: 1,
                "&:hover": {
                    backgroundColor: theme.palette.hoverColor.main,
                },
            }}
            onClick={() =>
                createNewChat(args, user.id, user.fullName, user.profilePicture)
            }>
            <Link className="search__user-link">
                <Avatar
                    sx={{ minWidth: "40px", minHeight: "40px" }}
                    alt="user icon"
                    src={user.profilePicture}></Avatar>
                <Typography color={theme.palette.textColor.content}>
                    {user.fullName}
                </Typography>
            </Link>
        </ListItem>
    );
}

export default GlobalUsersListItem;
