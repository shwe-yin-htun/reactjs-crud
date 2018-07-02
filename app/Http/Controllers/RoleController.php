<?php

namespace App\Http\Controllers;

use App\UserRoles;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles=UserRoles::all();
        return response()->json(['roles'=>$roles]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
       // $role=new UserRoles();
        $request->validate([
            'role_name'=>'required|unique:user_roles'
        ]);
        $res=UserRoles::insert([
            'role_name'=>$request->role_name,
            'description'=>$request->description  
        ]);
        if($res){
            return response()->json(['status'=>true]);
        }else{
            return response()->json(['status'=>false]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\UserRoles  $userRoles
     * @return \Illuminate\Http\Response
     */
    public function show(UserRoles $userRoles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\UserRoles  $userRoles
     * @return \Illuminate\Http\Response
     */
    public function edit(UserRoles $userRoles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\UserRoles  $userRoles
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {  
        $request->validate([
            'role_name'=>'required'
        ]);
        $uptArr=[
                  'role_name'=>$request->role_name,
                  'description'=>$request->description
               ];

        $res=UserRoles::where('id',$id)->update($uptArr); 

        if($res){
            return response()->json(['status'=>true]);
        }else{
            return response()->json(['status'=>false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\UserRoles  $userRoles
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         UserRoles::destroy($id);
         return response()->json(['status'=>true]);
    }
}
