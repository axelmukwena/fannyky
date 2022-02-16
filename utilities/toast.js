import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import reactDom, { unmountComponentAtNode } from "react-dom";

// Required options: message, type
// Types: default, success, warning, or danger
const Toast = function Toast(options) {
  const { message, type } = options;
  if (!message || !type) {
    throw new Error("You need to set message and type for Toast!");
  }

  // Remove element from DOM
  const handleClose = () => {
    const element = document.getElementById("toasts-root");
    unmountComponentAtNode(element);
  };

  const content = (
    <ToastContent handleClose={handleClose} type={type} message={message} />
  );

  reactDom.render(content, document.getElementById("toasts-root"));
};

const ToastContent = function ToastContent({ handleClose, type, message }) {
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className="toastjs-container" role="alert" aria-hidden="false">
      <div className={`toastjs ${type}`}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            padding: "0px 5px",
          }}
        >
          <Typography>{message}</Typography>
        </Box>

        <IconButton
          aria-label="close toast"
          onClick={handleClose}
          onMouseDown={handleMouseDown}
          edge="end"
          size="small"
          sx={{
            height: "fit-content",
            marginLeft: "auto",
            order: 2,
          }}
        >
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default Toast;
