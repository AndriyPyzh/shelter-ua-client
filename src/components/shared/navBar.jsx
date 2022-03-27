import React from 'react';
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/logout";
import NavPopover from "./navPopover";

const NavBar = (props) => {
    const { user } = props;

    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light border-bottom">
            <Link className="navbar-brand mr-auto pl-5" to="/">
                {/*<img src="../../logo.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>*/ }
                <span className="font-weight-bold m-2">Shelter UA</span>
            </Link>
            <NavLink className="nav-item nav-link m-1 mx-2 text-dark" to="/adverts">Знайти житло</NavLink>
            { !user &&
            <React.Fragment>
                <NavLink className="nav-item nav-link m-1 mx-2 mr-3 text-dark" to="/login">Надати житло</NavLink>
                <NavLink className="nav-item nav-link m-1 mx-2 pr-5 text-dark" to="/login">Увійти</NavLink>
            </React.Fragment> }

            { user &&
            <React.Fragment>
                <NavLink className="nav-item nav-link m-1 mx-2 mr-3 text-dark" to="/add-advert">Надати житло</NavLink>

                <NavPopover classes={ "nav-item no-button m-1 mr-3 ml-4 text-dark" } text='Я допомагаю'>
                    <NavLink className="nav-item nav-link border-bottom "
                             to="/my-adverts">Мої оголошення</NavLink>
                    <div className="d-flex justify-content-center no-button" style={ { height: 30 } }>
                        <Logout classes="no-button">Вийти</Logout>
                    </div>
                </NavPopover>
            </React.Fragment> }
        </nav>
    );

};

export default NavBar;
