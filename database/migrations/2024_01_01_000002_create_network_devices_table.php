<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('network_devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('ip_address');
            $table->string('mac_address')->nullable();
            $table->enum('device_type', ['router', 'switch', 'firewall', 'server', 'workstation', 'other'])->default('other');
            $table->enum('status', ['up', 'down', 'unknown'])->default('unknown');
            $table->decimal('last_latency', 8, 2)->nullable();
            $table->timestamp('last_seen')->nullable();
            $table->boolean('monitoring_enabled')->default(true);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('ip_address');
            $table->index('status');
            $table->index(['status', 'monitoring_enabled']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('network_devices');
    }
};