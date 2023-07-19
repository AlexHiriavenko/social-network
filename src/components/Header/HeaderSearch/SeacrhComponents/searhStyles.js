import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

const SearchDiv = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: "#F0F2F5",
    borderRadius: "50px",
    marginLeft: theme.spacing(1),
}));

const SearchIconWrapper = styled("div")(({ theme, className }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    ...className,
}));

const StyledInputBase = styled(InputBase)(({ theme, className }) => ({
    color: "inherit",
    borderRadius: "50px",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    ...className,
}));

export { SearchDiv, SearchIconWrapper, StyledInputBase };