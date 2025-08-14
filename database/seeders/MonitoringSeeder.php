<?php

namespace Database\Seeders;

use App\Models\Alert;
use App\Models\NetworkDevice;
use App\Models\NetworkMetric;
use App\Models\Server;
use App\Models\ServerMetric;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MonitoringSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create servers with realistic data
        $servers = Server::factory(6)->create([
            'status' => 'online',
        ]);

        // Add one offline server
        $servers->push(Server::factory()->offline()->create([
            'name' => 'backup-server-01',
        ]));

        // Create recent metrics for online servers
        foreach ($servers->where('status', 'online') as $server) {
            ServerMetric::factory(24)->create([
                'server_id' => $server->id,
                'recorded_at' => fn() => now()->subHours(random_int(0, 23))->subMinutes(random_int(0, 59)),
            ]);
        }

        // Create network devices
        $devices = NetworkDevice::factory(8)->up()->create();
        
        // Add some down devices
        NetworkDevice::factory(2)->down()->create();

        // Create recent metrics for up devices
        foreach ($devices as $device) {
            NetworkMetric::factory(24)->create([
                'network_device_id' => $device->id,
                'recorded_at' => fn() => now()->subHours(random_int(0, 23))->subMinutes(random_int(0, 59)),
            ]);
        }

        // Create some recent alerts
        Alert::factory(5)->unresolved()->create();
        Alert::factory(10)->create();
        
        // Create critical alerts for immediate attention
        Alert::factory(2)->critical()->unresolved()->create();
    }
}