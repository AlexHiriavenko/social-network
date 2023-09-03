export const setChatParticipant = (participants, id) => {
    console.log(id);
    const user = participants.find((participant) => participant.id === id);
    console.log(user);
    return user ? user : participants[0];
};

export const isAuthUser = (authUserID, userId) => authUserID === userId;
