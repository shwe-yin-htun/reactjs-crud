require('./bootstrap');
import React,{Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from './components/App';


ReactDOM.render(
        <App />, document.getElementById('myContent')
);
