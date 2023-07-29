// import { useSelector, useDispatch } from "react-redux";
// import { toggleMode } from "../../../../redux/darkMode.slice/darkMode.slice";
// import BtnArrowBack from "../../../Buttons/BtnArrowBack";
// import { Menu, Switch, FormControlLabel, Box, Typography } from "@mui/material";

// function DarkModeMenu(props) {
//     const dispatch = useDispatch();
//     const mockDarkMode = false;
//     const { anchor, goBack, toggleMenu } = props;
//     const darkMode = useSelector((state) => state.darkMode.isOn);
//     const toggleDisplayMode = () => {
//         dispatch(toggleMode());
//     };
//     return (
//         <Menu
//             sx={{ mt: "45px" }}
//             anchorEl={anchor}
//             anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//             }}
//             transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//             }}
//             // keepMounted
//             open={Boolean(anchor)}
//             onClose={toggleMenu}
//             slotProps={{
//                 paper: {
//                     className: "header__options-drop-menu",
//                 },
//             }}>
//             <Box sx={{ p: 2 }}>
//                 <BtnArrowBack onClick={goBack} />
//                 <FormControlLabel
//                     name="darke mode"
//                     value="dark mode"
//                     control={
//                         <Switch
//                             defaultChecked={mockDarkMode ? true : false}
//                             color="primary"
//                             onClick={toggleDisplayMode}
//                         />
//                     }
//                     label={<Typography fontWeight={600}>Dark Mode</Typography>}
//                     labelPlacement="start"
//                 />
//             </Box>
//         </Menu>
//     );
// }

// export default DarkModeMenu;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../../../redux/darkMode.slice/darkMode.slice";
import BtnArrowBack from "../../../Buttons/BtnArrowBack";
import { Menu, Switch, FormControlLabel, Box, Typography } from "@mui/material";

function DarkModeMenu(props) {
    const dispatch = useDispatch();
    const { anchor, goBack, toggleMenu } = props;
    const darkMode = useSelector((state) => state.darkMode.isOn);

    // Управление состоянием Switch с помощью useState
    const [isChecked, setIsChecked] = useState(darkMode);

    useEffect(() => {
        setIsChecked(darkMode);
    }, [darkMode]);

    const toggleDisplayMode = () => {
        // setIsChecked((prevChecked) => !prevChecked); // Инвертируем значение при клике
        dispatch(toggleMode()); // Вызываем функцию для обновления Redux состояния
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
            }}
        >
            <Box sx={{ p: 2 }}>
                <BtnArrowBack onClick={goBack} />
                <FormControlLabel
                    name="dark mode"
                    value="dark mode"
                    control={
                        <Switch checked={isChecked} color="primary" onClick={toggleDisplayMode} />
                    }
                    label={<Typography fontWeight={600}>Dark Mode</Typography>}
                    labelPlacement="start"
                />
            </Box>
        </Menu>
    );
}

export default DarkModeMenu;
