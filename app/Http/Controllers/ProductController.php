<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Requests\ProductValidation;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    public function index()
    {
        $products=Product::all();
        return response()->json(['products'=>$products]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
     
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductValidation $request)
    {
        $res=Product::insert([
                                'name'=>$request->name,
                                'price'=>$request->price,
                                'quantity'=>$request->quantity,
                                'description'=>$request->description,
                            ]);
        
        if(!$res){
            return  response()->json(['status'=>false]);
        }
        return  response()->json(['status'=>true,'msgResult'=>'Product inserted!!']);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductValidation $request, Product $product)
    {
        $updateArr=[
                    'name'=>$request->name,
                    'price'=>$request->price,
                    'quantity'=>$request->quantity,
                    'description'=>$request->description
                  ];
                    
        $res=$product->update($updateArr);
        
        if(!$res){
            return  response()->json(['status'=>false]);
        }
        return  response()->json(['status'=>true,'msgResult'=>'Product updated!!']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
       $product->delete();
       return  response()->json(['status'=>true,'msgResult'=>'Product deleted!!']);
    }
}
