import SearchIcon from "@mui/icons-material/Search";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from "./searhStyles";

function Search(props) {
    const onClick = props.onClick;
    const inputClass = props.inputClass;
    const searchIconWrapClass = props.searchIconWrapClass;

    return (
        <SearchDiv sx={{ display: "flex", alignContent: "center" }}>
            <SearchIconWrapper className={searchIconWrapClass} sx={{ width: { xs: "100%" } }}>
                <SearchIcon
                    style={{
                        color: "rgb(101, 103, 107)",
                        minWidth: "24px",
                    }}
                />
            </SearchIconWrapper>
            <StyledInputBase
                className={inputClass}
                onClick={onClick}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
            />
        </SearchDiv>
    );
}

export default Search;
