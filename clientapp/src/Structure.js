import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Navbar from './Navbar/Navbar';
import Auth from './Auth/Auth';
import SecondStep from './MultiStepRegistration/Second';
import FirstStep from './MultiStepRegistration/FirstStep'
import FirstStep1 from './MultiStepRegistration/FirstStepParam';
//import AppHead from './MultiStepRegistration/MultiStepHeader';
import Departments from './Departments/Departments';
import FullForm from './SetProfile/SetProfile';
const Structure = () => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };
  return (
    <Router>
    
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        <Route
            path="/first"
            element={<FirstStep user={user} updateUser={updateUser} />}
          />
          <Route
            path="/second"
            element={<SecondStep user={user} updateUser={updateUser} />}
          />
         <Route path='/dep' element={<Departments/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/fullform" element={<FullForm/>}/>
        <Route path="/firststep/:first_name/:last_name" element={<FirstStep1/>}/>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const NotFound = () => {
  return <h1>404 - Not Found</h1>;
};

export default Structure;
