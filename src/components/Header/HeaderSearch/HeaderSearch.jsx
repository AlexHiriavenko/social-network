import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import { Search, SearchIconWrapper, StyledInputBase } from "./searhStyles";
import { paperClasses } from "@mui/material";

function HeaderSearch() {
    const [state, setState] = useState(false);

    const toggleDrawer = (open) => () => {
        setState(open);
    };

    const handleBackdropClick = () => {
        setState(false);
    };

    const list = (
        <div style={{ backgroundColor: "green", opacity: 1 }}>
            ASFLKASDFASASFDSADKF
        </div>
    );

    return (
        <Search>
            <SearchIconWrapper sx={{ width: { xs: "100%" } }}>
                <SearchIcon
                    style={{
                        color: "rgb(101, 103, 107)",
                        minWidth: "24px",
                    }}
                />
            </SearchIconWrapper>
            <StyledInputBase
                onClick={toggleDrawer(true)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
            />
            <Drawer
                classes={{
                    modal: "custom-drawer-paper",
                    paper: "test",
                }}
                anchor="left"
                open={state}
                onClose={toggleDrawer(false)}
                slotProps={{
                    backdrop: {
                        className: "custom-backdrop",
                        onClick: handleBackdropClick,
                    },
                }}
                ModalProps={{
                    onBackdropClick: handleBackdropClick,
                    classes: {
                        root: "custom-backdrop",
                    },
                }}
            >
                {list}
            </Drawer>
        </Search>
    );
}

export default HeaderSearch;

// import React, { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import Drawer from "@mui/material/Drawer";
// import { Search, SearchIconWrapper, StyledInputBase } from "./searhStyles";

// function HeaderSearch() {
//     const [state, setState] = useState(false);

//     const toggleDrawer = (open) => (event) => {
//         setState(prev);
//     };

//     const handleBackdropClick = () => {
//         setState(false);
//     };

//     const list = <div>ASFLKASDFASASFDSADKF</div>;

//     return (
//         <Search>
//             <SearchIconWrapper sx={{ width: { xs: "100%" } }}>
//                 <SearchIcon
//                     style={{
//                         color: "rgb(101, 103, 107)",
//                         minWidth: "24px",
//                     }}
//                 />
//             </SearchIconWrapper>
//             <StyledInputBase
//                 onClick={toggleDrawer}
//                 placeholder="Search…"
//                 inputProps={{ "aria-label": "search" }}
//             />
//             <Drawer
//                 anchor="left"
//                 open={state}
//                 onClose={toggleDrawer}
//                 classes={{ modal: "custom-drawer-paper" }}
//                 hideBackdrop={true}
//                 ModalProps={{
//                     hideBackdrop: true,
//                     onBackdropClick: handleBackdropClick,
//                 }}
//             >
//                 {list}
//             </Drawer>
//         </Search>
//     );
// }

// export default HeaderSearch;

// import React, { useState, useRef, useEffect } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import Drawer from "@mui/material/Drawer";
// import { Search, SearchIconWrapper, StyledInputBase } from "./searhStyles";

// function HeaderSearch() {
//     const [state, setState] = useState(false);
//     const drawerRef = useRef(null);

//     const toggleDrawer = () => {
//         setState(!state);
//     };

//     const handleBackdropClick = (event) => {
//         if (drawerRef.current && !drawerRef.current.contains(event.target)) {
//             setState(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleBackdropClick);
//         return () => {
//             document.removeEventListener("mousedown", handleBackdropClick);
//         };
//     }, []);

//     const list = <div>ASFLKASDFASASFDSADKF</div>;

//     return (
//         <Search>
//             <SearchIconWrapper sx={{ width: { xs: "100%" } }}>
//                 <SearchIcon
//                     style={{
//                         color: "rgb(101, 103, 107)",
//                         minWidth: "24px",
//                     }}
//                 />
//             </SearchIconWrapper>
//             <StyledInputBase
//                 onClick={toggleDrawer}
//                 placeholder="Search…"
//                 inputProps={{ "aria-label": "search" }}
//             />
//             <Drawer
//                 anchor="left"
//                 open={state}
//                 onClose={toggleDrawer}
//                 classes={{ paper: "custom-drawer-paper" }}
//                 ModalProps={{
//                     hideBackdrop: true,
//                 }}
//             >
//                 <div ref={drawerRef}>{list}</div>
//             </Drawer>
//         </Search>
//     );
// }

// export default HeaderSearch;
