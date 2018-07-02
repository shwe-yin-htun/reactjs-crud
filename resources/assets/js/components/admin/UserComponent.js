import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

var $this;
export default class UserComponent extends Component {
    constructor(props){
        super(props);
        $this=this;
        this.state={
            users:[],
            roles:[],
            id : '',
            name: '',
            email: '',
            password:'',
            role_id:'',
            invalid_name:<span></span>,
            invalid_email:<span></span>,
            invalid_role:<span></span>,
            invalid_password:<span></span>,
            popup : true
        }
       
    }

    componentDidMount(){
         $this.fectchUsers();
    }

    fectchUsers(){
        axios.get('api/users')
        .then(function (response) {
            $this.setState({
              users:response.data.users,
              roles:response.data.roles
            })
        }).catch(function (error) {
          console.log(error);
      });
    }

    handleShowPopup(){
       $this.Clear();
       $this.setState({
            popup:!$this.state.popup
       })
    }
    handleOnChanges(event){
      $this.setState({
          [event.target.name]:event.target.value
      })
    }
    handleSaveUser(event){
        event.preventDefault();
        var id=this.state.id;
        var userObj={
             'username':this.state.name,
             'email':this.state.email,
             'password':this.state.password,
             'user_role_id':this.state.role_id
        }
        if(id!='' && id!=null){
            axios.put('api/users/'+id,userObj)
             .then(function(response){
                  if(response.data.status){
                     $this.setState({popup: true});
                     $this.fectchUsers();
                  }
             }).catch(function(error){
                 $this.InvalidValue(error.response.data.errors);
                 return false;
             })
        }else{
            axios.post('api/users',userObj)
             .then(function(response){
                if(response.data.status){
                    $this.setState({popup: true});
                    $this.fectchUsers();
                }
            }).catch(function(error){
                $this.InvalidValue(error.response.data.errors);
                return false;
            })
        }
    }
    handleEditUser(user){
        $this.Clear();
        $this.setState({
                id : user.id,
                name: user.username,
                email: user.email,
                password:user.password,
                role_id:user.user_role_id,
                popup : false,
        })
    }

    handleDeletetUser(id){
        if(confirm('Are you sure to delete ?')){
            axios.delete('api/users/'+id)
            .then(function(response){
                if(response.data.status){
                    $this.setState({popup : true});
                    $this.fectchUsers();
                }
    
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    InvalidValue(error){
      if(error.username!='' && error.username!=null){
           $this.setState({invalid_name :<span className="err_msg alert alert-default">*{error.username}</span>})
      }
      if(error.email!='' && error.email!=null){
          $this.setState({invalid_email :<span className="err_msg alert alert-default">*{error.email}</span>})
     }
     if(error.password!='' && error.password!=null){
          $this.setState({invalid_password :<span className="err_msg alert alert-default">*{error.password}</span>})
     }
     if(error.user_role_id!='' && error.user_role_id!=null){
      $this.setState({invalid_role :<span className="err_msg alert alert-default">*{error.user_role_id}</span>})
     }
  }
  Clear(){
      $this.setState({
            id : '',
            name: '',
            email: '',
            password:'',
            role_id:'',
            invalid_name:<span></span>,
            invalid_email:<span></span>,
            invalid_role:<span></span>,
            invalid_password:<span></span>,
      })
  }
    render(){
      return(
            <div className="container">
               <AdminNavBar/>
                <div hidden={this.state.popup}>
                 <div className="cent">
                    <span className="close glyphicon glyphicon-remove-circle" onClick={this.handleShowPopup}> </span>
                    <div className="panel panel-primary">
                      <div className="panel-heading">Add New Users</div>
                        <div className="panel-body">
                          <form onSubmit={this.handleSaveUser.bind(this)}>
                              <input onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="name" value={this.state.name} placeholder=" Name"/>
                              {$this.state.invalid_name}
                              <input onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="email" value={this.state.email} placeholder="Email"/>
                              {$this.state.invalid_email}
                              <input type="password" onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="password"  placeholder="Password"/>
                              {$this.state.invalid_password}
                              <select onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="role_id" value={this.state.role_id}>
                                   <option value=''>User Roles</option>
                                   {$this.state.roles.map((role,key) =>
                                      <option value={role.id}>{role.role_name}</option>
                                   )}
                              </select>
                              {$this.state.invalid_role}<br/>
                              <input className="btnOK btn btn-primary" type="submit" value="Save"/>
                          </form>
                        </div>
                    </div>
                  </div>
                 </div><br/>
                 
                 <div className="row">
                     <div className="col-md-12">
                          <span className="btn btn-link pull-left">
                               <Link to="/roles">User_Role Management</Link>
                           </span>
                     </div>
                 </div><br/>
                 <div className="row">
                     <div className="col-md-12">
                          <span onClick={this.handleShowPopup} className="btn btn-success glyphicon glyphicon-plus-sign pull-right"> new user</span>
                     </div>
                 </div><br/>
                  <table className="table .table-inverse">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {$this.state.users.map((user,key) =>
                        <tr key={user.id}>
                        <th scope="row">{key+1}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role_name}</td>
                        <td>
                           <span onClick={()=>this.handleEditUser(user)} className="btn btn-info glyphicon glyphicon-pencil"> </span> 
                           <span>&nbsp;&nbsp;&nbsp;</span>
                           <span onClick={()=>this.handleDeletetUser(user.id)} className="btn btn-danger glyphicon glyphicon-trash"> </span>
                        </td>
                        </tr>
                      )}
                    </tbody>
                </table>
            </div>
      )
    }
}