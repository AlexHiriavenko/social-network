import BtnArrowBack from "../../../Buttons/BtnArrowBack";
import { Menu, Switch, FormControlLabel, Box } from "@mui/material";

function DarkModeMenu(props) {
    const mockDarkMode = false;
    const { anchor, goBack, toggleMenu } = props;
    return (
        <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchor}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            // keepMounted
            open={Boolean(anchor)}
            onClose={toggleMenu}
            slotProps={{
                paper: {
                    className: "header__options-drop-menu",
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <BtnArrowBack onClick={goBack} />
                <FormControlLabel
                    name="darke mode"
                    value="dark mode"
                    control={
                        <Switch defaultChecked={mockDarkMode ? true : false} color="primary" />
                    }
                    label="Dark Mode"
                    labelPlacement="start"
                />
            </Box>
        </Menu>
    );
}

export default DarkModeMenu;
