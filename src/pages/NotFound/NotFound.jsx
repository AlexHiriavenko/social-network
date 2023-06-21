import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Page Not Found</h1>
            <p>
                Click to switch{" "}
                <Link to="/" style={{ color: "white" }}>
                    Home
                </Link>
            </p>
        </>
    );
}

export default NotFound;
