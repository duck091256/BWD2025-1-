import mysql from 'mysql2/promise';

const createDatabaseAndTables = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  });

  // Tạo database nếu chưa có
  await connection.query(`CREATE DATABASE IF NOT EXISTS bwd CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
  await connection.query(`USE bwd`);

  // Tạo bảng users
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT(11) NOT NULL AUTO_INCREMENT,
      avatar VARCHAR(255),
      name VARCHAR(100),
      email VARCHAR(100),
      password VARCHAR(255) DEFAULT NULL,
      auth_provider VARCHAR(50) DEFAULT 'local',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  `);

  // Tạo bảng user_profiles
  await connection.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id INT PRIMARY KEY,
      about_me TEXT,
      facebook_url VARCHAR(255),
      twitter_url VARCHAR(255),
      instagram_url VARCHAR(255),
      google_url VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Xoá trigger nếu đã tồn tại
  await connection.query(`DROP TRIGGER IF EXISTS create_user_profile`);

  // Tạo lại trigger
  await connection.query(`
    CREATE TRIGGER create_user_profile
    AFTER INSERT ON users
    FOR EACH ROW
    BEGIN
      INSERT INTO user_profiles (user_id) VALUES (NEW.id);
    END;
  `);

  // Tạo bản ghi user_profiles còn thiếu (nếu có)
  await connection.query(`
    INSERT INTO user_profiles (user_id)
    SELECT id FROM users
    WHERE id NOT IN (SELECT user_id FROM user_profiles);
  `);

  console.log('✅ DB và bảng đã được tạo!');
  await connection.end();
};

createDatabaseAndTables().catch(err => {
  console.error('❌ Lỗi khi tạo DB:', err);
});
