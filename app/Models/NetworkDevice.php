<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * App\Models\NetworkDevice
 *
 * @property int $id
 * @property string $name
 * @property string $ip_address
 * @property string|null $mac_address
 * @property string $device_type
 * @property string $status
 * @property float|null $last_latency
 * @property \Illuminate\Support\Carbon|null $last_seen
 * @property bool $monitoring_enabled
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Alert> $alerts
 * @property-read int|null $alerts_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\NetworkMetric> $metrics
 * @property-read int|null $metrics_count
 * @property-read \App\Models\NetworkMetric|null $latest_metric
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice query()
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereDeviceType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereLastLatency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereLastSeen($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereMacAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereMonitoringEnabled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NetworkDevice up()
 * @method static \Database\Factories\NetworkDeviceFactory factory($count = null, $state = [])
 * @method \Illuminate\Database\Eloquent\Relations\HasOne latest_metric()
 * 
 * @mixin \Eloquent
 */
class NetworkDevice extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'ip_address',
        'mac_address',
        'device_type',
        'status',
        'last_latency',
        'last_seen',
        'monitoring_enabled',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_latency' => 'decimal:2',
        'last_seen' => 'datetime',
        'monitoring_enabled' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the device metrics.
     */
    public function metrics(): HasMany
    {
        return $this->hasMany(NetworkMetric::class);
    }

    /**
     * Get the latest device metric.
     */
    public function latest_metric()
    {
        return $this->hasOne(NetworkMetric::class)->latestOfMany('recorded_at');
    }

    /**
     * Get the device alerts.
     */
    public function alerts(): MorphMany
    {
        return $this->morphMany(Alert::class, 'alertable');
    }

    /**
     * Scope a query to only include devices that are up.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUp($query)
    {
        return $query->where('status', 'up');
    }
}