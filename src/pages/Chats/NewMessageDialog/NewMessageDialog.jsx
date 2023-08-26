import SearchForHomePage from "../../../components/Search/SearchForHomePage";
import NewMessageHeader from "../../../components/Header/HeaderOptions/Messenger/NewMessage/NewMessageHeader";

function NewMessageDialog({ setNewMessageModal }) {
    return (
        <div style={{ width: "100%", padding: "8px 8px" }}>
            <NewMessageHeader setNewMessageModal={setNewMessageModal}></NewMessageHeader>
            <SearchForHomePage></SearchForHomePage>
        </div>
    );
}

export default NewMessageDialog;
