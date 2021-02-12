import mysql from 'mysql';
 
const db = mysql.createConnection({
 host: "127.0.0.1",
 port: 6603,
 user: "root",
 password: "yolo",
 database: "users"
});
 
export {db};