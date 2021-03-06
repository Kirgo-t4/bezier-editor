import React from 'react';
import PropTypes from "prop-types";

import logo from '../assets/line-chart.svg';

const Header = ({text}) => {

    return (
        <header className="header">
            <div className="container">
                <a href="/" className="header__logo-wrapper">
                    <img src={logo} alt="logo"/>
                </a>
                <div className="header__main-wrapper">

                    <div className="header-inner-wrapper">
                        <h1>{text}</h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    text: PropTypes.string,
}

export default Header;
