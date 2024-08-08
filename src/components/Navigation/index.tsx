import React from "react";
import { NavLink } from "react-router-dom";

// Helpers
import { createPaths } from "../../helpers/routes";
import { capitalizeFirstLetter } from "./helpers";

// Styles
import './styles.css'

const Navigation: React.FunctionComponent = () => {
    return (
        <nav className="navigation">
            <ul>
                <li key={0}>
                    <NavLink key={0} to="/" className={(({ isActive }) => {
                        return isActive ? 'active' : '';
                    })}>Home</NavLink>
                </li>
                {createPaths().slice(1).map((path, index) => {
                    return (
                        <li key={index}>
                            <NavLink key={index + 1} to={path} className={(({ isActive }) => {
                                return isActive ? 'active' : '';
                            })}>{capitalizeFirstLetter(path)}</NavLink>
                        </li>
                    )
                })}
            </ul>
            <div>
                <a href="https://github.com/giesbergerlou/hacker-clone" target="_blank" rel="noreferrer">Open on GitHub</a>
            </div>
        </nav>
    );
};

export default Navigation;