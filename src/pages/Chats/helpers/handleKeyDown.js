// const handleKeyDown = (
//     event,
//     dispatch,
//     inputRef,
//     authUser,
//     currentChat,
//     id = 0
// ) => {
//     if (event.key === "Enter" && inputRef.current.value.trim()) {
//         const inputValue = inputRef.current.value.trim();
//         const newMessage = {
//             id: id,
//             content: inputValue,
//             sender: authUser,
//             chat: currentChat,
//         };
//         inputRef.current.value = "";
//         dispatch(sendMessage(newMessage))
//             .then(() => dispatch(getChat(currentChat.id)))
//             .catch((error) => {
//                 console.error("Error sending message:", error);
//             });
//     }
// };

// export default handleKeyDown;
