import React,{Component} from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import ProductComponent from './admin/ProductComponent';
import Dashboard from './admin/Dashboard';
import UserComponent from'./admin/UserComponent';
import UserRoleComponent from './admin/UserRoleComponent';
import CategoryComponent from './admin/CategoryComponent';
import SubCategory from './admin/SubCategory';

export default class app extends React.Component {
        render() {
          return (
            <Router>
              <div>
                <Route exact path='/' component={Dashboard} />
                <Route path='/products' component={ProductComponent} />
                <Route path='/users' component={UserComponent} />
                <Route path='/roles' component={UserRoleComponent} />
                <Route path='/categories' component={CategoryComponent} />
                <Route path='/subcategory' component={SubCategory} />
              </div>
            </Router>
          )
        }
 }