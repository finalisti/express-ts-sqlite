import Database from 'better-sqlite3';
import {filename, tables, checkData, exampleData} from './db-config';

const db = new Database(filename);
db.pragma('journal_mode = WAL');

// init tables, use exec only for CREATE TABLE
db.exec(tables);

// Check if the articles table is empty
const rowCount = (db.prepare(checkData).get() as {count: number}).count;
// If the table is empty, insert example data
if (rowCount === 0) {
  db.exec(exampleData);
  console.log('Inserted example data.');
} else {
  console.log('Table already populated.');
}

// const rowCount2 = (db.prepare(checkData2).get() as {count: number}).count;

// if (rowCount2 === 0) {
//   db.prepare(exampleData2).run();
//   console.log('Inserted example data 2.');
// } else {
//   console.log('Table already populated 2');
// }

export default db;
