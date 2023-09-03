import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from "./searhStyles";
import { useRef } from "react";
import { findByPartOfName } from "../../../../redux/user.slice/user.slice.js";

function Search(props) {
    const { onClick, inputClass, searchIconWrapClass, inputId, setFoundUser } = props;
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);
    const theme = useTheme();
    const dispatch = useDispatch();

    const timeoutRef = useRef(null);
    const valueRef = useRef(null);

    function findUser(part) {
        let nameByPart = dispatch(findByPartOfName(part));
        nameByPart.then((result) => setFoundUser(result.payload));
    }

    function debounce(f, t) {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(f, t);
        setFoundUser([]);
    }

    const handleSearchImput = (event) => {
        valueRef.current = event.target.value;
        debounce(() => {
            if (event.target.value.length > 0) {
                findUser(event.target.value);
            }
        }, 800);
    };
    return (
        <SearchDiv className="search">
            <SearchIconWrapper
                className={searchIconWrapClass}
                sx={{
                    width: { xs: "100%" },
                }}
            >
                <SearchIcon
                    style={{
                        color: theme.palette.textColor.secondary,
                        minWidth: "24px",
                    }}
                />
            </SearchIconWrapper>

            <StyledInputBase
                id={inputId}
                readOnly={isDrawerOpen ? false : true}
                autoFocus={isDrawerOpen ? true : false}
                className={inputClass}
                onClick={onClick}
                onChange={handleSearchImput}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
            />
        </SearchDiv>
    );
}

export default Search;
