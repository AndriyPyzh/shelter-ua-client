import Joi from 'joi-browser';
import React from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logger from "../../services/logService";
import userService from "../../services/userService";
import Form from "../shared/form";
import AuthPage from "./authPage";

class AddInfoForm extends Form {
    state = {
        data: {
            avatar: null,
            firstName: '',
            lastName: '',
            phone: ''
        },
        errors: {},
        showMessages: {}
    };

    schema = {
        avatar: Joi.any(),
        firstName: Joi.string().regex(/^[a-zA-Z]*$/).max(20).required().label('First Name').options({
            language: { string: { regex: { base: 'can contain only letters' } } }
        }),
        lastName: Joi.string().regex(/^[a-zA-Z]*$/).max(20).required().label('Last Name').options({
            language: { string: { regex: { base: 'can contain only letters' } } }
        }),
        phone: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).required().label('Phone Number').options({
            language: { string: { regex: { base: 'should be a valid phone number' } } }
        })
    };

    doSubmit = async () => {
        try {
            await userService.updateInfo(this.state.data);
            window.location = '/apartments';
        } catch (ex) {
            logger.log(ex);
            if (ex.response)
                toast.error(ex.response.data.message.toString());
            else
                toast.error(ex.toString());
        }
    };

    render() {
        const { avatar } = this.state.data;
        return (
            <AuthPage
                title={ "Add Information" }
                footer={ <span>Already have Rentberry account? <Link to={ "/signup" }
                                                                     className="text-purple">Log in</Link></span> }
                { ...this.props }
            >
                <form onSubmit={ this.handleSubmit }>
                    <div className="card-body" style={ { padding: 40 } }>
                        <div className="d-flex justify-content-center">
                            { !avatar && <div className="empty-avatar d-flex justify-content-center"/> }
                            { avatar && <img src={ avatar } alt="avatar uploaded" className="avatar"/> }
                        </div>
                        { super.renderImageInput("avatar", "Change Photo", "link") }
                        { super.renderInput("firstName", "First Name", "enter first name...") }
                        { super.renderInput("lastName", "Last Name", "enter last name...") }
                        { super.renderInput("phone", "Phone Number", "enter phone number...") }
                    </div>
                    { super.renderButton("Confirm", "btn btn-primary auth-button") }
                </form>
            </AuthPage>
        );
    }
}

export default AddInfoForm;

