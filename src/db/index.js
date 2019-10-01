import { Pool } from 'pg';

// TODO: before pushing to production switch to environment variables
export const pool = new Pool({
    user: 'aod_test',
    host: 'localhost',
    database: 'aod_dev',
    password: 'aod_test',
    port: 5432
});

export const query = (text, params, callback) => {
    return pool.query(text, params, callback);
}

/*export const createJunkTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            users(
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                created_date TIMESTAMP NOT NULL DEFAULT NOW()
            )`;

    query(queryText)
        .then(result => {
            console.log(JSON.stringify(result));
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        });
}*/