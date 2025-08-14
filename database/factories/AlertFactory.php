<?php

namespace Database\Factories;

use App\Models\Server;
use App\Models\NetworkDevice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alert>
 */
class AlertFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $alertTypes = [
            'cpu_high' => ['title' => 'High CPU Usage', 'message' => 'CPU usage exceeded threshold'],
            'memory_high' => ['title' => 'High Memory Usage', 'message' => 'Memory usage exceeded threshold'],
            'disk_full' => ['title' => 'Disk Space Critical', 'message' => 'Disk space is running low'],
            'server_down' => ['title' => 'Server Offline', 'message' => 'Server is not responding'],
            'device_down' => ['title' => 'Device Offline', 'message' => 'Network device is not responding'],
            'high_latency' => ['title' => 'High Network Latency', 'message' => 'Network latency exceeded threshold'],
        ];

        $type = $this->faker->randomElement(array_keys($alertTypes));
        $alertInfo = $alertTypes[$type];

        // Choose random alertable model
        $alertableModel = $this->faker->randomElement([Server::class, NetworkDevice::class]);
        
        return [
            'alertable_type' => $alertableModel,
            'alertable_id' => $alertableModel::factory(),
            'type' => $type,
            'severity' => $this->faker->randomElement(['info', 'warning', 'critical']),
            'title' => $alertInfo['title'],
            'message' => $alertInfo['message'],
            'metadata' => $this->faker->optional()->randomElements([
                'threshold' => $this->faker->numberBetween(70, 95),
                'current_value' => $this->faker->numberBetween(80, 100),
                'check_time' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
            ]),
            'is_resolved' => $this->faker->boolean(30),
            'resolved_at' => $this->faker->optional(0.3)->dateTimeBetween('-1 day', 'now'),
        ];
    }

    /**
     * Indicate that the alert is unresolved.
     */
    public function unresolved(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_resolved' => false,
            'resolved_at' => null,
        ]);
    }

    /**
     * Indicate that the alert is critical.
     */
    public function critical(): static
    {
        return $this->state(fn (array $attributes) => [
            'severity' => 'critical',
        ]);
    }
}