<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServerController extends Controller
{
    /**
     * Display a listing of the servers.
     */
    public function index()
    {
        $servers = Server::with(['latest_metric', 'alerts' => function ($query) {
            $query->unresolved()->latest();
        }])->latest()->get();

        return Inertia::render('servers/index', [
            'servers' => $servers,
        ]);
    }

    /**
     * Display the specified server.
     */
    public function show(Server $server)
    {
        $server->load([
            'metrics' => function ($query) {
                $query->orderBy('recorded_at', 'desc')->limit(100);
            },
            'alerts' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('servers/show', [
            'server' => $server,
        ]);
    }
}