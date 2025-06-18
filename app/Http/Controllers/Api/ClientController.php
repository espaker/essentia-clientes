<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();

        $clients->transform(function ($client) {
            if ($client->avatar && Storage::disk('private')->exists($client->avatar)) {
                $image = Storage::disk('private')->get($client->avatar);
                $base64 = base64_encode($image);
                $mime = Storage::disk('private')->mimeType($client->avatar);
                $client->avatar = "data:$mime;base64,$base64";
            } else {
                $client->avatar = null;
            }
            return $client;
        });

        return $clients;
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name'   => 'required|string',
            'email'  => 'required|email|unique:clients',
            'phone'  => 'required|string',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('clients', 'private');
        }

        $client = Client::create($data);

        if ($client->avatar && Storage::disk('private')->exists($client->avatar)) {
            $image = Storage::disk('private')->get($client->avatar);
            $mime = Storage::disk('private')->mimeType($client->avatar);
            $client->avatar = "data:$mime;base64," . base64_encode($image);
        } else {
            $client->avatar = null;
        }

        return $client;
    }


    public function show(string $id)
    {
        $client = Client::findOrFail($id);

        if ($client->avatar && Storage::disk('private')->exists($client->avatar)) {
            $image = Storage::disk('private')->get($client->avatar);
            $base64 = base64_encode($image);
            // Pegando o mime type do arquivo
            $mime = Storage::disk('private')->mimeType($client->avatar);

            // Adiciona no objeto uma propriedade com o conteúdo da imagem codificado em base64
            $client->avatar = "data:$mime;base64,$base64";
        } else {
            $client->avatar = null;
        }

        return $client;
    }


    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'name'   => 'required|string',
            'email' => [
                'required',
                'email',
                Rule::unique('clients')->ignore($client->id, 'id'),
            ],
            'phone'  => 'required|string',
            'avatar'  => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            if ($client->avatar) {
                Storage::disk('private')->delete($client->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('clients', 'private');
        }

        $client->update($data);

        // Convertendo avatar para base64 para retorno consistente
        if ($client->avatar && Storage::disk('private')->exists($client->avatar)) {
            $image = Storage::disk('private')->get($client->avatar);
            $mime = Storage::disk('private')->mimeType($client->avatar);
            $client->avatar = "data:$mime;base64," . base64_encode($image);
        } else {
            $client->avatar = null;
        }

        return $client;
    }


    public function destroy(Client $client)
    {
        if ($client->avatar) {
            Storage::disk('private')->delete($client->avatar);
        }

        $client->delete();
        return response()->noContent();
    }
}
