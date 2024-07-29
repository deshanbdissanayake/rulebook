import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myDatabase.db');

// Function to insert initial quotes
const insertInitialQuotes = async () => {
    const initialQuotes = [
      { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
      { quote: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
      { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { quote: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" }
    ];
  
    for (const { quote, author, userId = '1', status = 'active' } of initialQuotes) {
      try {
        await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO quote (quote, author, userId, status) VALUES (?, ?, ?, ?);',
              [quote, author, userId, status],
              () => { resolve(); },
              (_, error) => { reject(error); }
            );
          });
        });
        console.log('Initial quote inserted successfully:', quote);
      } catch (error) {
        console.error('Error inserting initial quote:', error.message);
      }
    }
};

// Function to create tables
export const createTables = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS quote (id INTEGER PRIMARY KEY NOT NULL, quote TEXT, author TEXT, userId INTEGER, status TEXT DEFAULT "active");',
        [],
        () => {
          console.log('Quote table created successfully');
          // Insert initial quotes after creating the table
          insertInitialQuotes().then(resolve).catch(reject);
        },
        (_, error) => {
          console.error('Error creating quote table:', error.message);
          reject(error);
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS collection (id INTEGER PRIMARY KEY NOT NULL, name TEXT, userId INTEGER, status TEXT DEFAULT "active");',
        [],
        () => { console.log('Collection table created successfully'); },
        (_, error) => { console.error('Error creating collection table:', error.message); }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS quote_collection (id INTEGER PRIMARY KEY NOT NULL, q_id INTEGER, col_id INTEGER, userId INTEGER, status TEXT);',
        [],
        () => { console.log('Quote Collection table created successfully'); },
        (_, error) => { console.error('Error creating quote_collection table:', error.message); }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS quote_favourite (id INTEGER PRIMARY KEY NOT NULL, q_id INTEGER, userId INTEGER, status TEXT);',
        [],
        () => { console.log('Quote Favourite table created successfully'); },
        (_, error) => { console.error('Error creating quote_favourite table:', error.message); }
      );
    });
  });
};

// Function to get all data from a specific table
export const getTableData = async (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE status = 'active';`,
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.error(`Error fetching data from ${tableName}:`, error.message);
          reject(error);
        }
      );
    });
  });
};

// Function to add a quote to the database
export const addNewQuote = async (quote, author, userId = '1', status = 'active') => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO quote (quote, author, userId, status) VALUES (?, ?, ?, ?);',
        [quote, author, userId, status],
        (_, result) => {
          console.log('Quote added successfully:', result);
          resolve(result);
        },
        (_, error) => {
          console.error('Error adding quote:', error.message);
          reject(error);
        }
      );
    });
  });
};
