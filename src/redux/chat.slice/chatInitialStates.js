export const initialState = {
    isOpened: false,
    isLoading: false,
    isLoadingChat: false,
    unread: 0,
    chatsParticipants: [],
    currentChatCompanion: {
        id: 0,
        profilePicture:
            "https://www.facebook.com/images/mercury/clients/messenger/threadlist/NewMessage.png",
        fullName: "uknown user",
    },
    currentChat: {
        id: 0,
        messages: [
            {
                createdBy: "",
                createdDate: "",
                updatedBy: "",
                updatedDate: "",
                id: null,
                content: "",
                chatId: null,
            },
        ],
        users: [],
    },
};

export const temporaryPartisipantState = {
    id: null,
    userId: null,
    fullName: "New Chat",
    content: "",
    lastMessageDate: "",
    profilePicture:
        "https://www.facebook.com/images/mercury/clients/messenger/threadlist/NewMessage.png",
    chatParticipant: [],
};
