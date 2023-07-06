import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc, query, collection, where, getDocs } from "firebase/firestore"; 

import { IconContext } from "react-icons";
import { AiFillCloseSquare } from "react-icons/ai";

import { auth, db } from "../../lib/firebase"
import "./Signup.css"


export default function Register(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShort, setPasswordShort] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [longUsername, setLongUsername] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [usernameIsUnique, setUsernameIsUnique] = useState(true)
    const [emailIsUnique, setEmailIsUnique] = useState(true)

    function resetValues() {
        setPasswordShort(false)
        setInvalidUsername(false)
        setLongUsername(false)
        setInvalidEmail(false)
        setUsernameIsUnique(true)
        setEmailIsUnique(true)
    }

    async function doesUsernameExist(username) {
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size > 0;
    }

    console.log(doesUsernameExist("hello"))
    const signup = async () =>{
        resetValues()
        if(!email.match(/([a-zA-Z0-9_.+-]{2,}@[a-zA-Z0-9_.+-]{2,}\.[a-zA-Z0-9_.+-]{2,})/)){
            setInvalidEmail(true)
            console.log("email format invalid")
        }
        if(password.length < 6){
            setPasswordShort(true)
            console.log("password too short")
        }
        if(username.length < 4){
            setInvalidUsername(true)
            console.log("username too short")
        }
        if(username.length > 20){
            setLongUsername(true)
            console.log("username too short")
        }
        if(!passwordShort && !invalidUsername && !invalidEmail){
            try{
                if(!await doesUsernameExist(username)){
                    console.log("jwsnjfubib")
                    await createUserWithEmailAndPassword(auth,email,password).then
                    (async() => {
                        await setDoc(doc(db,"users",auth.currentUser.uid),{username:username.toLowerCase(), id:auth.currentUser.uid, avatar:"", date: Date.now()})
                        window.location.href='/dashboard'
                    }).catch((error) => {
                        if (error.code === "auth/email-already-in-use") {
                            setEmailIsUnique(false)
                    }console.error(error)})
                }
                else{
                    setUsernameIsUnique(false)
                }
            } 
            catch(error) {
                console.error(error)
            }
        }
    }

    const errorBox = (passwordShort || invalidUsername || longUsername || invalidEmail || !usernameIsUnique || !emailIsUnique) ?
        <div className="error-box">
            <div className="error-title-container">
                <p className="error-title">Error</p>
                <IconContext.Provider value={{ color: "red", size:"20px",  style: { cursor: "pointer" } }}>
                    <AiFillCloseSquare onClick={(e) => resetValues()}/>
                </IconContext.Provider>            </div>
            {passwordShort && <p className="error-text">Password Too Short, Must Be At Least 6 Characters</p>}
            {invalidUsername && <p className="error-text">Invalid Username</p>}
            {longUsername && <p className="error-text">Username too long</p>}
            {invalidEmail && <p className="error-text">Invalid Email</p>}
            {!usernameIsUnique && <p className="error-text">Sorry, Username Already In Use</p>}
            {!emailIsUnique && <p className="error-text">Sorry, Email Already In Use</p>}

        </div> : null

    return(
        <main className="signup-page">
            <div className="signup-container">
                <h1 className="signup-title">Signup</h1>
                {errorBox}
                <div className="form-container">
                    <label className="username-label" htmlFor="username">Username</label>
                    <input className="username-input" type="text" id="username" name="username" onChange={(event) => {setUsername(event.target.value)}}/>
                    <label className="email-label" htmlFor="email">Email</label>
                    <input className="email-input" type="text" id="email" name="email" onChange={(event) => {setEmail(event.target.value)}}/>
                    <label className="password-label" htmlFor="password">Password</label>
                    <input className="password-input" type="password" id="password" name="password" onChange={(event) => {setPassword(event.target.value)}}/>
                    <button className="signup-button" onClick={signup}>Signup</button>
                    <label className="login-text">Already have an account? <RouterLink to="/">Login</RouterLink> here!</label>
                </div>
            </div>
        </main>
    )
}