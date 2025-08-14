<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlertController extends Controller
{
    /**
     * Display a listing of the alerts.
     */
    public function index()
    {
        $alerts = Alert::with(['alertable'])
            ->latest()
            ->paginate(20);

        return Inertia::render('alerts/index', [
            'alerts' => $alerts,
        ]);
    }

    /**
     * Mark an alert as resolved.
     */
    public function update(Request $request, Alert $alert)
    {
        $alert->update([
            'is_resolved' => true,
            'resolved_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Alert resolved successfully.');
    }
}