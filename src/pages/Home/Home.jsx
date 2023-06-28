import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/login.slice/login.slice";

function Home(props) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const handleLogOut = (event) => {
        dispatch(logOut());
    };

    return (
        <>
            <div className="page">
                <h2 className="tempTitle">Home Page Content</h2>
                {isLoggedIn && (
                    <button onClick={handleLogOut} className="tempBtn">
                        LogOut
                    </button>
                )}
            </div>
        </>
    );
}

export default Home;
