
import React, {useState} from "react"
import './App.css';
import {Login} from"./login and register/login";
import {Register} from"./login and register/register";




function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}


export default App;
