// Chatbox component that displays messages and allows scrolling up and down through message history

import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  // import context to get currently logged in user information
  const { user } = ChatState();

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} style={{ display: "flex" }}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  marginTop="7px"
                  marginRight={1}
                  size="sm"
                  cursor={"pointer"}
                  src={m.sender.picture}
                  name={m.sender.name}
                />
              </Tooltip>
            )}

            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#047dff" : "#8cec8c"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: `${m.sender._id === user._id ? "white" : "black"}`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 5 : 15,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
