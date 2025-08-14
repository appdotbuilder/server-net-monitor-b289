<?php

namespace Tests\Feature;

use App\Models\Alert;
use App\Models\NetworkDevice;
use App\Models\NetworkMetric;
use App\Models\Server;
use App\Models\ServerMetric;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MonitoringTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_displays_monitoring_overview(): void
    {
        // Create test data
        $servers = Server::factory(3)->create();
        $devices = NetworkDevice::factory(2)->create();
        $alerts = Alert::factory(5)->create();

        // Visit the dashboard
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('servers')
            ->has('networkDevices')
            ->has('recentAlerts')
            ->has('serverStats')
            ->has('networkStats')
        );
    }

    public function test_servers_index_page(): void
    {
        Server::factory(5)->create();

        $response = $this->get('/servers');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('servers/index')
            ->has('servers')
        );
    }

    public function test_network_devices_index_page(): void
    {
        NetworkDevice::factory(3)->create();

        $response = $this->get('/network-devices');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('network-devices/index')
            ->has('devices')
        );
    }

    public function test_alerts_index_page(): void
    {
        Alert::factory(10)->create();

        $response = $this->get('/alerts');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('alerts/index')
            ->has('alerts.data')
        );
    }

    public function test_can_resolve_alert(): void
    {
        $alert = Alert::factory()->unresolved()->create();

        $response = $this->put("/alerts/{$alert->id}");

        $response->assertRedirect();
        
        $alert->refresh();
        $this->assertTrue($alert->is_resolved);
        $this->assertNotNull($alert->resolved_at);
    }

    public function test_dashboard_refresh_endpoint(): void
    {
        Server::factory(2)->create();
        NetworkDevice::factory(2)->create();

        $response = $this->post('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('servers')
            ->has('networkDevices')
        );
    }

    public function test_server_with_metrics_and_alerts(): void
    {
        $server = Server::factory()->create();
        
        ServerMetric::factory(3)->create([
            'server_id' => $server->id,
        ]);
        
        Alert::factory(2)->create([
            'alertable_type' => Server::class,
            'alertable_id' => $server->id,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('servers')
            ->has('networkDevices')
            ->has('recentAlerts')
            ->has('serverStats')
            ->has('networkStats')
        );
    }
}