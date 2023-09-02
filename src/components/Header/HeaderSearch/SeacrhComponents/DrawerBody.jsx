import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material/";
import ListRecentSearches from "./ListRecentSearches";

function DrawerBody({ toggleDrawer, foundUser }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: { xs: "320px", sm: "360px" },
                backgroundColor: theme.palette.backgroundColor.section,
                minHeight: "calc(100% - 65px)",
            }}
        >
            <Box>
                <Typography
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        fontFamily: "Segoe UI Bold",
                        color: theme.palette.textColor.content,
                    }}
                    component="h3"
                    variant="h6"
                >
                    Recent searches
                </Typography>

                <ListRecentSearches onClick={toggleDrawer} users={foundUser} />
            </Box>
        </Box>
    );
}

export default DrawerBody;
