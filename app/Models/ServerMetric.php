<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ServerMetric
 *
 * @property int $id
 * @property int $server_id
 * @property float $cpu_usage
 * @property float $memory_usage
 * @property float $memory_total
 * @property float $disk_usage
 * @property float $disk_total
 * @property int $running_processes
 * @property float $load_average
 * @property \Illuminate\Support\Carbon $recorded_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Server $server
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric query()
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereCpuUsage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereDiskTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereDiskUsage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereLoadAverage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereMemoryTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereMemoryUsage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereRecordedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereRunningProcesses($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereServerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServerMetric whereUpdatedAt($value)
 * @method static \Database\Factories\ServerMetricFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ServerMetric extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'server_id',
        'cpu_usage',
        'memory_usage',
        'memory_total',
        'disk_usage',
        'disk_total',
        'running_processes',
        'load_average',
        'recorded_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'cpu_usage' => 'decimal:2',
        'memory_usage' => 'decimal:2',
        'memory_total' => 'decimal:2',
        'disk_usage' => 'decimal:2',
        'disk_total' => 'decimal:2',
        'load_average' => 'decimal:2',
        'recorded_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the server that owns the metric.
     */
    public function server(): BelongsTo
    {
        return $this->belongsTo(Server::class);
    }
}