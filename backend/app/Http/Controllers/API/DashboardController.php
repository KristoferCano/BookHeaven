<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Libro;
use App\Models\Comic;
use App\Models\Manga;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            // Cards
            'libros' => Libro::count(),
            'comics' => Comic::count(),
            'mangas' => Manga::count(),
            'usuarios' => User::count(),
            'total_contenido' =>
                Libro::count() + Comic::count() + Manga::count(),

            // Gráfica distribución
            'distribucion' => [
                'libros' => Libro::count(),
                'comics' => Comic::count(),
                'mangas' => Manga::count(),
            ],

            // Últimos agregados
            'ultimos' => [
                'libros' => Libro::latest()->take(5)->get(),
                'comics' => Comic::latest()->take(5)->get(),
                'mangas' => Manga::latest()->take(5)->get(),
            ],
        ]);
    }
}
