import React from "react";
import Navbar from "./components/assets/js/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import QuizCreator from "./components/pages/QuizCreateForm";
import Contact from "./components/pages/Contact";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import AvailableQuizPreviewPage from "./components/pages/AvailableQuizPreviewPage ";
import Dashboard from "./components/pages/Dashboard";
import FormDataPage from "./components/pages/Formdata";
import QuizPreviewPage from "./components/pages/QuizPreview";
import AvailableQuizPage from "./components/pages/AvailableQuizPage";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create-quiz' component={QuizCreator} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/form-data' component={FormDataPage} />
          <Route
            path='/available-quiz-preview'
            component={AvailableQuizPreviewPage}
          />
          <Route path='/quiz-preview' component={QuizPreviewPage} />
          <Route path='/available-quiz' component={AvailableQuizPage} />
          <Route path='/grade-quiz' component={GradeQuizPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
