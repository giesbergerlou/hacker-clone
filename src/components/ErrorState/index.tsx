import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import './styles.css';

interface Props {
    message: string;
    icon?: IconProp;
}

const ErrorState: React.FunctionComponent<Props> = ({ message, icon }) => {
    return (
        <div className="error-container">
            {icon && <div className="disclaimer">
                <FontAwesomeIcon className="icon" icon={icon} />
            </div>}
            <div className="message">{message}</div>
        </div>
    )
};

export default ErrorState;