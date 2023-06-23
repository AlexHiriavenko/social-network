import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import s from "../header.module.css";
import { SvgHome } from "../SVG/svg";

export default function HeaderTabs() {
    return (
        <nav>
            <ul className={s.navList}>
                <li>
                    <NavLink to="/" className={s.navItemLink}>
                        <SvgHome />
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
    );
}
