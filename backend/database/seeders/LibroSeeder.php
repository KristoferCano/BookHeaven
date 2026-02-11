<?php

namespace Database\Seeders;

use App\Models\Libro;
use Illuminate\Database\Seeder;

class LibroSeeder extends Seeder
{
    public function run(): void
    {
        $libros = [
            [
                'nombre' => 'Cien años de soledad',
                'descripcion' => 'La historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo.',
                'autor' => 'Gabriel García Márquez',
                'imagen' => 'libros/image.png',
                'pdf' => 'libros/cien_anos_soledad.pdf',
            ],
            [
                'nombre' => 'Don Quijote de la Mancha',
                'descripcion' => 'Un hidalgo enloquece leyendo libros de caballería y decide convertirse en caballero andante.',
                'autor' => 'Miguel de Cervantes Saavedra',
                'imagen' => 'libros/kurumi.png',
                'pdf' => 'libros/don_quijote.pdf',
            ],
            [
                'nombre' => '1984',
                'descripcion' => 'Una sociedad vigilada por el Gran Hermano donde el pensamiento libre está prohibido.',
                'autor' => 'George Orwell',
                'imagen' => 'libros/1984.jpg',
                'pdf' => 'libros/1984.pdf',
            ],
            [
                'nombre' => 'El Principito',
                'descripcion' => 'Un relato poético sobre la amistad, el amor y el sentido de la vida.',
                'autor' => 'Antoine de Saint-Exupéry',
                'imagen' => 'libros/el_principito.jpg',
                'pdf' => 'libros/el_principito.pdf',
            ],
            [
                'nombre' => 'Crimen y castigo',
                'descripcion' => 'La lucha psicológica de un joven que comete un asesinato y enfrenta su culpa.',
                'autor' => 'Fiódor Dostoyevski',
                'imagen' => 'libros/crimen_castigo.jpg',
                'pdf' => 'libros/crimen_castigo.pdf',
            ],
            [
                'nombre' => 'La metamorfosis',
                'descripcion' => 'Un hombre despierta convertido en un insecto gigante, cambiando su vida y la de su familia.',
                'autor' => 'Franz Kafka',
                'imagen' => 'libros/la_metamorfosis.jpg',
                'pdf' => 'libros/la_metamorfosis.pdf',
            ],
            [
                'nombre' => 'Orgullo y prejuicio',
                'descripcion' => 'Una historia de amor y diferencias sociales en la Inglaterra del siglo XIX.',
                'autor' => 'Jane Austen',
                'imagen' => 'libros/orgullo_prejuicio.jpg',
                'pdf' => 'libros/orgullo_prejuicio.pdf',
            ],
            [
                'nombre' => 'Fahrenheit 451',
                'descripcion' => 'En un futuro donde los libros están prohibidos, los bomberos se encargan de quemarlos.',
                'autor' => 'Ray Bradbury',
                'imagen' => 'libros/fahrenheit_451.jpg',
                'pdf' => 'libros/fahrenheit_451.pdf',
            ],
            [
                'nombre' => 'El señor de los anillos: La comunidad del anillo',
                'descripcion' => 'Un hobbit emprende una peligrosa misión para destruir un anillo poderoso.',
                'autor' => 'J. R. R. Tolkien',
                'imagen' => 'libros/comunidad_anillo.jpg',
                'pdf' => 'libros/comunidad_anillo.pdf',
            ],
            [
                'nombre' => 'Harry Potter y la piedra filosofal',
                'descripcion' => 'Un niño descubre que es mago y asiste a una escuela de magia.',
                'autor' => 'J. K. Rowling',
                'imagen' => 'libros/harry_potter_1.jpg',
                'pdf' => 'libros/harry_potter_1.pdf',
            ],
        ];

        foreach ($libros as $libro) {
            Libro::create($libro);
        }
    }
}
