import { NavLink } from "react-router-dom";
import SvgSocial from "../../SVG/SocialIcon";

function HeaderLogo() {
    return (
        <NavLink to="/" style={{ minWidth: "40px" }}>
            <SvgSocial />
        </NavLink>
    );
}

export default HeaderLogo;
