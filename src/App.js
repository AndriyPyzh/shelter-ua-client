import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import AddAdvert from "./components/adverts/addAdvert";
import Adverts from "./components/adverts/adverts";
import MyAdverts from "./components/adverts/myAdverts";
import LoginForm from "./components/auth/loginForm";
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFound";
import Footer from "./components/shared/footer";
import NavBar from "./components/shared/navBar";
import userService from "./services/userService";


class App extends Component {
    state = {};

    async componentDidMount() {
        try {
            const user = await userService.getCurrentAccount();
            this.setState({ user });
        } catch (ex) {
        }
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer position="top-center" pauseOnHover/>
                <NavBar user={ this.state.user }/>
                <main className="container">
                    <Switch>
                        <Route path="/add-advert" component={ AddAdvert }/>
                        <Route path="/my-adverts" component={ MyAdverts }/>
                        <Route path="/adverts" component={ Adverts }/>
                        <Route path="/login"
                               render={ props => <LoginForm { ...props }/> }/>
                        <Route path="/not-found" component={ NotFound }/>
                        <Route path="/" exact component={ Home }/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default App;
