import { Avatar, Box, Card, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { closePageChat } from "../../../redux/chat.slice/chat.slice";
import { useEffect, useRef, useState } from "react";
import { Label } from "@mui/icons-material";
import { height } from "@mui/system";
function ChatContent(props) {
    const messageListRef = useRef(null);
    const theme = useTheme();
    const { user } = props;
    const { userName, userPhoto, message, answers } = user || [];
    const handlerSend = () => {
        if (sendMessage.trim() !== "") {
            setSendMessage("");
            answers.push(sendMessage);
        }
    };

    const handleIconClick = () => {
        setAnswer((prevState) => [
            ...prevState,
            <ThumbUpAltIcon key={Date.now()} sx={{ background: "none" }} />,
        ]);
        handlerSend();
    };
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [answers]);
    const dispatch = useDispatch();
    const [sendMessage, setSendMessage] = useState("");
    const open = useSelector((state) => state.chatPage.isOpened);
    if (open && userName) {
        return (
            <Box
                sx={{
                    backgroundColor: theme.palette.backgroundColor.card,
                    width: "100%",
                    height: "100%",
                    minHeight: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 1,
                        minHeight: "40px",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "flex-start",
                        }}
                    >
                        <Avatar alt={userName} src={userPhoto} />
                        <Typography variant="h6" sx={{ color: theme.palette.textColor.main }}>
                            {userName}
                        </Typography>
                    </Box>
                    <Avatar
                        sx={{
                            bgcolor: theme.palette.hoverColor.dark,
                            minWidth: "40px",
                            minHeight: "40px",
                        }}
                    >
                        <CloseIcon
                            sx={{
                                cursor: "pointer",
                                color: theme.palette.textColor.blueLink,
                            }}
                            onClick={() => dispatch(closePageChat())}
                        />
                    </Avatar>
                </Box>
                <Box
                    ref={messageListRef}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        flexGrow: 1,
                        p: 1,
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Avatar
                            sx={{
                                width: 24,
                                height: 24,
                                alignSelf: "flex-end",
                            }}
                            src={userPhoto}
                            alt={userName}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {message?.map((mes, id) => (
                                <Paper
                                    key={id}
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                        borderRadius: "16px",
                                        padding: "5px 10px",
                                        backgroundColor: theme.palette.buttonColor.background,
                                        wordWrap: "break-word",
                                        color: theme.palette.textColor.main,
                                        maxWidth: "70%",
                                        marginTop: "8px",
                                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <Typography>{mes}</Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                    {answers &&
                        answers?.map((ans, id) => (
                            <Paper
                                key={id}
                                style={{
                                    display: "inline-block",
                                    backgroundColor: "rgb(0, 132, 255)",
                                    color: "#ffffff",
                                    marginTop: "3px",
                                    borderRadius: "16px",
                                    padding: "5px 10px",
                                    background: "rgb(0, 132, 255)",
                                    maxWidth: "70%",
                                    wordWrap: "break-word",
                                    boxShadow:
                                        "0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset, 0 2px 1px -1px rgba(255, 255, 255, 0.5) inset",
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    marginLeft: "auto",
                                }}
                            >
                                <Typography>{ans}</Typography>
                            </Paper>
                        ))}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: "5px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "24px",
                            height: "24px",
                            display: "inline-block",
                        }}
                    >
                        <PhotoLibraryIcon
                            sx={{
                                color: theme.palette.textColor.blueLink,
                            }}
                        />
                        <TextField
                            type="file"
                            sx={{
                                opacity: 0,
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        />
                    </Box>
                    <ControlPointIcon
                        sx={{
                            cursor: "pointer",
                            color: theme.palette.textColor.blueLink,
                        }}
                    />
                    <TextField
                        placeholder="Aa"
                        id="filled-hidden-label-small"
                        InputProps={{
                            style: {
                                color: theme.palette.textColor.secondary,
                                backgroundColor: theme.palette.accentColor.secondary,
                                borderRadius: "30px",
                            },
                        }}
                        size="small"
                        fullWidth={!!sendMessage}
                        value={sendMessage}
                        onChange={(e) => {
                            setSendMessage(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                handlerSend();
                            }
                        }}
                    />
                    {sendMessage ? (
                        <SendIcon
                            sx={{
                                cursor: "pointer",
                                transition: "all 0.2s,ease",
                                color: theme.palette.textColor.blueLink,
                            }}
                            onClick={handlerSend}
                        />
                    ) : (
                        <ThumbUpAltIcon
                            sx={{
                                transition: "all 0.2s ease",
                                cursor: "pointer",
                                color: theme.palette.textColor.blueLink,
                            }}
                            onClick={handleIconClick}
                        />
                    )}
                </Box>
            </Box>
        );
    } else {
        return (
            <div
                style={{
                    margin: "20px auto 0",
                    color: theme.palette.textColor.secondary,
                }}
            >
                <h3>Select a chat or start a new conversation</h3>
            </div>
        );
    }
}

export default ChatContent;

// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Avatar, Box, Paper, TextField, Typography } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";
// import ControlPointIcon from "@mui/icons-material/ControlPoint";
// import { closePageChat } from "../../../redux/chat.slice/chat.slice";

// function ChatContent(props) {
//     const messageListRef = useRef(null);
//     const { user } = props;
//     const { userName, userPhoto, message } = user || [];
//     const [answers, setAnswer1] = useState(user?.answers || []);
//     const handlerSend = () => {
//         if (sendMessage.trim() !== "") {
//             setAnswer1((prevState) => [...prevState, sendMessage]);
//             setSendMessage("");
//         }
//     };

//     useEffect(() => {
//         if (messageListRef.current) {
//             messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//         }
//     }, [answers]);

//     const dispatch = useDispatch();

//     const [sendMessage, setSendMessage] = useState("");

//     const open = useSelector((state) => state.chatPage.isOpened);

//     if (open && userName) {
//         return (
//             <Box
//                 sx={{
//                     backgroundColor: "ffffff",
//                     width: "100%",
//                     minHeight: "80vh",
//                     display: "flex",
//                     flexDirection: "column",
//                 }}
//             >
//                 <Box
//                     sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         p: 1,
//                         minHeight: "40px",
//                         alignItems: "center",
//                         boxShadow:
//                             "0 1px 2px rgba(0, 0, 0, 0.1),0 -1px rgba(0, 0, 0, 0.1) inset,0 2px 1px -1px rgba(255, 255, 255, 0.5) inset",
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             display: "flex",
//                             gap: "5px",
//                             justifyContent: "flex-start",
//                         }}
//                     >
//                         <Avatar alt={userName} src={userPhoto} />
//                         <Typography variant="h6">{userName}</Typography>
//                     </Box>
//                     <CloseIcon
//                         sx={{ cursor: "pointer" }}
//                         onClick={() => dispatch(closePageChat())}
//                     />
//                 </Box>
//                 <Box
//                     ref={messageListRef}
//                     sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         overflowY: "auto",
//                         flexGrow: 1,
//                         p: 1,
//                     }}
//                 >
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                         <Avatar
//                             sx={{
//                                 width: 24,
//                                 height: 24,
//                                 alignSelf: "flex-end",
//                             }}
//                             src={userPhoto}
//                             alt={userName}
//                         />
//                         <Box sx={{ display: "flex", flexDirection: "column" }}>
//                             {message?.map((mes, id) => (
//                                 <Paper
//                                     key={id}
//                                     style={{
//                                         key: id,
//                                         display: "inline-block",
//                                         verticalAlign: "middle",
//                                         borderRadius: "16px",
//                                         padding: "5px 10px",
//                                         background: "#fefefe",
//                                         wordWrap: "break-word",
//                                         color: "0e0e0e",
//                                         maxWidth: "70%",
//                                         marginTop: "3px",
//                                         boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
//                                     }}
//                                 >
//                                     <Typography>{mes}</Typography>
//                                 </Paper>
//                             ))}
//                         </Box>
//                     </Box>
//                     {answers &&
//                         answers?.map((ans, id) => (
//                             <Paper
//                                 key={id}
//                                 style={{
//                                     display: "inline-block",
//                                     backgroundColor: "rgb(0, 132, 255)",
//                                     color: "#ffffff",
//                                     marginTop: "3px",
//                                     borderRadius: "16px",
//                                     padding: "5px 10px",
//                                     background: "rgb(0, 132, 255)",
//                                     maxWidth: "70%",
//                                     wordWrap: "break-word",
//                                     boxShadow:
//                                         "0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset, 0 2px 1px -1px rgba(255, 255, 255, 0.5) inset",
//                                     border: "1px solid rgba(0, 0, 0, 0.1)",
//                                     marginLeft: "auto",
//                                 }}
//                             >
//                                 <Typography>{ans}</Typography>
//                             </Paper>
//                         ))}
//                 </Box>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         width: "100%",
//                         alignItems: "center",
//                         gap: "5px",
//                         paddingTop: "5px",
//                         paddingBottom: "5px",
//                     }}
//                 >
//                     <ControlPointIcon sx={{ cursor: "pointer", color: "blue" }} />
//                     <TextField
//                         placeholder="Aa"
//                         fullWidth={!!sendMessage}
//                         value={sendMessage}
//                         onChange={(e) => {
//                             setSendMessage(e.target.value);
//                         }}
//                         onKeyUp={(e) => {
//                             if (e.keyCode === 13) {
//                                 handlerSend();
//                             }
//                         }}
//                     />
//                     <SendIcon sx={{ cursor: "pointer", color: "blue" }} onClick={handlerSend} />
//                 </Box>
//             </Box>
//         );
//     } else {
//         return <p>Select a chat or start a new conversation</p>;
//     }
// }

// export default ChatContent;
