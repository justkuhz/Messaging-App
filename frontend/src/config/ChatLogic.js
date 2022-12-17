// Handling the logic of chats for display purposes on front-end interface

// returns the user that is in the chat that is not the one logged in to the current application portal
// E.G I am in a group chat with Kyle, this returns Kyle because I am logged in as my own user which is
// equal to the loggedUser._id
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};


// Return the full sender profile information when examining other users profile modals
export const getSenderProfile = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

// Groups all consecutive messages sent by the same user
export const isSameSender = (messages, m, i, userID) => {
  return (
    i < messages.length - 1 && (
      messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userID
  );
}

// Check if the message is the last message a user sent
export const isLastMessage = (messages, i, userID) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userID &&
    messages[messages.length -1].sender._id
  );
};

// Check margin for who is sending their chat (display on left or right)
export const isSameSenderMargin = (messages, m, i, userID) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userID
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userID) ||
    (i === messages.length - 1 && messages[i].sender._id !== userID)
  )
    return 0;
  else return "auto";
};

// Determine if the user who sent the previous message is the same as the new message
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
}