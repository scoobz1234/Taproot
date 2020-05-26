import * as SQLite from 'expo-sqlite';

const database_name = 'db.db';
const db = SQLite.openDatabase('db.db');

export default class Database {

    initDB() {
        db.transaction(tx => {
            tx.executeSql(
              'create table if not exists tbl_residents (id integer not null, first_name text, last_name text);'
            );
          });
    };

    listResidents() {
        this.initDB();
        var query = "SELECT * FROM residents";
        var params = [];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                if (results.rows._array.length > 0) {
                    this.setState({ data: results.rows._array });
                }
            }, function (tx, err) {
                console.out(err);
            });
        });
    };

    residentByID(id) {
        this.initDB();
        var query = "SELECT * FROM tbl_residents WHERE last_name LIKE '%" + id + "%'";
        var params = [];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                if (results.rows._array.length > 0) {
                    return results.rows._array;
                }
            });
          }, function (tx, err) {
            console.out(err);
          });
    };

    addResident(r) {
        this.initDB();
        var query = "INSERT OR IGNORE INTO tbl_residents (id,first_name,last_name,facility) VALUES (?,?,?,?)";
        var params = [r.id, r.first_name, r.last_name, r.facility];
        db.transaction((tx) => {
          tx.executeSql(query, params, (tx, results) => {
            console.log(results);
          }, function (tx, err) {
            console.log(err);
            return;
          });
        });
    };
}