import React from "react";


// Styles
import "./styles.css";

const LoadingState: React.FunctionComponent = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingState;