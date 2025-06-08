import mysql from 'mysql2/promise';

const poolLocalhost = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bwd',
});

const poolDeploy = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12783648',
  password: 'XtFSgUsFjp',
  database: 'sql12783648',
});

export const query = (sql, params) => {
  return poolDeploy.execute(sql, params);
};