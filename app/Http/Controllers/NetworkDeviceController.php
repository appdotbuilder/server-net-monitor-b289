<?php

namespace App\Http\Controllers;

use App\Models\NetworkDevice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NetworkDeviceController extends Controller
{
    /**
     * Display a listing of the network devices.
     */
    public function index()
    {
        $devices = NetworkDevice::with(['latest_metric', 'alerts' => function ($query) {
            $query->unresolved()->latest();
        }])->latest()->get();

        return Inertia::render('network-devices/index', [
            'devices' => $devices,
        ]);
    }

    /**
     * Display the specified network device.
     */
    public function show(NetworkDevice $networkDevice)
    {
        $networkDevice->load([
            'metrics' => function ($query) {
                $query->orderBy('recorded_at', 'desc')->limit(100);
            },
            'alerts' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('network-devices/show', [
            'device' => $networkDevice,
        ]);
    }
}