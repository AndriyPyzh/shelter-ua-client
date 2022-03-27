import React from "react";

const ImageInput = ({ name, label, onChange, classes }) => {
    return (
        <div className="text-center">
            <input type="file" id={ name } name={ name } accept="image/*"
                   onChange={ onChange }/>
            <label htmlFor={ name } className={ classes }>
                { label }
            </label>
        </div>
    );
};

export default ImageInput;
