// Database
import * as SQLite from 'expo-sqlite';
// WebAPI
import Axios from "axios";
// Constants //
const db = SQLite.openDatabase('taprootDB.db');
const site = "http://taproot-dev.azurewebsites.net/api/";


export const clearDB = () => {
    dropTable('tbl_residents');
    dropTable('tbl_interventions');
    dropTable('tbl_reactive_behaviors');
    dropTable('tbl_behaviors');
    dropTable('tbl_user');
};

export const initDB = () => {
    createTable('tbl_residents','id INTEGER PRIMARY KEY NOT NULL, first_name TEXT, last_name TEXT, preferred_name TEXT, date_of_birth TEXT, gender TEXT, facility TEXT');
    createTable('tbl_interventions','id INTEGER PRIMARY KEY NOT NULL, resident TEXT, behavior TEXT, intervention_name TEXT, intervention_details TEXT');
    createTable('tbl_reactive_behaviors','id INTEGER PRIMARY KEY NOT NULL, resident TEXT, behavior TEXT, towards TEXT, frequency TEXT, time_of_day_occurs TEXT');
    createTable('tbl_behaviors','id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(128), details VARCHAR(128)');
    createTable('tbl_user','id INTEGER PRIMARY KEY NOT NULL, userName TEXT');
};

const createTable = (tbl, tblInfo) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tbl + ' (' + tblInfo + ')', [], () => {},
        (err) => console.warn('Error', err));
    }, (err) => {console.warn("Error", err);}, () => {},);
};

const dropTable = (tbl) => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS ' + tbl, [], () => {},
        (err) => console.warn('Error', err));
    }, (err) => {console.warn("Error", err);}, () => {},);
};

export const getData = (token, userName) => {
    let header = { headers: { Authorization: token } }
    let userID = 0;
    Axios.all([
        Axios.get(site + "residents.json", header),
        Axios.get(site + "admit.json", header),
        Axios.get(site + "facilities.json", header),
        Axios.get(site + "reactive_behaviors.json", header),
        Axios.get(site + "behaviors.json", header),
        Axios.get(site + "interventions.json", header),
        Axios.get(site + "users.json", header),
        Axios.get(site + "caregivers.json", header)
    ])
    .then(Axios.spread((residentRes, admitRes, facilityRes, reactive_behaviorRes, behaviorRes, interventionRes, userRes, caregiversRes) => {
        residentRes.data.forEach(r => {
            admitRes.data.forEach(a => {
                if (r.id == a.resident){
                    facilityRes.data.forEach(f => {
                        insertResidents([r.id, r.first_name, r.last_name, r.preferred_name, r.date_of_birth, r.gender, f.facility_name]);
                    })
                }
            })
        });
        reactive_behaviorRes.data.forEach(rb => {      
            insertReactiveBehaviors([rb.id, rb.resident, rb.behavior, rb.towards, rb.frequency, rb.time_of_day_occurs]);
        });
        behaviorRes.data.forEach(b => {
            insertBehaviors([b.id, b.behavior_name, b.behavior_details]);
        });
        interventionRes.data.forEach(i => {
            insertIntervention([i.id, i.resident, i.behavior, i.intervention_name, i.intervention_details]);
        });
        userRes.data.forEach(user => {
            if (user.username == userName){
                caregiversRes.data.forEach(caregiver => {
                    if (caregiver.user == user.id){
                        insertUser([caregiver.id, user.username]);
                    }
                })
            }
        });
    }))
    return 0;
}

const insertResidents = (values) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO tbl_residents (id, first_name, last_name, preferred_name, date_of_birth, gender, facility) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values)});
  }

const insertIntervention = (values) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO tbl_interventions (id, resident, behavior, intervention_name, intervention_details) VALUES (?, ?, ?, ?, ?)',
        values)});
}

const insertUser = (values) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT OR REPLACE INTO tbl_user (id, userName) VALUES (?, ?)',
        values)});
}

const insertReactiveBehaviors = (values) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT OR REPLACE INTO tbl_reactive_behaviors (id, resident, behavior, towards, frequency, time_of_day_occurs) VALUES (?, ?, ?, ?, ?, ?)",
        values)});
}

const insertBehaviors = (values) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO tbl_behaviors (id, name, details) VALUES (?, ?, ?)",
        values
      )
    });
}
