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
        Schema::create('network_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('network_device_id')->constrained()->onDelete('cascade');
            $table->decimal('latency', 8, 2);
            $table->decimal('packet_loss', 5, 2)->default(0);
            $table->bigInteger('bytes_in')->default(0);
            $table->bigInteger('bytes_out')->default(0);
            $table->integer('packets_in')->default(0);
            $table->integer('packets_out')->default(0);
            $table->timestamp('recorded_at');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['network_device_id', 'recorded_at']);
            $table->index('recorded_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('network_metrics');
    }
};