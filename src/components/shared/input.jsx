import React from "react";

const Input = ({ name, label, type, placeholder, value, onChange, error, showMessage, showText, attributes = {} }) => {
    let borderColor = showMessage && (error ? "#f44336" : '#28a745');
    let message = showMessage && (error || 'Looks good!') && showText;

    return (
        <div>
            <label htmlFor={ name }><b>{ label }</b></label>
            <input
                value={ value }
                onChange={ onChange }
                type={ type }
                id={ name }
                name={ name }
                className="form-control"
                placeholder={ placeholder }
                style={ { borderColor: borderColor } }
                { ...attributes }/>
            <div className="mt-1"
                 style={ {
                     fontSize: 13,
                     color: borderColor,
                     height: 19
                 } }>{ message }</div>
        </div>
    );
};

export default Input;
