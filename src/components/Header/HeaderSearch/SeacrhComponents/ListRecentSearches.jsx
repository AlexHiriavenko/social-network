import { useTheme } from "@mui/material/styles";
import { List, Typography } from "@mui/material/";
import ListSearchItem from "./ListSearchItem";

function ListRecentSearches({ users }) {
    const theme = useTheme();

    return (
        <List>
            {!users?.length && (
                <Typography p={2} color={theme.palette.textColor.content}>
                    No search history yet
                </Typography>
            )}
            {users?.map((user) => (
                <ListSearchItem key={user.id} user={user} />
            ))}
        </List>
    );
}

export default ListRecentSearches;
