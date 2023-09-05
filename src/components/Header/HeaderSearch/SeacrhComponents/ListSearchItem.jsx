import { ListItem, Typography, Avatar } from "@mui/material/";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { lookFriendPage } from "./lookFriendPage";

function ListSearchItem({ user }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.user.authorizedUser);

    return (
        <ListItem
            sx={{
                gap: 1,
                "&:hover": {
                    backgroundColor: theme.palette.hoverColor.main,
                },
            }}>
            <Link
                to="/profile"
                onClick={() => lookFriendPage(dispatch, user.id, authUser)}
                className="search__user-link">
                <Avatar
                    className="search__user-avatar"
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

export default ListSearchItem;
