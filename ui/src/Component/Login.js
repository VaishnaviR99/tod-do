import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "../styles/login.css"


function Login() {

    const history = useNavigate();

    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post("https://ill-jade-tick-yoke.cyclic.app/login", {
                mobile, password
            })
                .then(res => {
                    console.log(res);
                    if (res.data.message === "Login successful") {
                        history("/home")
                    }
                    else  {
                        alert("User have not sign up")
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }


    return (
        <div className="page2">
            <div className="login">
                <div className="heading2">
                    <h1>Login</h1>
                </div>


                <form action="POST">
                    <label>Mobile No.</label>
                    <input type="number" onChange={(e) => { setMobile(e.target.value) }} placeholder="Mobile no." />
                    <label>Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                    
                    <button className="loginbtn" type="submit" onClick={submit}>Login In</button>

                </form>

                <br />
                <p>OR</p>
                <br />

                <Link to="/signup">Signup Page</Link>

            </div>
        </div>
    )
}

export default Login