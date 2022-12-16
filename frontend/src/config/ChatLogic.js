// Handling the logic of chats for display purposes on front-end interface

// returns the user that is in the chat that is not the one logged in to the current application portal
// E.G I am in a group chat with Kyle, this returns Kyle because I am logged in as my own user which is
// equal to the loggedUser._id
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
