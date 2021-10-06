import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chatroom from './components/Chatroom/ChatRoom';
import AppProvider from './context/AppProvider';

function App() {
  return <Router>
    <AppProvider>
      <Switch>
        <Route component={Chatroom} path="/chat" />
        <Route component={Login} path="/" />
      </Switch>
    </AppProvider>
  </Router>
}

export default App;
