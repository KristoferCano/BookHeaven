<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Manga;

class MangaSeeder extends Seeder
{
    public function run(): void
    {
        Manga::factory()->count(10)->create();
    }
}
