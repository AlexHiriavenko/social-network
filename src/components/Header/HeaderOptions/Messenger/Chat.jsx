import { Avatar, Box, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useDispatch, useSelector } from "react-redux";
import { closeChat } from "../../../../redux/chat.slice/chat.slice";
import { useEffect, useRef, useState } from "react";
function Chat(props) {
  const messageListRef = useRef(null);
  const { user } = props;
  const { userName, userPhoto, message } = user || [];
  const [answers, setAnswer] = useState(user.answers || []);
  const handlerSend = () => {
    if (sendMessage.trim() !== "") {
      setAnswer((prevState) => [...prevState, sendMessage]);
      setSendMessage("");
    }
  };
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [answers]);
  const dispatch = useDispatch();
  const [sendMessage, setSendMessage] = useState("");
  const open = useSelector((state) => state.chat.isOpened);
  if (open) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: "50px",
          backgroundColor: "#ffffff",
          width: "23%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          right: "50px",
          boxShadow:
            "0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset, 0 2px 1px -1px rgba(255, 255, 255, 0.5) inset",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}>
        {userName && userPhoto && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              minHeight: "40px",
              alignItems: "center",
              boxShadow:
                "0 1px 2px rgba(0, 0, 0, 0.1),0 -1px rgba(0, 0, 0, 0.1) inset,0 2px 1px -1px rgba(255, 255, 255, 0.5) inset",
            }}>
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                justifyContent: "flex-start",
              }}>
              <Avatar alt={userName} src={userPhoto} />
              <Typography variant="h6">{userName}</Typography>
            </Box>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(closeChat())}
            />
          </Box>
        )}
        <Box
          ref={messageListRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            flexGrow: 1,
          }}>
          <Box sx={{ display: "flex" }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                alignSelf: "flex-end",
                marginLeft: "5px",
              }}
              src={userPhoto}
              alt={userName}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {message?.map((mes, id) => (
                <Paper
                  key={id}
                  style={{
                    key: id,
                    display: "inline-block",
                    verticalAlign: "middle",
                    borderRadius: "16px",
                    padding: "5px 10px",
                    background: "#fefefe",
                    wordWrap: "break-word",
                    color: "0e0e0e",
                    maxWidth: "70%",
                    marginTop: "3px",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}>
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
                }}>
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
          }}>
          <ControlPointIcon sx={{ cursor: "pointer", color: "blue" }} />
          <TextField
            placeholder="Aa"
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
          <SendIcon
            sx={{ cursor: "pointer", color: "blue" }}
            onClick={handlerSend}
          />
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}

export default Chat;
