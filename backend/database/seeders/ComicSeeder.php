<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comic;

class ComicSeeder extends Seeder
{
    public function run(): void
    {
        Comic::factory()->count(10)->create();
    }
}
