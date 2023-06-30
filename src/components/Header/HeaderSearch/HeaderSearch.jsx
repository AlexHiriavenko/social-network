import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./searhStyles";

function HeaderSearch() {
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
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>
    );
}

export default HeaderSearch;
