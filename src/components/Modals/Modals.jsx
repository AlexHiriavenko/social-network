import CreateCommentModal from "./CreateCommentModal";
import CreatePostModal from "./CreatePostModal";
import EditProfileModal from "./EditProfileModal";
import DeleteMessageModal from "./DeleteMessageModal/DeleteMessageModal";
import EditMessageModal from "./EditMessageModal/EditMessageModal";

export default function Modals() {
  return (
    <>
      <CreatePostModal />
      <EditProfileModal />
      <CreateCommentModal />
      <DeleteMessageModal />
      <EditMessageModal />
    </>
  );
}
