import Sidebar from "../../components/Sidebar/Sidebar";

function Groups() {
    return (
        <div className="container-page">
            <Sidebar>
                <p className="Dialog-message">Sidebar content</p>
            </Sidebar>
            <main className="main-page-content">
                <h2 className="tempTitle">Watch Page Content</h2>
            </main>
        </div>
    );
}

export default Groups;
