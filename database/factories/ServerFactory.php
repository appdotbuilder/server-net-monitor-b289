<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Server>
 */
class ServerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->words(2, true) . '-server',
            'ip_address' => $this->faker->ipv4(),
            'hostname' => $this->faker->domainWord() . '.local',
            'type' => $this->faker->randomElement(['linux', 'windows']),
            'status' => $this->faker->randomElement(['online', 'offline', 'maintenance']),
            'monitoring_enabled' => $this->faker->boolean(90),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the server is online.
     */
    public function online(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'online',
        ]);
    }

    /**
     * Indicate that the server is offline.
     */
    public function offline(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'offline',
        ]);
    }
}