import { sendMessage } from "../../../redux/message.slice/message.slice";
import { getChat } from "../../../redux/chat.slice/chatActions";

export const handleClickSend = (event, args) => {
    const [dispatch, inputRef, currentChat, files, setFiles, setImgUrls] = args;
    const btn = event.target.closest("button");
    const formData = new FormData();
    const inputValue = inputRef.current.value.trim();

    if (inputValue) {
        formData.append("content", inputValue);
    }

    formData.append("chatId", currentChat.id);

    if (files.length) {
        files.forEach((el) => {
            formData.append(`files`, el);
        });
    }
    if (inputValue || files.length) {
        btn.disabled = true;
        btn.style.pointerEvents = false;
        inputRef.current.value = "";
        inputRef.current.readOnly = true;
        setFiles([]);
        setImgUrls([]);
        dispatch(sendMessage({ files: formData }))
            .then(() => dispatch(getChat(currentChat.id)))
            .then(() => {
                inputRef.current.readOnly = false;
                btn.disabled = false;
                btn.style.pointerEvents = true;
            });
    }
};

export const handleKeyDown = (event, args) => {
    const [dispatch, inputRef, currentChat, files, setFiles, setImgUrls] = args;
    const formData = new FormData();
    const inputValue = inputRef.current.value.trim();

    if (event.key === "Enter" && inputRef.current.value.trim()) {
        event.preventDefault();

        if (inputValue) {
            formData.append("content", inputValue);
        }

        formData.append("chatId", currentChat.id);

        if (files.length) {
            files.forEach((el) => {
                formData.append(`files`, el);
            });
        }
        if (inputValue || files.length) {
            inputRef.current.value = "";
            inputRef.current.readOnly = true;
            setFiles([]);
            setImgUrls([]);
            dispatch(sendMessage({ files: formData }))
                .then(() => dispatch(getChat(currentChat.id)))
                .then(() => {
                    inputRef.current.readOnly = false;
                });
        }
    }
};
