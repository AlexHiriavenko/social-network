import CreateCommentModal from "./CreateCommentModal";
import CreatePostModal from "./CreatePostModal";
import EditProfileModal from "./EditProfileModal";
import DeleteMessageModal from "./DeleteMessageModal/DeleteMessageModal";
import EditMessageModal from "./EditMessageModal/EditMessageModal";
import AddUserToChatModal from "./AddUserToChatModal/AddUserToChatModal";
import Pictures from "../Pictures/Pictures";
import CheckRepostsModal from "./CheckRepostsModal";
import CheckLikesModal from "./CheckLikesModal";

export default function Modals() {
    return (
        <>
            <CreatePostModal />
            <EditProfileModal />
            <CreateCommentModal />
            <DeleteMessageModal />
            <EditMessageModal />
            <AddUserToChatModal />
            <Pictures />
            <CheckRepostsModal />
            <CheckLikesModal />
        </>
    );
}
