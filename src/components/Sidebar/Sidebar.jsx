import s from "./sidebar.module.scss";

function Sidebar(props) {
    return <aside className={s["page-sidebar"]}>{props.children}</aside>;
}

export default Sidebar;
