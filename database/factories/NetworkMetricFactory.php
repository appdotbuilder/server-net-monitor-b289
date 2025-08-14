<?php

namespace Database\Factories;

use App\Models\NetworkDevice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NetworkMetric>
 */
class NetworkMetricFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'network_device_id' => NetworkDevice::factory(),
            'latency' => $this->faker->randomFloat(2, 0.1, 50),
            'packet_loss' => $this->faker->randomFloat(2, 0, 5),
            'bytes_in' => $this->faker->numberBetween(1000000, 100000000),
            'bytes_out' => $this->faker->numberBetween(1000000, 100000000),
            'packets_in' => $this->faker->numberBetween(1000, 10000),
            'packets_out' => $this->faker->numberBetween(1000, 10000),
            'recorded_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
        ];
    }
}