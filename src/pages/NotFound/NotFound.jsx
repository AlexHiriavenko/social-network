import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function NotFound() {
    const theme = useTheme();
    return (
        <div style={{ minHeight: "94vh", backgroundColor: theme.palette.backgroundColor.page }}>
            <h1
                style={{
                    paddingTop: "20px",
                    textAlign: "center",
                    color: theme.palette.textColor.main,
                }}
            >
                Page Not Found
            </h1>
            <p
                style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: theme.palette.textColor.main,
                }}
            >
                Click to switch{" "}
                <Link to="/" style={{ color: theme.palette.textColor.primary, fontSize: "24px" }}>
                    Home
                </Link>
            </p>
        </div>
    );
}

export default NotFound;
