<?php

namespace App\Http\Controllers;

use App\User;
use App\UserRoles;
use Illuminate\Http\Request;
use App\Http\Requests\UserValidation;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $role= new UserRoles();
        $users = $role->join('users', 'user_roles.id', '=', 'users.user_role_id')
        ->get();
        $roles=$role->all();
        return response()->json(['users'=>$users,'roles'=>$roles]);
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
    public function store(UserValidation $request)
    {
        $res=User::insert([
              'username'=>$request->username,
              'email'=>$request->email,
              'password'=>bcrypt($request->password),
              'user_role_id'=>$request->user_role_id
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
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'username'=>'required',
            'email'=>'required|email',
            'user_role_id'=>'required',
        ]);

        $uptUser=[
            'username'=>$request->username,
            'email'=>$request->email,
            'password'=> bcrypt($request->password),
            'user_role_id'=>$request->user_role_id
        ];
        
        $res=$user->update($uptUser);
        if($res){
            return response()->json(['status'=>true]);
        }else{
            return response()->json(['status'=>false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return  response()->json(['status'=>true]);
    }
}
