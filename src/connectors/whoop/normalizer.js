import { DataSource, HealthMetric, createHealthRecord } from '../../core/health-model';

export function normalizeWhoopCycle(cycle) {
  const score = cycle.score || {};
  return [
    createHealthRecord({ metric:HealthMetric.STRAIN, value:score.strain, unit:'strain', timestamp:cycle.end || cycle.start, source:DataSource.WHOOP, metadata:{ whoopCycleId:cycle.id, averageHeartRate:score.average_heart_rate, maxHeartRate:score.max_heart_rate, stepCount:cycle.step_count ?? null } }),
  ];
}

export function normalizeWhoopRecovery(recovery) {
  if (!recovery.score) return [];
  const score = recovery.score;
  return [
    createHealthRecord({ metric:HealthMetric.RECOVERY, value:score.recovery_score, unit:'score', timestamp:recovery.updated_at || recovery.created_at, source:DataSource.WHOOP, metadata:{ whoopCycleId:recovery.cycle_id, sleepId:recovery.sleep_id, spo2:score.spo2_percentage ?? null, skinTemperatureC:score.skin_temp_celsius ?? null } }),
    createHealthRecord({ metric:HealthMetric.HRV, value:score.hrv_rmssd_milli, unit:'ms', timestamp:recovery.updated_at || recovery.created_at, source:DataSource.WHOOP, metadata:{ whoopCycleId:recovery.cycle_id } }),
    createHealthRecord({ metric:HealthMetric.RESTING_HEART_RATE, value:score.resting_heart_rate, unit:'bpm', timestamp:recovery.updated_at || recovery.created_at, source:DataSource.WHOOP, metadata:{ whoopCycleId:recovery.cycle_id } })
  ];
}

export function normalizeWhoopSleep(sleep) {
  const stage = sleep.score?.stage_summary || {};
  const durationMinutes = stage.total_in_bed_time_milli ? stage.total_in_bed_time_milli / 60000 : (new Date(sleep.end) - new Date(sleep.start)) / 60000;
  return [createHealthRecord({ metric:HealthMetric.SLEEP, value:durationMinutes, unit:'minutes', timestamp:sleep.end, source:DataSource.WHOOP, metadata:{ sleepId:sleep.id, cycleId:sleep.cycle_id, nap:Boolean(sleep.nap), performance:sleep.score?.sleep_performance_percentage ?? null, efficiency:sleep.score?.sleep_efficiency_percentage ?? null, deepMinutes:(stage.total_slow_wave_sleep_time_milli || 0)/60000, remMinutes:(stage.total_rem_sleep_time_milli || 0)/60000 } })];
}