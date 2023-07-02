import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from "./searhStyles";

function Search(props) {
    const { onClick, inputClass, searchIconWrapClass, ref } = props;
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);

    return (
        <SearchDiv sx={{ display: "flex", alignContent: "center" }}>
            {
                <SearchIconWrapper className={searchIconWrapClass} sx={{ width: { xs: "100%" } }}>
                    <SearchIcon
                        style={{
                            color: "rgb(101, 103, 107)",
                            minWidth: "24px",
                        }}
                    />
                </SearchIconWrapper>
            }
            <StyledInputBase
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
