import Joi from 'joi-browser';
import React from 'react';
import { toast } from "react-toastify";
import authService from "../../services/authService";
import logger from "../../services/logService";
import Form from "../shared/form";

class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {},
        showMessages: {},
        login: true
    };

    schema = {
        username: Joi.string().min(4).max(15).required().label('Ім\'я'),
        password: Joi.string().min(8).max(30).required().label('Пароль')
    };

    doSubmit = async () => {
        console.log("auth type");
        console.log(this.state.login);
        try {
            const { username, password } = this.state.data;
            if (this.state.login) {
                await authService.login(username, password);
            } else {
                await authService.register(username, password);
            }
            window.location = '/';
        } catch (ex) {
            logger.log(ex);
            if (ex.response && ex.response.status === 400)
                toast.error("Invalid Username or Password");
            else
                toast.error(ex.message.toString());
        }
    };

    forRegistration = () => {
        this.setState({ login: false });
    };

    render() {
        return (
            <form className="d-flex justify-content-center" style={ { height: 600, marginTop: 100 } }
                  onSubmit={ this.handleSubmit }>
                <div style={ { padding: 40, width: 600 } }>
                    <div className="font-weight-bold pb-4" style={ { fontSize: 25 } }>Увійдіть або зареєструйтеся</div>
                    { super.renderInput("username", "Ім'я", "Введіть ім'я...") }
                    { super.renderInput("password", "Пароль", "Введіть пароль", "password") }
                    { super.renderButton("Увійти", "btn btn-primary btn-block") }
                    { super.renderButton("Зареєструватися", "btn btn-primary btn-block", this.forRegistration) }
                </div>
            </form>
        );
    }
}

export default LoginForm;

