<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NetworkDevice>
 */
class NetworkDeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->words(2, true) . '-device',
            'ip_address' => $this->faker->ipv4(),
            'mac_address' => $this->faker->macAddress(),
            'device_type' => $this->faker->randomElement(['router', 'switch', 'firewall', 'server', 'workstation', 'other']),
            'status' => $this->faker->randomElement(['up', 'down', 'unknown']),
            'last_latency' => $this->faker->randomFloat(2, 0.1, 100),
            'last_seen' => $this->faker->dateTimeBetween('-1 day', 'now'),
            'monitoring_enabled' => $this->faker->boolean(90),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the device is up.
     */
    public function up(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'up',
            'last_seen' => now(),
        ]);
    }

    /**
     * Indicate that the device is down.
     */
    public function down(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'down',
            'last_latency' => null,
        ]);
    }
}