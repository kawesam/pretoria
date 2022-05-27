import logo from './logo.svg';
import React,{Component} from "react";
import {Switch,Route,Link,BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home-component";
import AppsList from "./components/apps-list";
import AnApp from "./components/anApp.component";
import AddApp from "./components/add-app.component";
import deleteApps from "./components/delete-apps.component";

class App extends Component{
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser:undefined
    }
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if(user){
      this.setState({
        currentUser: user
      })
    }
  }
  logOut(){
    AuthService.logout()
  }
  render() {
    const { currentUser } = this.state;
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Pretia Technologies
            </Link>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/my-apps"} className="nav-link">
                       Apps
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/add"} className="nav-link">
                      Add App
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/delete-apps"} className="nav-link">
                      Delete Apps
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
            )}
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/my-apps" component={AppsList} />
              <Route exact path="/my-list" component={AppsList} />
              <Route exact path="/edit-list/:id" component={AnApp} />
              <Route exact path="/add" component={AddApp} />
              <Route exact path="/delete-apps" component={deleteApps} />

            </Switch>
          </div>
        </div>
    );

  }

}

export default App;
