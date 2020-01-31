import React from 'react';
import logo from '../assets/line-chart.svg'

const Header = ({text}) => {
    return (
        <header className="header">
            <div className="container">
                <a href="/" className="header__logo-wrapper">
                    <img src={logo} alt="logo"/>
                </a>
                <div className="header__main-wrapper">
                    <div className="header-inner-wrapper">
                        <svg viewBox="0 0 100 100">
                            <g>
                            <path d="M13 4 Q 28 140 70 50 C 96 -33 102 15 99 100" stroke="black" fill="transparent" />
                            </g>
                        </svg>
                        <h1>{text}</h1>
                        <svg viewBox="0 0 100 100">
                            <g>
                            <path d="M13 4 Q 28 140 70 50 C 96 -33 102 15 99 100" stroke="black" fill="transparent" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
