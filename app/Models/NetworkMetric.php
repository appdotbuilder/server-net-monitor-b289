<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\NetworkMetric
 *
 * @property int $id
 * @property int $network_device_id
 * @property float $latency
 * @property float $packet_loss
 * @property int $bytes_in
 * @property int $bytes_out
 * @property int $packets_in
 * @property int $packets_out
 * @property \Illuminate\Support\Carbon $recorded_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\NetworkDevice $networkDevice
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric query()
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereBytesIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereBytesOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereLatency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereNetworkDeviceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric wherePacketLoss($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric wherePacketsIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric wherePacketsOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereRecordedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkMetric whereUpdatedAt($value)
 * @method static \Database\Factories\NetworkMetricFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class NetworkMetric extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'network_device_id',
        'latency',
        'packet_loss',
        'bytes_in',
        'bytes_out',
        'packets_in',
        'packets_out',
        'recorded_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latency' => 'decimal:2',
        'packet_loss' => 'decimal:2',
        'recorded_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the network device that owns the metric.
     */
    public function networkDevice(): BelongsTo
    {
        return $this->belongsTo(NetworkDevice::class);
    }
}