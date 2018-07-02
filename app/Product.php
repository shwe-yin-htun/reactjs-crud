<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $timestamps=true;
    protected $fillable = [
        'name', 'price', 'quantity','description'
    ];
}
