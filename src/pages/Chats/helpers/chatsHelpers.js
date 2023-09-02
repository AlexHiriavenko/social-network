export const setChatParticipant = (participants, id) => {
    const user = participants.find((participant) => participant.id === id);
    return user ? user : participants[0];
};

export const isAuthUser = (authUserID, userId) => authUserID === userId;
