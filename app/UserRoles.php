<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class UserRoles extends Model
{
    protected $table="user_roles";
    protected $fillable=['role_name','description'];

}
