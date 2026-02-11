<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ComicController extends Controller
{

    /**
     * Público: listar comics
     */
    public function index()
    {
        return response()->json(Comic::all(), 200);
    }

    /**
     * Público: ver un comic
     */
    public function show(Comic $comic)
    {
        return response()->json($comic, 200);
    }

    /**
     * Admin: crear comic
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string|max:255',
            'autor' => 'required|string|max:100',
            'imagen' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'pdf' => 'required|mimes:pdf|max:20480',
        ]);

        $rutaImagen = $request->file('imagen')->store('portadas', 'public');
        $rutaPdf = $request->file('pdf')->store('pdfs', 'public');

        $comic = Comic::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'autor' => $request->autor,
            'imagen' => $rutaImagen,
            'pdf' => $rutaPdf,
        ]);

        return response()->json([
            'message' => 'Comic creado con éxito',
            'comic' => $comic
        ], 201);
    }

    /**
     * Admin: actualizar comic
     */
    public function update(Request $request, Comic $comic)
    {
        $request->validate([
            'nombre' => 'sometimes|filled|string|max:100',
            'descripcion' => 'sometimes|filled|string|max:255',
            'autor' => 'sometimes|filled|string|max:100',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'pdf' => 'nullable|mimes:pdf|max:20480',
        ]);

        $comic->fill($request->only(['nombre', 'descripcion', 'autor']));

        if ($request->hasFile('imagen')) {
            Storage::disk('public')->delete($comic->imagen);
            $comic->imagen = $request->file('imagen')->store('portadas', 'public');
        }

        if ($request->hasFile('pdf')) {
            Storage::disk('public')->delete($comic->pdf);
            $comic->pdf = $request->file('pdf')->store('pdfs', 'public');
        }

        $comic->save();

        return response()->json([
            'message' => 'Comic actualizado con éxito',
            'comic' => $comic
        ], 200);
    }

    /**
     * Admin: eliminar comic
     */
    public function destroy(Comic $comic)
    {
        Storage::disk('public')->delete([$comic->imagen, $comic->pdf]);
        $comic->delete();

        return response()->json([
            'message' => 'Comic eliminado con éxito'
        ], 200);
    }
}
