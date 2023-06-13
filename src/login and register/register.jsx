import React, {useState} from "react"


export const Register =(props) =>{
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
          e.preventDefault();
          console.log(email);
    }
    console.log("re-rendered")

    return(
        <div className="auth-form-container">
             <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>

            <label htmlFor="email"><strong>Email</strong></label>
            <input value={email}  onChange={(e) => setEmail(e.target.value)}  type="email" placeholder="Input your email here" id="email" name="email"/>
            <label htmlFor="userName"><strong>User Name</strong></label>
            <input value={userName}  onChange={(e) => setUserName(e.target.value)}  type="userName" placeholder="Your user name" id="userName" name="userName"/>
    
            <label htmlFor="password"><strong>Password</strong></label>
            <input value={password}  onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="********" id="password" name="password"/>
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an Account? Login here. </button>
        </div>
    )
}
