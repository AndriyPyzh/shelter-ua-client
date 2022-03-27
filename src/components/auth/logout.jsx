import React from 'react';

const Logout = ({ classes, children }) => {
    const logout = () => {
        localStorage.removeItem('token');
        window.location = '/';
    };
    return (
        <button className={ classes } onClick={ logout }>
            { children }
        </button>
    );

};

export default Logout;
