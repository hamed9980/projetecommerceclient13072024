import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import Home from './Home/Home';

import Auth from './Auth/Auth'


import FirstStep from './MultiStepRegistration/FirstStep';
import SecondStep from './MultiStepRegistration/Second';


import UserNavbar from './UserNavbar/UserNavbar'
const App1 = () => {
    const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };
    return <Router>
        <UserNavbar/>
        Welcome everyone

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth/>}/>
        <Route
            path="/first"
            element={<FirstStep user={user} updateUser={updateUser} />}
          />
          <Route
            path="/second"
            element={<SecondStep user={user} updateUser={updateUser} />}
          />
        </Routes>
    </Router>
}
const NotFound = () => {
    return <h1>Page non implémentée</h1>;
  };
export default App1