import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material/";
import BtnArrowBack from "../../../Buttons/BtnArrowBack";
import SearchForHomePage from "../../../Search/SearchForHomePage";

function DrawerHead({ toggleDrawer, setFoundUser }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: theme.palette.backgroundColor.section,
                pr: 2,
                pb: "4px",
            }}
        >
            <Box sx={{ display: "flex", p: 1 }}>
                <BtnArrowBack
                    onClick={toggleDrawer}
                    color={theme.palette.textColor.secondary}
                    hoverColor={theme.palette.input.mainBackground}
                />
            </Box>
            <SearchForHomePage setFoundUser={setFoundUser} />
        </Box>
    );
}

export default DrawerHead;
