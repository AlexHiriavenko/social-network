function filterChatParticipants(allChats, authUserID) {
    if (allChats.length > 0) {
        const filteredParticpents = allChats.filter(
            (chat) => chat.userId !== authUserID
        );

        const uniqueIdMap = new Map();
        const idCountMap = {};

        filteredParticpents.forEach((item) => {
            if (!uniqueIdMap.has(item.id)) {
                uniqueIdMap.set(item.id, item);
                idCountMap[item.id] = 0;
            } else {
                idCountMap[item.id] += 1;
            }
        });

        const clone = structuredClone(uniqueIdMap);

        clone.forEach((item) => {
            item.quantityUsers = idCountMap[item.id];
        });

        return Array.from(clone.values());
    }
    return [];
}

export default filterChatParticipants;
