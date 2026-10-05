import { DataSource } from './health-model';

export class HealthProvider {
  constructor(source) { this.source = source; }
  async connect() { throw new Error(this.source + ' provider does not implement connect()'); }
  async disconnect() { throw new Error(this.source + ' provider does not implement disconnect()'); }
  async getHealthRecords() { throw new Error(this.source + ' provider does not implement getHealthRecords()'); }
}

export class MockHealthProvider extends HealthProvider {
  constructor() { super(DataSource.MANUAL); }
  async connect() { return { connected:true, source:this.source }; }
  async disconnect() { return { connected:false, source:this.source }; }
  async getHealthRecords() { return []; }
}