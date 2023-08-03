import { Avatar, Box, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useDispatch, useSelector } from "react-redux";
import { closeChat } from "../../../../redux/chat.slice/chat.slice";
import { useState } from "react";
function Chat(props) {
  const { user } = props;
  const handlerSend = () => {
    if (sendMessage.trim("") !== "") {
      answers.push(sendMessage);
      setSendMessage("");
    }
  };
  const dispatch = useDispatch();
  const [sendMessage, setSendMessage] = useState("");
  const { userName, userPhoto, message, answers } = user || [];
  const open = useSelector((state) => state.chat.isOpened);
  if (open) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: "50px",
          backgroundColor: "#ffffff",
          width: "20%",
          height: "80%",
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
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "80%",
            overflowY: "scroll",
          }}>
          {message?.map((mes, id) => (
            <Paper
              key={id}
              style={{
                key: id,
                display: "inline-block",
                borderRadius: "16px",
                padding: "10px 20px",
                background: "#fefefe",
                color: "0e0e0e",
                maxWidth: "70%",
                marginTop: "3px",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src={userPhoto}
                  alt={userName}
                />
                <Typography>{mes}</Typography>
              </Box>
            </Paper>
          ))}
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
                  padding: "10px 20px",
                  background: "rgb(0, 132, 255)",
                  maxWidth: "70%",
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
            flexGrow: 0,
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: "center",
            gap: "5px",
            paddingBottom: "5px",
          }}>
          <ControlPointIcon sx={{ cursor: "pointer", color: "blue" }} />
          <TextField
            fullWidth={!!sendMessage}
            sx={{ border: 0, outline: "none" }}
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
