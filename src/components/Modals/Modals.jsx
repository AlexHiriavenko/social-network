import CreateCommentModal from "./CreateCommentModal";
import CreatePostModal from "./CreatePostModal";
import EditProfileModal from "./EditProfileModal";

export default function Modals() {
  return (
    <>
      <CreatePostModal />
      <EditProfileModal />
      <CreateCommentModal />
    </>
  );
}
