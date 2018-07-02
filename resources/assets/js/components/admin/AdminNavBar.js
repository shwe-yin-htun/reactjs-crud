
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

export default class AdminNavBar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
             <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                <li className="nav-item">
                    <span className="nav-link">
                       <Link to="/">Dashboard</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">
                       <Link to="/users">Users Management</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">
                         <Link to="/subcategory">Category Management</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">
                        <Link to="/products">Products Management</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">
                        <Link to="/">Orders Management</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           shwe-yin-htun
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">shweyinhtun@gmail.com</a>
                            <a className="dropdown-item" href="#">Profile</a>
                            <a className="dropdown-item" href="#">Logout</a>
                        </div>
                    </span>
                </li>
          </ul>
         </div>
        )
    }
}