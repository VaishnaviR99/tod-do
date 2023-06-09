import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "../styles/signup.css"


function Signup() {
  const history = useNavigate();

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [name, setname] = useState('')
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();

   

    try {
      const response = await axios.post('http://localhost:8000/signup', {
        name,
        mobile,
        password,
      });
  
      if (response.status === 201) {
        history('/home');
      } else {
        console.log(response.data);
        alert('User already exists, please login');
        
      }
    } catch (error) {
      console.log('Error during signup: ');
      //setError(error.response.data.message);
    }
  };



  return (
    <div className="page">
      <div className="signup">
        <div className="heading">
          <h1>Signup</h1>
        </div>
        <div className="form_div">
          <form action="POST">
            <label>Username</label>
            <input type="text" onChange={(e) => { setname(e.target.value) }} placeholder="Name." />
            <label>Mobile No.</label>
            <input type="number" onChange={(e) => { setMobile(e.target.value) }} placeholder="Mobile no." />
            <label>Password</label>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
            <button className="signupbtn" type="submit" onClick={submit} >Sign Up</button>
            {/* <input type="submit" onClick={submit} /> */}

          </form>
        </div>
        <br />
      <p>OR</p>
      <br />

      <Link to="/">Login Page</Link>
        
      </div>


      

    </div>
  )
}

export default Signup