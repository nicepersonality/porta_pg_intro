const pg = require( 'pg' );

const Pool = pg.Pool;
const pool = new Pool({
    database: 'music_library',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on( 'connect', () => {
    console.log( 'Postgresql connected' );
});
pool.on( 'error', (error) => {
    console.log( 'Error with Postgres pool:', error );
});

module.exports = pool;