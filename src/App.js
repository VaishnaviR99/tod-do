import React  from 'react';
import {Route,Routes} from "react-router-dom"
import Signup from "./Component/Signup"
import Login from './Component/Login';
import Home from './Component/Home';

const App = () => {
  
  return (
    <div>
     <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>


     </Routes>
    </div>
  );
};

export default App;
