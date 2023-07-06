import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"

import { IconContext } from "react-icons"
import { AiFillCloseSquare } from "react-icons/ai"

import { auth } from "../../lib/firebase"
import "./Login.css"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidUser, setInvalidUser] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    const [tooManyAttempts, setTooManyAttempts] = useState(false)

    function resetValues() {
        setInvalidEmail(false)
        setInvalidUser(false)
        setWrongPassword(false)
        setTooManyAttempts(false)
        setInvalidPassword(false)
    }

    const login = async () =>{
        resetValues()
        if(password.length === 0){
            setInvalidPassword(true)
        }
        if(!email.match(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9_.+-]+)/)){
            setInvalidEmail(true)
            console.log("email format invalid")
        }
        if(!invalidEmail && !invalidPassword){
            try{
                await signInWithEmailAndPassword(auth,email,password).then
                    (async() => {
                        window.location.href='/dashboard';
                    }).catch((error) => {
                        if (error.code === "auth/user-not-found") {
                            setInvalidUser(true)
                        }
                        if (error.code === "auth/wrong-password") {
                            setWrongPassword(true)
                        }
                        if (error.code === "auth/too-many-requests") {
                            setTooManyAttempts(true)
                        }
                        console.error(error)
                    })
            } catch(error) {
                console.error(error)
            }
        }
    }

    const errorBox = (invalidUser || wrongPassword || invalidEmail || tooManyAttempts || invalidPassword) ?
        <div className="error-box">
            <div className="error-title-container">
                <p className="error-title">Error</p>
                <IconContext.Provider value={{ color: "red", size:"20px",  style: { cursor: "pointer" } }}>
                    <AiFillCloseSquare onClick={(e) => resetValues()}/>
                </IconContext.Provider>
            </div>
            {invalidEmail && <p className="error-text">Invalid Email</p>}
            {invalidUser && <p className="error-text">User Not Found</p>}
            {wrongPassword && <p className="error-text">Password Incorrect, Please Try Again</p>}
            {tooManyAttempts && <p className="error-text">Too Many Attempts, Please Try Again Later</p>}
            {invalidPassword && <p className="error-text">Invalid Password</p>}
        </div> : null

    return(
        <main className="login-page">
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                {errorBox}
                <div className="form-container">
                    <label className="email-label" htmlFor="email">Email</label>
                    <input className="email-input" type="text" id="email" name="email" onChange={(event) => {setEmail(event.target.value)}}/>
                    <label className="password-label" htmlFor="password">Password</label>
                    <input className="password-input" type="password" id="password" name="password" autoComplete="on" onChange={(event) => {setPassword(event.target.value)}}/>
                    <button className="login-button" onClick={login}>Login</button>
                    <label className="register-text">Don't have an account? <RouterLink to="/signup">Register</RouterLink> here!</label>
                </div>
            </div>
        </main>
    )
}