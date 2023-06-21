function LogIn(props) {

    const {auth, onClick} = props 

    return (
    <>
        <h2 className="tempTitle">Login Form Must Be Here</h2>
        {auth ? null : <button onClick={onClick} className="tempBtn">click to LogIn</button>}
    </>
    );
}

export default LogIn;
