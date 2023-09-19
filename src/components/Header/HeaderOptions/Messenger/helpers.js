import {
    createChat,
    deleteTemporaryParticipant,
    setCurrentChatCompanion,
    getChat,
    openChat,
    deleteChat,
    setChatsList,
} from "../../../../redux/chat.slice/chat.slice";
import { sendMessage } from "../../../../redux/message.slice/message.slice";

export function createNewChat(args, userId, fullName, profilePicture) {
    const [dispatch, authUser, setNewMessageModal] = args;
    if (userId === authUser.id) {
        alert("Нелья создать чат с самим собой");
        return;
    }
    // dispatch(deleteChat(22));
    const currentChatCompanion = {
        userId: userId,
        fullName: fullName,
        profilePicture: profilePicture,
    };
    dispatch(deleteTemporaryParticipant());
    setNewMessageModal(false);
    dispatch(setCurrentChatCompanion(currentChatCompanion));
    dispatch(openChat());
    dispatch(createChat(userId)).then(({ payload }) => {
        if (payload.messages.length < 1) {
            const formData = new FormData();
            const content = `${authUser.fullName} created this chat with ${fullName}`;
            formData.append("content", content);
            formData.append("chatId", payload.id);

            const newParticipant = {
                content: content,
                fullName: fullName,
                id: payload.id,
                profilePicture: profilePicture,
                userId: userId,
                chatParticipant: [
                    {
                        id: userId,
                        fullName: fullName,
                        profilePicture: profilePicture,
                    },
                ],
            };
            dispatch(setChatsList(newParticipant));
            dispatch(sendMessage({ files: formData })).then(() => {
                dispatch(getChat(payload.id));
            });
        }
    });
}
