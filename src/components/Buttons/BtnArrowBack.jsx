import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BtnArrowBack(props) {
    const { onClick, color = "rgb(101, 103, 107)", hoverColor = "#F0F2F5" } = props;
    return (
        <Button
            onClick={onClick}
            sx={{
                minWidth: "44px",
                minHeight: "44px",
                borderRadius: "50%",
                "&:hover": {
                    backgroundColor: hoverColor,
                },
            }}
        >
            <ArrowBackIcon
                style={{
                    color: color,
                    minWidth: "24px",
                }}
            />
        </Button>
    );
}

export default BtnArrowBack;
