<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use App\Models\NetworkDevice;
use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the monitoring dashboard.
     */
    public function index()
    {
        // Get server statistics
        $servers = Server::with(['latest_metric'])->get();
        $serverStats = [
            'total' => $servers->count(),
            'online' => $servers->where('status', 'online')->count(),
            'offline' => $servers->where('status', 'offline')->count(),
            'maintenance' => $servers->where('status', 'maintenance')->count(),
        ];

        // Get network device statistics
        $devices = NetworkDevice::with(['latest_metric'])->get();
        $networkStats = [
            'total' => $devices->count(),
            'up' => $devices->where('status', 'up')->count(),
            'down' => $devices->where('status', 'down')->count(),
            'unknown' => $devices->where('status', 'unknown')->count(),
        ];

        // Get recent alerts
        $recentAlerts = Alert::with(['alertable'])
            ->unresolved()
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Get critical alerts count
        $criticalAlertsCount = Alert::unresolved()->critical()->count();

        return Inertia::render('welcome', [
            'servers' => $servers,
            'networkDevices' => $devices,
            'serverStats' => $serverStats,
            'networkStats' => $networkStats,
            'recentAlerts' => $recentAlerts,
            'criticalAlertsCount' => $criticalAlertsCount,
        ]);
    }

    /**
     * Get real-time monitoring data via AJAX.
     */
    public function store(Request $request)
    {
        // This would typically update metrics in a real application
        // For demo purposes, we'll just refresh the data
        return $this->index();
    }
}