import React, {useState} from "react"

export const Login =(props) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) =>{
          e.preventDefault();
          console.log(email);
    }
    console.log("re-rendered")
    return(
        <div className="auth-form-container">
            <h2 >Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="email"><strong>Email</strong></label>
            <input value={email}  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Input your email here" id="email" name="email"/>
            <label htmlFor="password"><strong>Password</strong></label>
            <input  value={password}  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit">Login</button>

        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an Account? Register here. </button>
        </div>
    )
}

