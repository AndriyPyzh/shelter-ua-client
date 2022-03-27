import React, { Component } from 'react';
import { Link } from "react-router-dom";
import authService from "../../services/authService";

class Home extends Component {
    render() {
        const user = authService.getCurrentUser();
        return (
            <div style={ { height: 700 } }>
                <div className="d-flex justify-content-center">
                    <div className="home-title d-inline-flex font-weight-bold mt-5" style={ { fontSize: 40 } }>
                        Надайте прихисток тим, хто втратив своє житло
                    </div>
                </div>
                <div className="row" style={ { marginTop: 50 } }>
                    <div className="w-100 d-flex d-inline-flex justify-content-center mt-3">
                        <Link to="/adverts" className="btn btn-primary no-button home-button mr-3">Знайти житло</Link>
                        { !user &&
                        <Link to="/login" className="btn btn-primary no-button home-button">Надати житло</Link>
                        }
                        { user &&
                        <Link to="/add-advert" className="btn btn-primary no-button home-button">Надати житло</Link>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
