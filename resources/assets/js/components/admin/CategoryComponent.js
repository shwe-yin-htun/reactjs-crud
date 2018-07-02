import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AdminNavBar from './AdminNavBar';

var $this;
export default class CategoryComponent extends Component {
    constructor(props){
        super(props);
        $this=this;
        this.state={
            cateogries:[],
            id : '',
            name: '',
            description: '',
            MainCategory :[],
            invalid_name:<span></span>,
            popup : true
        }
       
    }

    componentDidMount(){
         $this.fectchCategories();
    }

    fectchCategories(){
        axios.get('api/categories')
        .then(function (response) {
            $this.setState({
                cateogries:response.data.categories
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

    handleSaveCategory(event){
        event.preventDefault();
        var id = this.state.id;
        var userObj={
             'category_name':this.state.name,
             'description':this.state.description,
        }
        if(id!='' && id!=null){
            axios.put('api/categories/'+id,userObj)
             .then(function(response){
                  if(response.data.status){
                     $this.setState({popup: true});
                     $this.fectchCategories();
                  }
             }).catch(function(error){
                 $this.InvalidValue(error.response.data.errors);
                 return false;
             })
        }else{
            axios.post('api/categories',userObj)
             .then(function(response){
                if(response.data.status){
                     $this.setState({popup: true});
                     $this.fectchCategories();
                }
            }).catch(function(error){
                console.log(error);
                $this.InvalidValue(error.response.data.errors);
                return false;
            })
        }
    }

    handleEditCategory(category){
       $this.Clear();
       $this.setState({
            id : category.id,
            name: category.category_name,
            description: category.description,
            popup : false,
       })
    }

    handleDeletetCategory(id){
        if(confirm('Are you sure to delete ?')){
            axios.delete('api/categories/'+id)
            .then(function(response){
                    $this.setState({popup : true});
                    $this.fectchCategories();
                
            }).catch(function(error){
                console.log(error);
            })
        }
    }
    InvalidValue(error){
      if(error.cateogry_name!='' && error.cateogry_name!=null){
           $this.setState({invalid_name :<span className="err_msg alert alert-default">*{error.cateogry_name}</span>})
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

    MainCategory(){
       var catOption=[];
       var catArr=[];
           catArr=$this.state.categories;
           console.log(catArr);
        //    catArr.forEach(element => {
               
        //    });
    //    for(let i=0; i<sizeOf(catArr); i++){
    //         <select onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="role_id" value={this.state.role_id}>
    //         <option>--Main Categories--</option>
                   
    //         </select>
    //     }
    
    }
    render(){
      return(
            <div className="container">
               <AdminNavBar/>
                 <div hidden={this.state.popup}>
                 <div className="cent">
                    <span className="close glyphicon glyphicon-remove-circle" onClick={this.handleShowPopup}> </span>
                    <div className="panel panel-primary">
                      <div className="panel-heading">Add New Category</div>
                        <div className="panel-body">
                          <form onSubmit={this.handleSaveCategory.bind(this)}>  
                             <select> 
                                <option></option>                              
                                {$this.state.MainCategory}
                             </select>
                              <input onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="name" value={this.state.name} placeholder="Category's Name"/>
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
                          <span onClick={this.handleShowPopup} className="btn btn-success glyphicon glyphicon-plus-sign pull-right"> new category</span>
                     </div>
                 </div><br/>
                  <table className="table .table-inverse">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Main Categories</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {$this.state.cateogries.map((category,key) =>
                        <tr key={category.id}>
                        <th scope="row">{key+1}</th>
                        <td>{category.category_name}</td>
                        <td>{category.description}</td>
                        <td>
                           <span onClick={()=>this.handleEditCategory(category)} className="btn btn-info glyphicon glyphicon-pencil"> </span> 
                           <span>&nbsp;&nbsp;&nbsp;</span>
                           <span onClick={()=>this.handleDeletetCategory(category.id)} className="btn btn-danger glyphicon glyphicon-trash"> </span>
                        </td>
                        </tr>
                      )}
                    </tbody>
                </table> 
            </div>
      )
    }
}