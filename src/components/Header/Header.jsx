import { NavLink, Link } from "react-router-dom";
import s from "../Header/header.module.css";

function Header() {
    return (
        <header>
            <nav>
                <ul className={s.navList}>
                    <li>
                        <NavLink to="/" className={s.navItemLink}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/watch" className={s.navItemLink}>
                            Watch Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/marketplace" className={s.navItemLink}>
                            Marketplace Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/groups" className={s.navItemLink}>
                            Groups Page
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
