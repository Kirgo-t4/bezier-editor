import 'react-app-polyfill/ie9';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import "@fortawesome/fontawesome-free/css/fontawesome.min.css"
import "@fortawesome/fontawesome-free/css/regular.min.css"
import "@fortawesome/fontawesome-free/css/solid.min.css"

import './index.scss';
import './media.scss';

ReactDOM.render(<App />, document.getElementById('root'));
