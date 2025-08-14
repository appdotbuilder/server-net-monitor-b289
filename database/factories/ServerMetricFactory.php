<?php

namespace Database\Factories;

use App\Models\Server;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServerMetric>
 */
class ServerMetricFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'server_id' => Server::factory(),
            'cpu_usage' => $this->faker->randomFloat(2, 0, 100),
            'memory_usage' => $this->faker->randomFloat(2, 0, 100),
            'memory_total' => $this->faker->randomFloat(2, 4, 64),
            'disk_usage' => $this->faker->randomFloat(2, 0, 100),
            'disk_total' => $this->faker->randomFloat(2, 50, 2000),
            'running_processes' => $this->faker->numberBetween(50, 300),
            'load_average' => $this->faker->randomFloat(2, 0, 4),
            'recorded_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
        ];
    }
}