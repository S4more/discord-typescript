import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://pi:86491300@192.168.2.200:5432/dawson',
    idleTimeoutMillis: 30000
});
