import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: "#F0F2F5",
    borderRadius: "50px",
    // borderBottomRightRadius: "50px",
    // borderTopLeftRadius: "50px",
    // borderTopRightRadius: "50px",
    marginLeft: theme.spacing(1),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
        justifyContent: "center",
        borderRadius: "50%",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    [theme.breakpoints.down("lg")]: {
        width: "44px",
    },
}));

export { Search, SearchIconWrapper, StyledInputBase };
