import React, {useState} from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        
        if (name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount){
            //create account
            data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error){
            setError(error.message);
        }
    };

    const onSocialClick = async (e) => {
        const {
            target: {name},
        } = e;
        
        if(name === "google"){
            await authService.signInWithPopup(new firebaseInstance.auth.GoogleAuthProvider());
        } else if(name === "github"){
            await authService.signInWithPopup(new firebaseInstance.auth.GithubAuthProvider());
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input 
                     type="submit" 
                     value={newAccount ? "Create Account" : "Log In"}
                />
                {error}    
            </form>
             <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>    
                <button onClick={onSocialClick} name="github">Continue with Github</button>    
            </div>  
        </div>
    );
}
export default Auth; 