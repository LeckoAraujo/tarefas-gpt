<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogAtividade extends Model
{
    use HasFactory;

    protected $table = 'log_atividades';

    protected $fillable = [
        'atividade_id',
        'user_id',
        'data_conclusao',
        'pontos_recebidos',
        'observacao',
    ];

    public function atividade()
    {
        return $this->belongsTo(Atividade::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
