// Javascript function to run the webapp which is called in index.js/rendered in the root

import './App.css';
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import ChatPage from './Pages/ChatPage';

function App() {
    return (
    <div className="App"> 
      <Route path = '/' component = { Home } exact />
      <Route path = '/chats' component = { ChatPage }/>
    </div>
    );
}

export default App;
