<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conquista extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descricao',
        'pontos_necessarios',
    ];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'usuarios_conquistas')
                    ->withPivot('data_desbloqueio')
                    ->withTimestamps();
    }
}
