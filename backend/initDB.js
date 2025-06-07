// initDB.js
import mysql from 'mysql2/promise';

const createDatabaseAndTables = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  });

  // Tạo DB nếu chưa có
  await connection.query(`CREATE DATABASE IF NOT EXISTS bwd CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
  await connection.query(`USE bwd`);

  // users table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(100),
      email VARCHAR(100),
      password VARCHAR(255) DEFAULT NULL,
      auth_provider VARCHAR(50) DEFAULT 'local',
      avatar LONGBLOB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  `);

  // user_profiles table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id INT PRIMARY KEY,
      about_me TEXT,
      facebook_url VARCHAR(255),
      twitter_url VARCHAR(255),
      instagram_url VARCHAR(255),
      google_url VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  `);

  // Đảm bảo mọi user đều có profile (1 lần duy nhất)
  await connection.query(`
    INSERT IGNORE INTO user_profiles (user_id)
    SELECT id FROM users
    WHERE id NOT IN (SELECT user_id FROM user_profiles);
  `);

  // posts table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content TEXT,
      images JSON,
      author_id INT,
      author_name VARCHAR(100),
      author_avatar TEXT,
      likes INT DEFAULT 0,
      comments JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  `);

  // post_likes table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS post_likes (
      post_id INT,
      user_id INT,
      PRIMARY KEY (post_id, user_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  `);

  console.log('✅ Database và các bảng đã được tạo thành công!');
  await connection.end();
};

export default createDatabaseAndTables;