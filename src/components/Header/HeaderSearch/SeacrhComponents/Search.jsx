import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from "./searhStyles";

function Search(props) {
    const theme = useTheme();
    const { onClick, inputClass, searchIconWrapClass, inputId } = props;
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);

    return (
        <SearchDiv sx={{ display: "flex", alignContent: "center" }} className="search">
            {
                <SearchIconWrapper
                    className={searchIconWrapClass}
                    sx={{
                        width: { xs: "100%" },
                        backgroundColor: theme.palette.input.mainBackground,
                    }}
                >
                    <SearchIcon
                        style={{
                            color: theme.palette.textColor.secondary,
                            minWidth: "24px",
                        }}
                    />
                </SearchIconWrapper>
            }
            <StyledInputBase
                id={inputId}
                readOnly={isDrawerOpen ? false : true}
                autoFocus={isDrawerOpen ? true : false}
                className={inputClass}
                onClick={onClick}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
            />
        </SearchDiv>
    );
}

export default Search;
