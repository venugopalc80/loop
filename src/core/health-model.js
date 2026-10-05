export const HealthMetric = Object.freeze({ HEART_RATE:'heart_rate', RESTING_HEART_RATE:'resting_heart_rate', HRV:'hrv', SLEEP:'sleep', RECOVERY:'recovery', STRAIN:'strain', ACTIVITY:'activity', WORKOUT:'workout' });
export const DataSource = Object.freeze({ WHOOP:'whoop', APPLE_HEALTH:'apple_health', OURA:'oura', GARMIN:'garmin', MANUAL:'manual' });

export function createHealthRecord({ metric, value, unit, timestamp, source, confidence=1, metadata={} }) {
  if (!Object.values(HealthMetric).includes(metric)) throw new Error('Unsupported health metric: ' + metric);
  if (!Object.values(DataSource).includes(source)) throw new Error('Unsupported data source: ' + source);
  return { id: crypto.randomUUID(), metric, value:Number(value), unit, timestamp:new Date(timestamp).toISOString(), source, confidence, metadata };
}

export function normalizeHrv(value, source) { return createHealthRecord({ metric:HealthMetric.HRV, value, unit:'ms', timestamp:Date.now(), source }); }
export function normalizeHeartRate(value, source) { return createHealthRecord({ metric:HealthMetric.HEART_RATE, value, unit:'bpm', timestamp:Date.now(), source }); }
export function normalizeSleep({durationMinutes, score, source, startedAt, endedAt}) {
  return createHealthRecord({ metric:HealthMetric.SLEEP, value:durationMinutes, unit:'minutes', timestamp:endedAt || startedAt || Date.now(), source, metadata:{score:score == null ? null : Number(score), startedAt:startedAt ? new Date(startedAt).toISOString() : null, endedAt:endedAt ? new Date(endedAt).toISOString() : null} });
}