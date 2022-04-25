import logo from './logo.svg';
import './App.css';
import Auth from './Auth';
import Signup from './signup'
import Details from './Details';
import AddTask from './addTask';

//import Protect from './protected';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './Dashboard';
import Task from './Task';
import Login from './Login';

function App() {
  console.log('Path =>',window.location.pathname === '/app');
  return (
    <div className="App text-center">
      
      {/* <Details /> */}

        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/app" element={<Login />} />
          <Route path="/app/auth" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
            
          <Route path="auth/details" element={<Details />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addTask" element={<AddTask />} />
          <Route path="task" element={<Task />} />
          <Route path="Signup" element={<Signup />} />
        
        </Routes>
    </div>
  );
}

export default App;
