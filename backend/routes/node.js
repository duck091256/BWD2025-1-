import mysql from 'mysql2/promise';

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'crossover.proxy.rlwy.net',
      port: '31908',
      user: 'root',
      password: 'nXmHjODueqRefEMIWGnHKSfAqkCInLTd',
      database: 'railway'
    });

    console.log('Connected!');

    const [rows] = await connection.execute('SELECT * FROM users');
    console.log('✅ Query result:', rows);

    await connection.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
})();
