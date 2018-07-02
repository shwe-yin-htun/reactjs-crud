import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AdminNavBar from './AdminNavBar';

var $this;
export default class ProductComponent extends Component {
    constructor(props){
        super(props);
        $this=this;
        this.state={
            products:[],
            errs:{},
            id:'',
            name:'',
            price:'',
            quantity:'',
            description:'',
            invalid_name:<span></span>,
            invalid_price:<span></span>,
            invalid_quantity:<span></span>,
            popup : true
        }
        this.handleShowPopup=this.handleShowPopup.bind(this);
        this.handleEditProduct=this.handleEditProduct.bind(this);
    }

    componentDidMount(){
         $this.fectchProduct();
    }

    fectchProduct(){
        axios.get('api/products')
        .then(function (response) {
            $this.setState({
              products:response.data.products
            })
        }).catch(function (error) {
          console.log(error);
      });
    }

    handleShowPopup(){
            $this.Clear();
            this.setState({
                  popup: !this.state.popup
            })
    }
   
    handleSaveProduct(event){
        event.preventDefault();
        var id=this.state.id;
        var Obj_product ={
            'name':this.state.name,
            'price':this.state.price,
            'quantity':this.state.quantity,
            'description':this.state.description,
        } 

        if(id!=null && id!=''){
          axios.put('api/products/'+id,Obj_product)
            .then(function (response) {
                  if(response.data.status){
                        $this.setState({
                            popup: true,
                        })
                        $this.fectchProduct();
                  }else{
                         alert("Something Went Wrong!");
                         return false;
                  }
                  
              }).catch(function (error) {
                $this.InvalidValue(error.response.data.errors)
          });
        }else{
              axios.post('api/products',Obj_product)
              .then(function (response) {
                    if(response.data.status){
                        $this.setState({
                            popup: true,
                        })
                        $this.fectchProduct();
                    }else{
                        alert("Something Went Wrong!");
                        return false;
                    }
              }).catch(function (error) {
                  $this.InvalidValue(error.response.data.errors);
             });
        }
    }

    handleDeletetProduct(id){
        if(confirm('Are you sure to delete ?')){
            axios.delete('api/products/'+id)
            .then(function (response) {
                if(response.data.status){
                    $this.fectchProduct();
                }else{
                    alert('Something Went Wrong!');
                    return false;
                }
            }).catch(function (error) {
                 console.log(error);
            });
        }
    }

    handleOnChanges(event){
        $this.setState({
                [event.target.name] :event.target.value
        });
    }
    
    handleEditProduct(item){
        $this.Clear();
        this.setState({
               id: item.id,
               name: item.name,
               price: item.price,
               quantity: item.quantity,
               description: item.description,
               popup : !this.state.popup
        })
    }

    InvalidValue(error){
        if(error.name!='' && error.name!=null){
             $this.setState({invalid_name :<span className="err_msg alert alert-default">*{error.name}</span>})
        }
        if(error.quantity!='' && error.quantity!=null){
            $this.setState({invalid_quantity :<span className="err_msg alert alert-default">*{error.quantity}</span>})
       }
       if(error.price!='' && error.price!=null){
            $this.setState({invalid_price :<span className="err_msg alert alert-default">*{error.price}</span>})
       }
    }

    Clear(){
        $this.setState({
            id:'',
            name:'',
            price:'',
            quantity:'',
            description:'',
            invalid_name:<span></span>,
            invalid_price:<span></span>,
            invalid_quantity:<span></span>,
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
                      <div className="panel-heading">Add new Product</div>
                        <div className="panel-body">
                          <form onSubmit={this.handleSaveProduct.bind(this)}>
                              <input onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="name" value={this.state.name} placeholder="Product Name"/>
                              {$this.state.invalid_name}
                              <input onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="price" value={this.state.price} placeholder="Price"/>
                              {$this.state.invalid_price}
                              <input onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="quantity" value={this.state.quantity} placeholder="Quantity"/>
                              {$this.state.invalid_quantity}
                              <textarea onChange={this.handleOnChanges.bind(this)} className="inputAdd form-control" name="description" value={this.state.description} placeholder="Description"></textarea>
                              <input className="btnOK btn btn-primary" type="submit" value="Save"/>
                          </form>
                        </div>
                    </div>
                  </div>
                 </div><br/>
                 <div className="row">
                     <div className="col-md-12">
                          <span onClick={this.handleShowPopup} className="btn btn-success glyphicon glyphicon-plus-sign pull-right"> new product</span>
                     </div>
                 </div><br/>
                  <table className="table .table-inverse">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {$this.state.products.map((item,key) =>
                        <tr key={item.id}>
                        <th scope="row">{key+1}</th>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.description}</td>
                        <td>
                           <span onClick={()=>this.handleEditProduct(item)} className="btn btn-info glyphicon glyphicon-pencil"> </span> 
                           <span>&nbsp;&nbsp;&nbsp;</span>
                           <span onClick={()=>this.handleDeletetProduct(item.id)} className="btn btn-danger glyphicon glyphicon-trash"> </span>
                        </td>
                        </tr>
                      )}
                    </tbody>
                </table>
            </div>
      )
    }
}