import React from "react";

const NotFound = () => {
    return (
        <div className="container " style={ { fontSize: 25, height: 700 } }>
            <div className="row align-items-center" style={ { height: 500 } }>
                <div style={ { paddingLeft: 350 } }>
                    <span style={ { fontSize: 30, fontWeight: 50 } }>404 | </span>
                    <span>This page could not be found.</span>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

