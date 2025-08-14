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
        Schema::create('server_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('server_id')->constrained()->onDelete('cascade');
            $table->decimal('cpu_usage', 5, 2);
            $table->decimal('memory_usage', 5, 2);
            $table->decimal('memory_total', 10, 2);
            $table->decimal('disk_usage', 5, 2);
            $table->decimal('disk_total', 10, 2);
            $table->integer('running_processes')->default(0);
            $table->decimal('load_average', 8, 2)->default(0);
            $table->timestamp('recorded_at');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['server_id', 'recorded_at']);
            $table->index('recorded_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('server_metrics');
    }
};