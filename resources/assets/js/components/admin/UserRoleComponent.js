import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AdminNavBar from './AdminNavBar';

var $this;
export default class UserRoleComponent extends Component {
    constructor(props){
        super(props);
        $this=this;
        this.state={
            roles:[],
            id : '',
            name: '',
            description: '',
            invalid_name:<span></span>,
            popup : true
        }
       
    }

    componentDidMount(){
         $this.fectchRoles();
    }

    fectchRoles(){
        axios.get('api/roles')
        .then(function (response) {
            $this.setState({
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

    handleSaveRole(event){
        event.preventDefault();
        var id = this.state.id;
        var userObj={
             'role_name':this.state.name,
             'description':this.state.description,
        }
        if(id!='' && id!=null){
            axios.put('api/roles/'+id,userObj)
             .then(function(response){
                  if(response.status){
                     $this.setState({popup: true});
                     $this.fectchRoles();
                  }
             }).catch(function(error){
                 $this.InvalidValue(error.response.data.errors);
                 return false;
             })
        }else{
            axios.post('api/roles',userObj)
             .then(function(response){
                if(response.status){
                     $this.setState({popup: true});
                     $this.fectchRoles();
                }
            }).catch(function(error){
                $this.InvalidValue(error.response.data.errors);
                return false;
            })
        }
    }

    handleEditRole(role){
      $this.Clear();
       $this.setState({
            id : role.id,
            name: role.role_name,
            description: role.description,
            popup : false,
       })
    }

    handleDeletetRole(id){
        if(confirm('Are you sure to delete ?')){
            axios.delete('api/roles/'+id)
            .then(function(response){
                    $this.setState({popup : true});
                    $this.fectchRoles();
                
            }).catch(function(error){
                console.log(error);
            })
        }
    }
    InvalidValue(error){
      if(error.role_name!='' && error.role_name!=null){
           $this.setState({invalid_name :<span className="err_msg alert alert-default">*{error.role_name}</span>})
      }
    }

    Clear(){
        $this.setState({
            id : '',
            name: '',
            description: '',
            invalid_name:<span></span>,
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
                      <div className="panel-heading">Add New Role</div>
                        <div className="panel-body">
                          <form onSubmit={this.handleSaveRole.bind(this)}>
                              <input onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="name" value={this.state.name} placeholder="Role's Name"/>
                              {$this.state.invalid_name}
                              <textarea onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="description" value={this.state.description} placeholder="Description"></textarea>
                              <input className="btnOK btn btn-primary" type="submit" value="Save"/>
                          </form>
                        </div>
                    </div>
                  </div>
                 </div><br/>
                 <div className="row">
                     <div className="col-md-12">
                          <span onClick={this.handleShowPopup} className="btn btn-success glyphicon glyphicon-plus-sign pull-right"> new role</span>
                     </div>
                 </div><br/>
                  <table className="table .table-inverse">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role Name</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {$this.state.roles.map((role,key) =>
                        <tr key={role.id}>
                        <th scope="row">{key+1}</th>
                        <td>{role.role_name}</td>
                        <td>{role.description}</td>
                        <td>
                           <span onClick={()=>this.handleEditRole(role)} className="btn btn-info glyphicon glyphicon-pencil"> </span> 
                           <span>&nbsp;&nbsp;&nbsp;</span>
                           <span onClick={()=>this.handleDeletetRole(role.id)} className="btn btn-danger glyphicon glyphicon-trash"> </span>
                        </td>
                        </tr>
                      )}
                    </tbody>
                </table> 
            </div>
      )
    }
}