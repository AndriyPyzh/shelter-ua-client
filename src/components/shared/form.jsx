import Joi from "joi-browser";
import React, { Component } from 'react';
import ImageInput from "./imageInput";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
        showMessages: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        console.log("errors")
        console.log(error)
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error && error.details[0].message;
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleFileChange = async ({ target }) => {
        const img = await this.convertBase64(target.files[0]);
        const { data } = { ...this.state };
        data[target.name] = img;
        this.setState({ data });
    };

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    handleChange = ({ currentTarget: input }) => {
        const { errors, showMessages } = { ...this.state };
        const errorMessages = this.validateProperty(input);
        if (errorMessages) {
            errors[input.name] = errorMessages;
        } else {
            delete errors[input.name];
        }
        showMessages[input.name] = true;
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors, showMessages });
    };

    handleChangeCheckBox = (name, value) => {
        const data = { ...this.state.data };
        if (!data.hasOwnProperty(name)) {
            data[name] = [value];
        } else if (data[name].includes(value)) {
            data[name] = data[name].filter(x => x !== value);
        } else {
            data[name].push(value);
        }
        this.setState({ data });
    };

    renderInput(name, label, placeholder, type = "text", showText = true, ...attributes) {
        const { data, errors, showMessages } = this.state;

        return (
            <Input
                name={ name }
                label={ label }
                type={ type }
                placeholder={ placeholder }
                value={ data[name] }
                onChange={ this.handleChange }
                error={ errors[name] }
                showMessage={ showMessages[name] }
                showText={ showText }
                attributes={ attributes[0] }
            />
        );
    }

    renderRadio(name, label, options) {
        return (
            <div className="pt-2 pb-3">
                <label htmlFor={ name }><b>{ label }</b></label>
                { options.map(option => (
                    <div>
                        <input type="radio" id={ option._id } name={ name } value={ option.name }
                               onChange={ this.handleChange }/>
                        <label className="pl-2" htmlFor={ option._id }>{ option.name }</label>
                    </div>
                ))
                }
            </div>
        );
    }

    renderCheckBox(name, label, options) {
        return (
            <div>
                <label htmlFor={ name }><b>{ label }</b></label>
                { options.map(option => (
                    <div>
                        <input type="checkbox" id={ option._id } name={ option._id }
                               onChange={ () => this.handleChangeCheckBox(name, option.name) }/>
                        <label className="pl-2" htmlFor={ option._id }>{ option.name }</label>
                    </div>
                ))
                }
            </div>
        );
    }

    renderImageInput(name, label, classes = "") {
        return (
            <ImageInput
                name={ name }
                label={ label }
                onChange={ this.handleFileChange }
                classes={ classes }
            />
        );
    }

    renderSelect(name, label, options) {
        const { data } = this.state;

        return (
            <Select
                name={ name }
                value={ data[name] }
                label={ label }
                options={ options }
                onChange={ this.handleChange }
            />
        );
    }

    renderButton(label, classes = "btn btn-primary", onClick) {
        return (
            <button type="submit"
                    className={ classes }
                    disabled={ this.validate() }
                    onClick = {() => onClick()}>
                { label }
            </button>
        );
    }
}

export default Form;
