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

export function createNewChat(args, id, fullName, profilePicture) {
    const [dispatch, authUser, setNewMessageModal] = args;
    // dispatch(deleteChat(19));
    const currentChatCompanion = {
        userId: id,
        fullName: fullName,
        profilePicture: profilePicture,
    };
    dispatch(deleteTemporaryParticipant());
    setNewMessageModal(false);
    dispatch(setCurrentChatCompanion(currentChatCompanion));
    dispatch(openChat());
    dispatch(createChat(id)).then(({ payload }) => {
        if (payload.messages.length < 1) {
            const chatID = payload.id;
            const newMessage = {
                id: 0,
                content: `${authUser.fullName} created this chat with ${fullName}`,
                chatId: chatID,
            };
            const newParticipant = {
                content: newMessage.content,
                fullName: fullName,
                id: chatID,
                profilePicture: profilePicture,
                userId: id,
                chatParticipant: [
                    {
                        id: id,
                        fullName: fullName,
                        profilePicture: profilePicture,
                    },
                ],
            };
            dispatch(setChatsList(newParticipant));
            dispatch(sendMessage(newMessage)).then(() => {
                dispatch(getChat(chatID));
            });
        }
    });
}
