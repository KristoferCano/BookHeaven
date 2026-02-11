<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuario de prueba
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'kristofercanotaborda@gmail.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin'
        ]);

        // Libros reales
        $this->call([
            LibroSeeder::class,
            ComicSeeder::class,
            MangaSeeder::class,
        ]);
    }
}
