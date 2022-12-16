// Context file
// Web-app state that can be called at any location or time
// "Single Truth"

import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();

    const history = useHistory();

useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // // If user info not found, re-route to homepage
    // if (!userInfo) {
    //     history.push('/');
    // }
}, [history])


    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
};

// Create a hook useable by other js files
// All of our state is inside the variable ChatState
export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;