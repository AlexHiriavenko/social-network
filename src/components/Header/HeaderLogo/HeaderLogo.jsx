import { NavLink } from "react-router-dom";
import SvgFacebook from "../SVG/FaceBook";

function HeaderLogo() {
    return (
        <NavLink to="/" style={{ minWidth: "40px" }}>
            <SvgFacebook />
        </NavLink>
    );
}

export default HeaderLogo;
