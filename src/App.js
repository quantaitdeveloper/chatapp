import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chatroom from './components/Chat room/ChatRoom';
import AppProvider from './context/AppProvider';
import AddRoomModal from './Modals/AddRoomModal';
import InviteMember from './Modals/InviteMember';

function App() {
  return <Router>
      <AppProvider>
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Chatroom} path="/chat-room" />
        <Route component={Login} path="/" />
          </Switch>
          <AddRoomModal />
          <InviteMember />
    </AppProvider>
  </Router>
}

export default App;
