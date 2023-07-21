import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../../../redux/darkMode.slice/darkMode.slice";
import BtnArrowBack from "../../../Buttons/BtnArrowBack";
import { Menu, Switch, FormControlLabel, Box, Typography } from "@mui/material";

function DarkModeMenu(props) {
    const dispatch = useDispatch();
    const mockDarkMode = false;
    const { anchor, goBack, toggleMenu } = props;
    const darkMode = useSelector((state) => state.darkMode.isOn);
    const toggleDisplayMode = () => {
        dispatch(toggleMode());
    };
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
            }}>
            <Box sx={{ p: 2 }}>
                <BtnArrowBack onClick={goBack} />
                <FormControlLabel
                    name="darke mode"
                    value="dark mode"
                    control={
                        <Switch
                            defaultChecked={mockDarkMode ? true : false}
                            color="primary"
                            onClick={toggleDisplayMode}
                        />
                    }
                    label={<Typography fontWeight={600}>Dark Mode</Typography>}
                    labelPlacement="start"
                />
            </Box>
        </Menu>
    );
}

export default DarkModeMenu;
