import { Avatar, Box, Paper, TextField } from "@mui/material";
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
          width: "30%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          right: "50px",
        }}>
        {userName && userPhoto && (
          <Box sx={{ display: "flex" }}>
            <Avatar alt={userName} src={userPhoto} />
            <p>{userName}</p>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(closeChat())}
            />
          </Box>
        )}
        {message?.map((mes, id) => (
          <Paper key={id} elevation={3}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={userPhoto}
                alt={userName}
              />
              <p>{mes}</p>
            </Box>
          </Paper>
        ))}
        {answers &&
          answers?.map((ans, id) => (
            <Paper key={id} elevation={1}>
              <p>{ans}</p>
            </Paper>
          ))}
        <Box
          sx={{
            display: "flex",
            flexGrow: 0,
            position: "absolute",
            bottom: 0,
            width: "100%",
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
