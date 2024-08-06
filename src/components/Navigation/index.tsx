import React from "react";
import { Link } from "react-router-dom";

// Helpers
import { createPaths } from "../../helpers/routes";

// Styles
import './styles.css'

const Navigation: React.FunctionComponent = () => {
    return (
        <nav className="navigation">
            <ul>
                {createPaths().map((path, index) => {
                    return (
                        <li key={index}>
                            <Link key={index} to={path}>{path}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default Navigation;